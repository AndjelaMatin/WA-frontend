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
          @open-recipe="openRecipe"
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
          @open-recipe="openRecipe"
          @edit-recipe="editRecipe"
          @delete-recipe="deleteRecipe"
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
      userRecipes: [], // Korisnički recepti
      favoriteRecipes: [], // Omiljeni recepti
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");

      // Dohvati korisničke recepte
      const userRecipesResponse = await api.get("/mojirecepti", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.userRecipes = userRecipesResponse.data;

      // Dohvati omiljene recepte
      const favoriteRecipesResponse = await api.get("/omiljenirecepti", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.favoriteRecipes = favoriteRecipesResponse.data;
    } catch (error) {
      console.error("Greška pri dohvaćanju recepata:", error);
    }
  },
  methods: {
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