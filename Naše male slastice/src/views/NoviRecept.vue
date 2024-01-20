<template>
    <div>
      <h2>Unos recepta</h2>
  
      <form @submit.prevent="submitForm">
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
        <button type="button" @click="addIngredientField">Dodaj polje</button><br>
        <button type="button" @click="removeIngredientField(index)">Ukloni polje</button><br>
  
        <label for="instructions">Uputstva (svaki dio uputstva upišite u novo polje, prema koracima izrade):</label>
        <div v-for="(instruction, index) in recipe.instructions" :key="index">
          <input v-model="recipe.instructions[index]" type="text" :name="'instruction' + index" required>
        </div>
        <button type="button" @click="addInstructionField">Dodaj polje</button><br>
          <button type="button" @click="removeInstructionField(index)">Ukloni polje</button><br>
        <button type="submit">Potvrdi</button>
      </form>
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
  /* Dodajte stilove ako je potrebno */
  </style>
  