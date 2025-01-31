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
        <div class="like-container">
          <button @click="toggleLike" class="recept-button1">
            <img
              height="25px"
              :src="isLiked ? '/heartda.png' : '/heartne.png'"
              alt="Lajkovi"
            />
            <span>{{ recipe.svidanja }}</span>
          </button>
        </div>

        <div class="komentar-container">
          <button class="recept-button1" @click="toggleCommentsModal">
            <img
  height="25px"
  :src="hasCommented ? '/commentda.png' : '/commentne.png'"
  alt="Komentari"
/>
            <span>{{ recipe.komentari.length }}</span>
          </button>
        </div>
      </div>

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
    <div v-else class="recept-error">
      <p>Recept nije pronađen.</p>
    </div>

    <div v-if="showCommentsModal" class="modal-overlay" @click.self="toggleCommentsModal">
      <div class="modal-content">
        <br>
        <h2 class="modal-title">Komentari</h2>
        <div>
          <ul v-if="recipe.komentari.length > 0">
  <li v-for="komentar in recipe.komentari" :key="komentar._id">
    <p class="comment-text">
      <strong>{{ komentar.tekst }}</strong> - {{ komentar.korisnikIme }}
    </p>
    <button
      v-if="komentar.korisnik === korisnickiId"
      @click="deleteComment(komentar._id)"
      class="favorite-button remove"
    >
      Obriši
    </button>
  </li>
</ul>
          <p v-else class="no-comments">Nema komentara.</p>
        </div>
        <textarea
          v-model="newComment"
          placeholder="Dodajte komentar..."
          class="comment-input"
        ></textarea>
        <button @click="addComment" class="comment-button">Dodaj komentar</button>
        <br>
        <button class="favorite-button remove" @click="toggleCommentsModal">Zatvori komentare</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      recipe: null,
      showCommentsModal: false,
      isFavorite: false,
      newComment: "",
      isLiked: false,
      hasCommented: false, 
    };
  },
  async created() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      this.korisnickiId = payload.id;

      const likedResponse = await api.get("/korisnici/lajkani", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const lajkaniRecepti = likedResponse.data;

      this.isLiked = lajkaniRecepti.includes(this.$route.params.id);

      const response = await api.get(`/recepti/${this.$route.params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.recipe = response.data;
      this.isFavorite = response.data.isFavorite;
      this.recipe.svidanja = response.data.svidanja;

      this.hasCommented = this.recipe.komentari.some(
        (komentar) => komentar.korisnik === this.korisnickiId
      );
    }
  } catch (error) {
    console.error("Greška pri dohvaćanju podataka:", error);
  }
},
  methods: {
    toggleCommentsModal() {
      this.showCommentsModal = !this.showCommentsModal;
    },
    async toggleLike() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Molimo prijavite se kako biste mogli lajkati recepte.");
        return this.$router.push("/login");
      }

      try {
        if (this.isLiked) {
          await api.delete(`/korisnici/lajk`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { receptId: this.recipe._id },
          });
          this.recipe.svidanja -= 1;
        } else {
          await api.post(`/korisnici/lajk`, { receptId: this.recipe._id }, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.recipe.svidanja += 1;
        }

        this.isLiked = !this.isLiked;
      } catch (error) {
        console.error("Greška pri upravljanju lajkovima:", error);
        alert("Došlo je do greške. Pokušajte ponovno.");
      }
    },
    async toggleFavorite() {
      try {
        const token = localStorage.getItem("token");

        if (this.isFavorite) {
          await api.delete("/korisnici/omiljeni", {
            headers: { Authorization: `Bearer ${token}` },
            params: { receptId: this.recipe._id },
          });
          this.isFavorite = false;
        } else {
          await api.post("/korisnici/omiljeni", { receptId: this.recipe._id }, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.isFavorite = true;
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
        this.toggleCommentsModal();
      } catch (error) {
        console.error("Greška pri dodavanju komentara:", error);
        alert("Došlo je do greške prilikom dodavanja komentara.");
      }
    },
    async deleteComment(komentarId) {
  console.log("ID komentara koji se briše:", komentarId); 
  if (!komentarId) {
    console.error("Komentar nema validan ID. Provjerite podatke.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Molimo prijavite se kako biste mogli brisati komentare.");
    return this.$router.push("/login");
  }

  try {
    await api.delete(`/recepti/${this.recipe._id}/komentari/${komentarId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    this.recipe.komentari = this.recipe.komentari.filter(
      (komentar) => komentar._id !== komentarId
    );

    alert("Komentar je uspješno obrisan.");
  } catch (error) {
    console.error("Greška pri brisanju komentara:", error);
    alert("Došlo je do greške prilikom brisanja komentara.");
  }
},
  },
};
</script>

<style scoped>
.recept-button1 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  background: #fee6c1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-top: 15px;
  transition: background 0.3s ease, transform 0.2s ease;
}

.recept-button1:hover {
  background: #fbf5e5;
  color: #c97d60;
  transform: scale(1.05);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 10px;
}

.like-container,
.komentar-container {
  display: flex;
  align-items: center;
  gap: 5px;
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
