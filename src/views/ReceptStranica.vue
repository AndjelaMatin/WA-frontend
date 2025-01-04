<template>
  <div class="container" v-if="currentRecipe">
    <h2 style="text-align: center;">{{ currentRecipe.title }}</h2>
    <div class="card rounded shadow card-hover">
      <div class="card-body">
        <img :src="currentRecipe.image" class="card-img-top img-fluid" alt="Card Image">
        <p>{{ currentRecipe.description }}</p>
        <div class="d-flex justify-content-between">
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
export default {
  data() {
    return {
      currentRecipe: [],
    };
  },
  watch: {
    id: {
      immediate: true, 
      handler(newId) {
        this.fetchRecipe(newId); 
      },
    },
  },
  methods: {
 async fetchRecipe(recipeId) {
    try {
      const response = await fetch("http://localhost:3000/recepti");
      const data = await response.json();
      const recipe = await data.find(dok => dok._id === recipeId);

      const recept = await response.find(recipeId)
      if (recept) {
        this.currentRecipe = {
          id: recipe._id,
          title: recipe.title,
          description: recipe.description,
          likes: recipe.likes,
          image: recipe.image
        };
      } else {
        console.error("Recept sa id-jem " + recipeId + " nije pronađen.");
      }
    } catch (error) {
      console.error("Greška prilikom preuzimanja recepta:", error);
    }
  },
},

};

</script>
