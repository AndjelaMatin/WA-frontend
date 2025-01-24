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
      if (!id) {
        console.error("Recept ID nije definiran.");
        return;
      }
      this.$router.push({ name: "receptStranica", params: { id } });
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex; 
  align-items: center;
  justify-content: center; 
  gap: 10px; 
  margin-bottom: 30px;
  text-align: center;
}

.search-input {
  flex: 1; 
  max-width: 500px; 
  font-size: 1.25rem; 
  padding: 15px; 
  border: 1px solid #ccc;
  border-radius: 8px; 
}

.search-buttons {
  display: flex; 
  gap: 10px; 
}

.search-buttons .btn {
  padding: 10px 20px;
  background-color: #2a231f; 
  color: #fff; 
  border: none;
  border-radius: 5px; 
  font-size: 1rem; 
  font-weight: bold; 
  cursor: pointer; 
  transition: background 0.3s ease, transform 0.3s ease; 
}

.search-buttons .btn:hover {
  background-color: #fbf5e5; 
  color: #2a231f; 
  transform: scale(1.05); 
}

.search-buttons .btn:active {
  transform: scale(0.95); 
}


.cards-container {
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 20px;
  justify-items: center; 
}
</style>
