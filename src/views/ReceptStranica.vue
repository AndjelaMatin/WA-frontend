<template>
  <div v-if="currentRecipe">
    <h2>{{ currentRecipe.title }}</h2>
    <img :src="`../assets/${currentRecipe.image}`" class="card-img-top img-fluid" alt="Card Image">
    <div>
      <img src="../assets/heart.png" height="25px"> {{ currentRecipe.likes }}
    </div>
    <div>
      <img src="../assets/comment.png" height="25px"> {{ currentRecipe.comments }}
    </div>
    <p>{{ currentRecipe.description }}</p>

    <h3>Sastojci:</h3>
    <ul>
      <li v-for="ingredient in currentRecipe.ingredients" :key="ingredient">
        {{ ingredient }}
      </li>
    </ul>
    <h3>Upute za pripremu:</h3>
    <ol>
      <li v-for="instruction in currentRecipe.instructions" :key="instruction">
        {{ instruction }}
      </li>
    </ol>
  </div>
  <div v-else>
    <p>No recipe selected.</p>
  </div>
</template>
<script>
import { cardsData } from "@/store_recepti";

export default {
  data() {
    return {
      recipeId: this.$route.params.id,
      recipe: null
    };
  },
  computed: {
    currentRecipe() {
      return cardsData.find(recipe => recipe.id == this.recipeId);
    }
  }
};
</script>
