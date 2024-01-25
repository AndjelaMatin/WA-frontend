<template>
  <div style="background-image:url('/src/assets/bg.jpg');
           background-size: cover; background-position: center; height: 100vh">
    <div class="main">
      <form @submit.prevent="submitForm">
        <h2>Unos recepta</h2>

        <label for="title">Naslov:</label>
        <input v-model="recipe.title" type="text" id="title" name="title" required><br>

        <label for="description">Opis:</label>
        <textarea v-model="recipe.description" id="description" name="description" required></textarea><br>

        <label for="servings">Porcije:</label>
        <input v-model="recipe.servings" type="number" id="servings" name="servings" required><br>

        <label for="ingredients">Sastojci (svaki sastojak upišite u zasebno polje):</label>
        <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <input v-model="recipe.ingredients[index]" type="text" :name="'ingredient' + index" required>
        </div>
        <div class="button-group">
          <button class="button" type="button" @click="addIngredientField">Dodaj polje</button>
          <button class="button" type="button" @click="removeIngredientField(index)">Ukloni polje</button>
        </div><br>

        <label for="instructions">Upute (svaki dio uputstva upišite u novo polje, prema koracima izrade):</label>
        <div v-for="(instruction, index) in recipe.instructions" :key="index">
          <input v-model="recipe.instructions[index]" type="text" :name="'instruction' + index" required>
        </div>
        <div class="button-group">
          <button class="button" type="button" @click="addInstructionField">Dodaj polje</button>
          <button class="button" type="button" @click="removeInstructionField(index)">Ukloni polje</button>
        </div><br>
        <button class="button button1" type="submit">Potvrdi</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: {
        title: "",
        description: "",
        image: "",
        servings: "",
        ingredients: [""],
        instructions: [""]
      }
    };
  },
  methods: {
    submitForm() {
      console.log(this.recipe);
      // Ovde možete dalje raditi sa objektom recepta, kao slanje na server ili radnje koje želite
    },
    addIngredientField() {
      this.recipe.ingredients.push("");
    },
    removeIngredientField(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    addInstructionField() {
      this.recipe.instructions.push("");
    },
    removeInstructionField(index) {
      this.recipe.instructions.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.main{
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 30px 15px 15px 15px;
  width: 800px;
overflow: hidden;
background-color: transparent;
}
h2,label{
  background-color: #fbf5e5;;
  border-radius: 5px;
  text-align: center;
}
.button {
  width: 100%;
  height: 40px;
  margin: 10px 3px 1px 1px;
  color: #fff;
  background: #2a231f;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: .2s ease-in;
  cursor: pointer;
  height:30px;
}
input,textarea{
  margin: 3px;
  border-radius: 5px;
  border-color: #2a231f;
}
.button:hover {
  background: #fbf5e5;
  color: #2a231f;
}
.button1{
  height: 50px;
}
.button-group {
    display: flex;
    justify-content: center;
}
</style>
