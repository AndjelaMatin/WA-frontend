<template>
  <div class="container" v-if="currentRecipe">
    <h2 style="text-align: center;">{{ currentRecipe.title }}</h2>
    <div class="card rounded shadow  card-hover">
      <div class="card-body">
    <img :src="`../assets/${currentRecipe.image}`" class="card-img-top img-fluid" alt="Card Image">
    <p>{{ currentRecipe.description }}</p>
    <div  class="d-flex justify-content-between">
    <div>
      <img src="../assets/heart.png" height="25px"> {{ currentRecipe.likes }}
    </div>
    <div>
      <img src="../assets/comment.png" height="25px"> {{ currentRecipe.comments }}
    </div>
  </div>
</div>
</div>
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
<style>
.card {
  margin: 5px 20px 5px;
  background-color: #fee6c1;
}
</style>
