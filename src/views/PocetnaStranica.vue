<template>
  <div class="container mt-3">
    <h1 class="text-center mb-4">Dobrodošli na našu slatku platformu!</h1>
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Pretraži recepte..."
        class="form-control search-input"
      />
      <div class="search-buttons">
        <button @click="onSearch" type="button" class="btn btn-primary">
          Pretraži
        </button>
        <button @click="resetSearch" type="button" class="btn btn-secondary">
          Resetiraj pretragu
        </button>
      </div>
    </div>
    <div
      v-if="searchInitiated && searchQuery.trim() !== '' && !isSearching && searchResults.length === 0"
      class="mb-4 text-center"
    >
      <p class="text-danger">Nema rezultata pretrage za "{{ searchQuery }}".</p>
    </div>
    <div class="cards-container">
      <CardComponent
        v-for="recept in prikazaniRecepti"
        :key="recept._id"
        :recept="recept"
        @open-recipe="openRecipe"
      />
    </div>
  </div>
</template>

<script>
import CardComponent from "../components/CardComponent.vue";
import api from "@/services/api";

export default {
  components: {
    CardComponent,
  },
  data() {
    return {
      recepti: [], 
      searchResults: [],
      searchQuery: "", 
      isSearching: false, 
      searchInitiated: false, 
    };
  },
  computed: {
    prikazaniRecepti() {
      return this.searchQuery.trim() !== "" && this.searchResults.length > 0
        ? this.searchResults
        : this.recepti;
    },
  },
  async created() {
    try {
      const response = await api.get("/recepti"); 
      this.recepti = response.data;
    } catch (error) {
      console.error("Greška pri dohvaćanju recepata:", error);
    }
  },
  methods: {
    async onSearch() {
      if (this.searchQuery.trim() === "") {
        this.searchResults = [];
        this.searchInitiated = true; 
        return;
      }

      this.isSearching = true;
      this.searchInitiated = true; 
      try {
        const response = await api.get("/recepti/pretraga", {
          params: { naziv: this.searchQuery },
        });
        this.searchResults = response.data;
      } catch (error) {
        console.error("Greška pri pretrazi recepata:", error);
        this.searchResults = [];
      } finally {
        this.isSearching = false;
      }
    },
    resetSearch() {
      this.searchQuery = "";
      this.searchResults = [];
      this.searchInitiated = false; 
    },
    openRecipe(id) {
      this.$router.push({ name: "ReceptStranica", params: { id } });
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  text-align: center;
}

.search-input {
  width: 50%; 
  font-size: 1.25rem; 
  padding: 15px; 
  margin-bottom: 15px; 
  border: 1px solid #ccc;
  border-radius: 8px;
}

.search-buttons {
  display: flex;
  gap: 10px;
}

.search-buttons .btn {
  padding: 10px 20px;
  font-size: 1rem;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
}
</style>
