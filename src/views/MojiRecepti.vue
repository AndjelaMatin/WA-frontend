<template>
  <div class="container mt-3">
    <div v-if="favoriteRecipes.length > 0">
      <h1 class="text-center mb-4">Omiljeni recepti</h1>
      <div class="cards-container">
        <CardComponent
          v-for="recept in favoriteRecipes"
          :key="recept._id"
          :recept="recept"
          :showActions="false" 
          :liked="lajkaniRecepti.includes(recept._id)"
          :commented="komentiraniRecepti.includes(recept._id)" 
          @toggle-like="handleLike"
          @open-recipe="openRecipe"
          @add-comment="handleComment"
        />
      </div>
    </div>
    <p v-if="favoriteRecipes.length === 0" class="text-center text-muted">
      Nemate nijedan omiljeni recept. Dodajte recepte u omiljene kako bi se prikazali ovdje!
    </p>

    <div v-if="userRecipes.length > 0">
      <br>
      <h1 class="text-center mb-4">Moji recepti</h1>
      <div class="cards-container">
        <CardComponent
          v-for="recept in userRecipes"
          :key="recept._id"
          :recept="recept"
          :showActions="true" 
          :liked="lajkaniRecepti.includes(recept._id)"
          :commented="komentiraniRecepti.includes(recept._id)" 
          @toggle-like="handleLike"
          @open-recipe="openRecipe"
          @edit-recipe="editRecipe"
          @delete-recipe="deleteRecipe"
          @add-comment="handleComment"
        />
      </div>
    </div>
    <p v-if="userRecipes.length === 0" class="text-center text-muted">
      Nemate nijedan svoj recept. Dodajte novi recept kako bi se prikazao ovdje!
    </p>
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
      userRecipes: [], 
      favoriteRecipes: [], 
      lajkaniRecepti: [],
      komentiraniRecepti: [], 
    };
  },
  async created() {
  try {
    const token = localStorage.getItem("token");

    const userRecipesResponse = await api.get("/mojirecepti", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.userRecipes = userRecipesResponse.data;

    const favoriteRecipesResponse = await api.get("/omiljenirecepti", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.favoriteRecipes = favoriteRecipesResponse.data;

    await this.fetchLajkaniRecepti();
  } catch (error) {
    console.error("Greška pri dohvaćanju recepata:", error);
  }
},

  methods: {
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
    // Pronađi recept u lokalnim podacima
    const recept =
      this.userRecipes.find((r) => r._id === receptId) ||
      this.favoriteRecipes.find((r) => r._id === receptId);

    if (!recept) {
      console.error("Recept nije pronađen u lokalnim listama.");
      return;
    }

    // Dodaj komentar putem API-ja
    const response = await api.post(
      `/recepti/${receptId}/komentari`,
      { tekst: tekstKomentara },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Dodaj novi komentar lokalno
    recept.komentari.push(response.data);

    // Dodaj recept u komentirane ako nije već tamo
    if (!this.komentiraniRecepti.includes(receptId)) {
      this.komentiraniRecepti.push(receptId);
    }
  } catch (error) {
    console.error("Greška pri dodavanju komentara:", error);
    alert("Došlo je do greške prilikom dodavanja komentara.");
  }
},
    async fetchKomentiraniRecepti() {
  const token = localStorage.getItem("token");
  if (!token) return; 

  try {
    const response = await api.get("/korisnici/komentirani", {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.komentiraniRecepti = response.data; 
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
    const recept =
      this.userRecipes.find((r) => r._id === receptId) ||
      this.favoriteRecipes.find((r) => r._id === receptId);

    if (!recept) {
      console.error("Recept nije pronađen u lokalnim listama.");
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
    editRecipe(id) {
      this.$router.push({ name: "urediRecept", params: { id } });
    },
    async deleteRecipe(id) {
      if (!confirm("Jeste li sigurni da želite obrisati ovaj recept?")) return;

      try {
        const token = localStorage.getItem("token");
        await api.delete(`/brisanjerecepta/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.userRecipes = this.userRecipes.filter((recept) => recept._id !== id);
        alert("Recept je uspješno obrisan!");
      } catch (error) {
        console.error("Greška pri brisanju recepta:", error);
        alert("Došlo je do greške. Pokušajte ponovno.");
      }
    },
  },
  mounted() {
    this.fetchLajkaniRecepti();
    this.fetchKomentiraniRecepti(); 
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fbf5e5;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
}

.text-center {
  font-size: 24px;
  color: #2a231f;
}

.text-muted {
  color: #888;
  font-size: 18px;
}
</style>