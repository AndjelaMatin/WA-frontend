<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <h1>Unos recepta</h1>

      <label for="title">Naslov:</label>
      <input
        class="form-control"
        v-model="recipe.title"
        type="text"
        id="title"
        name="title"
        required
      /><br />

      <label for="description">Opis:</label>
      <textarea
        class="form-control"
        v-model="recipe.description"
        id="description"
        name="description"
        required
      ></textarea
      ><br />

      <label for="servings">Porcije:</label>
      <input
        class="form-control"
        v-model="recipe.servings"
        type="number"
        id="servings"
        name="servings"
        required
      /><br />

      <label for="image">Fotografija:</label>
      <input
        type="file"
        id="image"
        name="image"
        @change="handleImageUpload"
      /><br />

      <label for="ingredients"
        >Sastojci (svaki sastojak upišite u zasebno polje):</label
      >
      <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <input
          class="form-control"
          v-model="recipe.ingredients[index]"
          type="text"
          :name="'ingredient' + index"
          required
        />
      </div>
      <div class="button-group">
        <button class="button" type="button" @click="addIngredientField">
          Dodaj polje
        </button>
        <button
          class="button"
          type="button"
          @click="removeIngredientField(index)"
        >
          Ukloni polje
        </button>
      </div>
      <br />

      <label for="instructions"
        >Upute (svaki dio uputstva upišite u novo polje, prema koracima
        izrade):</label
      >
      <div v-for="(instruction, index) in recipe.instructions" :key="index">
        <input
          v-model="recipe.instructions[index]"
          type="text"
          :name="'instruction' + index"
          required
        />
      </div>
      <div class="button-group">
        <button class="button" type="button" @click="addInstructionField">
          Dodaj polje
        </button>
        <button
          class="button"
          type="button"
          @click="removeInstructionField(index)"
        >
          Ukloni polje
        </button>
      </div>
      <br />
      <button class="button button1" type="submit">Potvrdi</button>
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
        image: null,
        servings: "",
        ingredients: [""],
        instructions: [""],
      },
    };
  },
  methods: {
    submitForm() {
      if (this.recipe.ingredients.length < 2) {
        alert("Morate dodati barem dva sastojka u recept!");
        return;
      }
      if (this.recipe.instructions.length < 1) {
        alert("Morate dodati barem jednu uputu za izradu recepta!");
        return;
      }
      console.log(this.recipe);
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
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.recipe.image = file;
    },
  },
};
</script>

<style scoped>
h1 {
  color: #2a231f;
  background-color: #fee6c1;
  border-radius: 5px;
  text-align: center;
}
label {
  background-color: #fbf5e5;
  border-radius: 5px;
  text-align: center;
}
.button {
  width: 100%;
  height: 40px;
  margin: 10px 3px 1px 1px;
  color: #fbf5e5;
  background: #2a231f;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
  height: 30px;
}
input,
textarea {
  margin: 3px;
  border-radius: 5px;
  border-color: #2a231f;
}
.button:hover {
  background: #fbf5e5;
  color: #2a231f;
}
.button1 {
  height: 50px;
  background: #fee6c1;
  color: #2a231f;
}
.button:hover {
  color: #fbf5e5;
  background-color: #2a231f;
}
.button-group {
  display: flex;
  justify-content: center;
}
</style>
