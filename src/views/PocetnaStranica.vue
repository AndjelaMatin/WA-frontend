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
      recepti: [], // Svi recepti
      searchResults: [], // Rezultati pretrage
      searchQuery: "", // Korisnički unos za pretragu
      isSearching: false, // Status pretraživanja
      searchInitiated: false, // Je li pretraga pokrenuta
    };
  },
  computed: {
    // Ako je pretraga aktivna, prikazujemo rezultate pretrage; inače sve recepte
    prikazaniRecepti() {
      return this.searchQuery.trim() !== "" && this.searchResults.length > 0
        ? this.searchResults
        : this.recepti;
    },
  },
  async created() {
    try {
      // Dohvaćanje svih recepata
      const response = await api.get("/recepti");
      this.recepti = response.data;
    } catch (error) {
      console.error("Greška pri dohvaćanju recepata:", error);
    }
  },
  methods: {
    // Funkcija za pretragu recepata
    async onSearch() {
      if (this.searchQuery.trim() === "") {
        this.searchResults = [];
        this.searchInitiated = true; // Indikator da je pretraga pokrenuta
        return;
      }

      this.isSearching = true;
      this.searchInitiated = true; // Indikator da je pretraga pokrenuta
      try {
        const response = await api.get("/recepti/pretraga", {
          params: { naziv: this.searchQuery },
        });
        this.searchResults = response.data;
      } catch (error) {
        console.error("Greška pri pretrazi recepata:", error);
        this.searchResults = [];
      } finally {
        this.isSearching = false; // Završetak pretraživanja
      }
    },
    // Resetiranje pretrage
    resetSearch() {
      this.searchQuery = "";
      this.searchResults = [];
      this.searchInitiated = false; // Pretraga resetirana
    },
    // Navigacija na stranicu recepta
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
/* Kontejner za pretragu */
.search-container {
  display: flex; /* Raspored u jednom redu */
  align-items: center; /* Vertikalno poravnanje */
  justify-content: center; /* Horizontalno poravnanje */
  gap: 10px; /* Razmak između elemenata */
  margin-bottom: 30px; /* Razmak ispod */
  text-align: center;
}

/* Polje za unos */
.search-input {
  flex: 1; /* Zauzima sav dostupan prostor */
  max-width: 500px; /* Maksimalna širina */
  font-size: 1.25rem; 
  padding: 15px; 
  border: 1px solid #ccc;
  border-radius: 8px; /* Zaobljeni rubovi */
}

/* Stil gumbova */
.search-buttons {
  display: flex; /* Gumbi u istom redu */
  gap: 10px; /* Razmak između gumbova */
}

.search-buttons .btn {
  padding: 10px 20px;
  background-color: #2a231f; /* Tamno smeđa */
  color: #fff; /* Bijeli tekst */
  border: none;
  border-radius: 5px; /* Zaobljeni rubovi */
  font-size: 1rem; /* Veličina fonta */
  font-weight: bold; /* Podebljani tekst */
  cursor: pointer; /* Promjena pokazivača */
  transition: background 0.3s ease, transform 0.3s ease; /* Efekti na hover */
}

/* Hover efekt za gumbove */
.search-buttons .btn:hover {
  background-color: #fbf5e5; /* Svjetlija pozadina */
  color: #2a231f; /* Tamni tekst */
  transform: scale(1.05); /* Blago povećanje */
}

/* Klik efekt za gumbove */
.search-buttons .btn:active {
  transform: scale(0.95); /* Smanjenje veličine pri kliku */
}

/* Kontejner za kartice */
.cards-container {
  display: grid; /* Raspored u mreži */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Prilagodljiva mreža */
  gap: 20px;
  justify-items: center; /* Centriranje kartica */
}
</style>
