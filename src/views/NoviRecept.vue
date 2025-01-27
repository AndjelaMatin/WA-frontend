<template>
  <div class="form-container">
    <h2 class="form-title">DODAJ NOVI RECEPT</h2>
    <form @submit.prevent="addRecipe" class="recipe-form">
      <div class="form-group">
        <label for="title">Naslov</label>
        <input id="title" v-model="title" placeholder="Unesi naslov" required />
      </div>

      <div class="form-group">
        <label for="description">Opis</label>
        <textarea id="description" v-model="description" placeholder="Unesi opis" required></textarea>
      </div>

      <div class="form-group">
        <label for="image">URL slike</label>
        <input id="image" v-model="image" placeholder="Unesi URL slike" />
      </div>

      <div class="form-group">
        <label for="servings">Broj porcija</label>
        <input
          id="servings"
          v-model.number="servings"
          type="number"
          placeholder="Broj porcija"
          min="1"
        />
      </div>

      <div class="form-group">
        <label for="ingredients">Sastojci</label>
        <div v-for="(ingredient, index) in ingredients" :key="index" class="dynamic-input">
          <input
            v-model="ingredients[index]"
            placeholder="Unesi sastojak"
            required
          />
          <button type="button" @click="removeIngredient(index)" class="remove-btn">Ukloni</button>
        </div>
        <button type="button" @click="addIngredient" class="add-btn">Dodaj sastojak</button>
      </div>

      <div class="form-group">
        <label for="steps">Koraci pripreme</label>
        <div v-for="(step, index) in steps" :key="index" class="dynamic-input">
          <textarea v-model="steps[index]" placeholder="Unesi korak pripreme" required></textarea>
          <button type="button" @click="removeStep(index)" class="remove-btn">Ukloni</button>
        </div>
        <button type="button" @click="addStep" class="add-btn">Dodaj korak</button>
      </div>

      <button type="submit" class="submit-btn">Dodaj recept</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      image: '',
      servings: 1,
      ingredients: [''],
      steps: [''], 
    };
  },
  methods: {
    addIngredient() {
      this.ingredients.push('');
    },
    removeIngredient(index) {
      this.ingredients.splice(index, 1);
    },
    addStep() {
      this.steps.push(''); 
    },
    removeStep(index) {
      this.steps.splice(index, 1); 
    },
    async addRecipe() {
  try {
    const newRecipe = {
      naziv: this.title,
      sastojci: this.ingredients,
      upute: this.steps,
      slika: this.image,
      porcije: this.servings,
    };

    console.log('Podaci koji se šalju:', newRecipe);

    const token = localStorage.getItem('token'); 

    const response = await fetch('/recepti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newRecipe),
    });

    if (!response.ok) {
      throw new Error(`Greška: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Recept uspješno dodan:', data);

    this.resetForm();
    alert('Recept uspješno dodan!');
  } catch (error) {
    console.error('Greška pri dodavanju recepta:', error);
    alert('Došlo je do greške. Pokušajte ponovno.');
  }
},
    resetForm() {
      this.title = '';
      this.description = '';
      this.image = '';
      this.servings = 1;
      this.ingredients = [''];
      this.steps = [''];
    },
  },
};
</script>

<style scoped>

.form-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fbf5e5;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #2a231f;
  background-color: #ffe9c6;
  padding: 10px;
  border-radius: 8px;
}

.recipe-form .form-group {
  margin-bottom: 20px;
}

.recipe-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.recipe-form input,
.recipe-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.recipe-form textarea {
  resize: vertical;
}

.dynamic-input {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.dynamic-input input,
.dynamic-input textarea {
  flex: 1;
  margin-right: 10px;
}

.add-btn,
.submit-btn {
  background-color: #2a231f; 
  color: #fff; 
  border: none;
  border-radius: 5px; 
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease; 
}

.add-btn:hover,
.submit-btn:hover {
  background-color: #fbf5e5; 
  color: #2a231f; 
  transform: scale(1.05);
}

.remove-btn {
  background-color: #dc3545; 
  color: #fff; 
  border: none;
  border-radius: 5px; 
  padding: 5px 10px;
  font-size: 14px; 
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.remove-btn:hover {
  background-color: #a71d2a;
}

.submit-btn {
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  background: #2a231f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #fbf5e5;
  color: #2a231f;
  }
</style>
