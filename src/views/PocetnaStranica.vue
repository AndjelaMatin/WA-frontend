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
        :liked="lajkaniRecepti.includes(recept._id)"
        :commented="komentiraniRecepti.includes(recept._id)" 
        @toggle-like="handleLike"
        @open-recipe="openRecipe"
         @add-comment="handleComment"
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
      lajkaniRecepti: [],
      komentiraniRecepti: [],
      korisnikId: localStorage.getItem("korisnikId") || null,
    };
  },
  computed: {
    prikazaniRecepti() {
      return this.searchQuery.trim() !== "" && this.searchResults.length > 0
        ? this.searchResults
        : this.recepti;
    },
  },
  methods: {
  async fetchRecepti() {
    try {
      const response = await api.get('/recepti');
      this.recepti = response.data;
    } catch (error) {
      console.error('Greška pri dohvaćanju recepata:', error);
    }
  },
  async fetchKomentiraniRecepti() {
  const token = localStorage.getItem("token");
  if (!token) return; // Ako korisnik nije prijavljen, nema komentiranih recepata

  try {
    const response = await api.get("/korisnici/komentirani", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.komentiraniRecepti = response.data; // Pohranjujemo komentirane recepte
    console.log("Komentirani recepti:", this.komentiraniRecepti);
  } catch (error) {
    console.error("Greška pri dohvaćanju komentiranih recepata:", error);
  }
},

  async handleLike(receptId) {
  if (!receptId) {
    console.error("Recept ID nije definisan.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Molimo prijavite se kako biste mogli lajkovati recepte.");
    this.$router.push("/login");
    return;
  }

  try {
    const recept = this.recepti.find((r) => r._id === receptId);
    if (!recept) {
      console.error("Recept nije pronađen u lokalnoj listi.");
      return;
    }

    if (this.lajkaniRecepti.includes(receptId)) {
      await api.delete("/korisnici/lajk", {
        headers: { Authorization: `Bearer ${token}` },
        params: { receptId },
      });
      this.lajkaniRecepti = this.lajkaniRecepti.filter((id) => id !== receptId);
      recept.svidanja--; 
    } else {
      await api.post("/korisnici/lajk", { receptId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.lajkaniRecepti.push(receptId);
      recept.svidanja++;
    }
  } catch (error) {
    console.error("Greška pri upravljanju lajkovima:", error);
    alert("Došlo je do greške prilikom lajkanja/uklanjanja lajka.");
  }
},
async handleComment(receptId, tekstKomentara) {
      if (!receptId) {
        console.error("Recept ID nije definisan.");
        return;
      }

      if (!tekstKomentara || tekstKomentara.trim() === "") {
        alert("Komentar ne može biti prazan.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Molimo prijavite se kako biste mogli komentirati recepte.");
        this.$router.push("/login");
        return;
      }

      try {
        const recept = this.recepti.find((r) => r._id === receptId);
        if (!recept) {
          console.error("Recept nije pronađen u lokalnoj listi.");
          return;
        }

        const response = await api.post(`/recepti/${receptId}/komentari`, 
          { tekst: tekstKomentara },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        recept.komentari.push(response.data); // Dodavanje novog komentara lokalno
        console.log("Komentar dodat:", response.data);

        // Dodaj u komentirane recepte ako nije već tamo
        if (!this.komentiraniRecepti.includes(receptId)) {
          this.komentiraniRecepti.push(receptId);
        }
      } catch (error) {
        console.error("Greška pri dodavanju komentara:", error);
        alert("Došlo je do greške prilikom dodavanja komentara.");
      }
    },
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
  async fetchLajkaniRecepti() {
  const token = localStorage.getItem("token");
  if (!token) return; 

  try {
    const response = await api.get("/korisnici/lajkani", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.lajkaniRecepti = response.data; 
    console.log("Lajkani recepti:", this.lajkaniRecepti);
  } catch (error) {
    console.error("Greška pri dohvaćanju lajkanih recepata:", error);
  }
},
  openRecipe(id) {
    if (!id) {
      console.error("Recept ID nije definiran.");
      return;
    }
    this.$router.push({ name: "receptStranica", params: { id } });
  },
},
  mounted() {
    this.fetchRecepti();
    this.fetchLajkaniRecepti();
    this.fetchKomentiraniRecepti(); 
  }
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
