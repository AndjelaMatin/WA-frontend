<template>
  <div class="container" v-if="recipe">
    <h2 style="text-align: center;">{{ recipe.title }}</h2>
    <div class="card rounded shadow card-hover">
      <div class="card-body">
        <img :src="recipe.image" class="card-img-top img-fluid" alt="Card Image">
        <p>{{ recipe.description }}</p>
        <div class="d-flex justify-content-between">
          <div>
            <img src="../assets/heart.png" height="25px"> {{ recipe.likes }}
          </div>
          <div>
            <img src="../assets/comment.png" height="25px"> {{ recipe.comments }}
          </div>
        </div>
      </div>
    </div>
    <h3>Sastojci:</h3>
    <ul>
      <li v-for="ingredient in recipe.ingredients" :key="ingredient">
        {{ ingredient }}
      </li>
    </ul>
    <h3>Upute za pripremu:</h3>
    <ol>
      <li v-for="instruction in recipe.instructions" :key="instruction">
        {{ instruction }}
      </li>
    </ol>
  </div>
  <div v-else>
    <p>No recipe selected.</p>
  </div>
</template>

<script>
import api from "@/services/api"; // Dodaj API servis

export default {
  data() {
    return {
      recipeId: this.$route.params.id, // ID recepta iz rute
      recipe: null, // Objekt za podatke o receptu
    };
  },
  async created() {
    try {
      // Dohvat podataka o receptu prema ID-u
      const response = await api.get(`/recepti/${this.recipeId}`);
      this.recipe = response.data; // Spremanje podataka u lokalnu varijablu
    } catch (error) {
      console.error("Greška pri dohvaćanju recepta:", error);
    }
  },
};
</script>

<style>
.card {
  margin: 5px 20px 5px;
  background-color: #fee6c1;
}
</style>
