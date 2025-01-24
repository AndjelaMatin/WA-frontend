<template>
  <div class="recept-stranica">
    <div v-if="recipe" class="recept-container">
      <h1 class="recept-naziv">{{ recipe.naziv }}</h1>
      <img :src="recipe.slika" alt="Slika recepta" class="recept-slika" />

      <div class="recept-sastojci">
        <h2>Sastojci:</h2>
        <ul>
          <li v-for="sastojak in recipe.sastojci" :key="sastojak">{{ sastojak }}</li>
        </ul>
      </div>

      <div class="recept-porcije">
        <p><strong>Broj porcija:</strong> {{ recipe.porcije }}</p>
      </div>

      <div class="recept-upute">
        <h2>Upute:</h2>
        <p>{{ recipe.upute }}</p>
      </div>

      <div class="recept-interakcije">
        <p><strong>Broj sviđanja:</strong> {{ recipe.svidanja }}</p>
        <button class="toggle-komentari" @click="toggleComments">
          {{ showComments ? "Sakrij komentare" : "Prikaži komentare" }}
        </button>
        <button
          class="favorite-button"
          @click="toggleFavorite"
        >
          {{ isFavorite ? "Makni iz omiljenih" : "Dodaj u omiljene" }}
        </button>
      </div>

      <div v-if="showComments" class="recept-komentari">
        <ul v-if="recipe.komentari.length > 0">
          <li v-for="komentar in recipe.komentari" :key="komentar.tekst">
            {{ komentar.tekst }} - <strong>{{ komentar.korisnik }}</strong>
          </li>
        </ul>
        <p v-else class="no-comments">Nema komentara.</p>
      </div>
    </div>
    <div v-else class="recept-error">
      <p>Recept nije pronađen.</p>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      recipe: null, // Podaci o receptu
      showComments: false, // Kontrola prikaza komentara
      isFavorite: false, // Provjera je li recept u omiljenima
    };
  },
  async created() {
    try {
      // Dohvati podatke o receptu, uključujući isFavorite
      const response = await api.get(`/recepti/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      this.recipe = response.data;
      this.isFavorite = response.data.isFavorite; // Postavi stanje na temelju backend odgovora
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka:", error);
    }
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments; // Prebacivanje prikaza komentara
    },
    async toggleFavorite() {
      try {
        const token = localStorage.getItem("token");

        if (this.isFavorite) {
          // Ukloni iz omiljenih
          await api.delete(`/recepti/${this.recipe._id}/omiljeni`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.isFavorite = false; // Ažuriraj stanje
          alert("Recept je uklonjen iz omiljenih.");
        } else {
          // Dodaj u omiljene
          await api.post(`/recepti/${this.recipe._id}/omiljeni`, {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.isFavorite = true; // Ažuriraj stanje
          alert("Recept je dodan u omiljene.");
        }
      } catch (error) {
        console.error("Greška pri upravljanju omiljenima:", error);
        alert("Došlo je do greške. Pokušajte ponovno.");
      }
    },
  },
};
</script>

<style scoped>
.recept-stranica {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background: #fee6c1;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recept-naziv {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2a231f;
}

.recept-slika {
  display: block;
  max-width: 100%;
  height: 300px;
  margin: 0 auto 20px;
  border-radius: 10px;
}

.recept-sastojci {
  margin-bottom: 20px;
}

.recept-sastojci h2 {
  font-size: 18px;
  color: #c97d60;
  margin-bottom: 10px;
}

.recept-sastojci ul {
  list-style-type: disc;
  padding-left: 20px;
}

.recept-porcije {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

.recept-upute {
  margin-bottom: 20px;
}

.recept-upute h2 {
  font-size: 18px;
  color: #c97d60;
  margin-bottom: 10px;
}

.recept-interakcije {
  text-align: center;
  margin-top: 30px; 
  margin-bottom: 20px;
}

.recept-interakcije p {
  font-size: 16px;
  margin-bottom: 10px;
}

.toggle-komentari {
  padding: 10px 20px;
  background: #2a231f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s ease;
}

.toggle-komentari:hover {
  background: #fbf5e5;
  color: #2a231f;
}

.favorite-button {
  padding: 10px 20px;
  background: #c94e50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s ease;
  margin-top: 10px;
}

.favorite-button:hover {
  background: #ff6b6b;
  color: #fff;
}

.recept-komentari ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.recept-komentari li {
  padding: 10px;
  background: #fbf5e5;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recept-komentari li:hover {
  background: #ffe9c6;
}

.no-comments {
  text-align: center;
  color: #888;
  font-style: italic;
  margin-top: 10px;
}

.recept-error {
  text-align: center;
  font-size: 18px;
  color: #c94e50;
}
</style>
