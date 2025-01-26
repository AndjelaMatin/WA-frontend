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
    v-if="isFavorite"
    class="favorite-button remove"
    @click="toggleFavorite"
  >
    Makni iz omiljenih
  </button>
  <button
    v-else
    class="favorite-button add"
    @click="toggleFavorite"
  >
    Dodaj u omiljene
  </button>
</div>

<div v-if="showComments" class="recept-komentari">
  <ul v-if="recipe.komentari.length > 0">
    <li v-for="komentar in recipe.komentari" :key="komentar.datum">
      {{ komentar.tekst }} - <strong>{{ komentar.korisnik }}</strong>
    </li>
  </ul>
  <p v-else class="no-comments">Nema komentara.</p>

  <div class="dodaj-komentar">
    <textarea
      v-model="newComment"
      placeholder="Dodajte komentar..."
      class="comment-input"
    ></textarea>
    <button @click="addComment" class="comment-button">Dodaj komentar</button>
  </div>
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
      recipe: null, 
      showComments: false, 
      isFavorite: false, 
      newComment: "", 

    };
  },
  async created() {
    try {
      const response = await api.get(`/recepti/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      this.recipe = response.data;
      this.isFavorite = response.data.isFavorite; 
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka:", error);
    }
  },
  methods: {
    toggleComments() {
      this.showComments = !this.showComments; 
    },
    async toggleFavorite() {
  try {
    const token = localStorage.getItem("token");

    if (this.isFavorite) {
      await api.delete('/korisnici/omiljeni', {
        headers: { Authorization: `Bearer ${token}` },
        params: { receptId: this.recipe._id }, 
      });
      this.isFavorite = false;
      alert("Recept je uklonjen iz omiljenih.");
    } else {
      await api.post('/korisnici/omiljeni', { receptId: this.recipe._id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.isFavorite = true;
      alert("Recept je dodan u omiljene.");
    }
  } catch (error) {
    console.error("Greška pri upravljanju omiljenima:", error);
    alert("Došlo je do greške. Pokušajte ponovno.");
  }
},
async addComment() {
    if (!this.newComment.trim()) {
      alert("Komentar ne može biti prazan.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Molimo prijavite se kako biste dodali komentar.");
        this.$router.push("/login");
        return;
      }

      const response = await api.post(
        `/recepti/${this.recipe._id}/komentari`,
        { tekst: this.newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      this.recipe.komentari.push(response.data);

      this.newComment = "";
    } catch (error) {
      console.error("Greška pri dodavanju komentara:", error);
      alert("Došlo je do greške prilikom dodavanja komentara.");
    }
  },
  },
};
</script>

<style scoped>

.dodaj-komentar {
  margin-top: 20px;
  text-align: center;
}

.comment-input {
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 10px;
}

.comment-button {
  padding: 10px 20px;
  background-color: #2a231f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;
}

.comment-button:hover {
  background-color: #fbf5e5;
  color: #2a231f;
  transform: scale(1.05);
}

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

.toggle-komentari, .favorite-button.add {
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

.toggle-komentari:hover, .favorite-button.add:hover  {
  background: #fbf5e5;
  color: #2a231f;
}
.favorite-button.remove {
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s ease;
  background: #c94e50;
}

.favorite-button.remove:hover {
  background: #ff6b6b;
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
