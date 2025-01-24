<template>
  <div class="recept-card">
    <img :src="recept.slika" alt="Slika recepta" class="recept-image" />
    <h2 class="recept-naziv">{{ recept.naziv }}</h2>
    <p><strong>Sastojci:</strong> {{ recept.sastojci.join(", ") }}</p>
    <p><strong>Porcije:</strong> {{ recept.porcije }}</p>
    <div class="recept-interakcije">
      <div class="like-container">
        <img src="heart.png" height="25px" alt="sviđanje" />
        <span>{{ recept.svidanja }}</span>
      </div>
      <div class="komentar-container">
        <img src="comment-dots.png" height="25px" alt="komentar" />
        <span>{{ recept.komentari.length }}</span>
      </div>
    </div>
    <button class="recept-button" @click="$emit('open-recipe', recept._id)">
      Pogledaj recept
    </button>
    <div v-if="showActions" class="action-buttons">
      <button class="edit-button" @click="$emit('edit-recipe', recept._id)">Uredi</button>
      <button class="delete-button" @click="$emit('delete-recipe', recept._id)">Obriši</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recept: Object,
    showActions: { 
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.action-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.edit-button,
.delete-button {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.edit-button {
  background-color: #2a231f; 
  color: #fff;
}

.edit-button:hover {
  background-color: #fbf5e5; 
  color: #c97d60; 
}

.delete-button {
  background-color: #c94e50; 
  color: #fff;
}

.delete-button:hover {
  background-color: #ff6b6b;
  color: #fff;
}

.recept-card {
  width: 100%;
  max-width: 300px;
  padding: 20px;
  background-color: #fee6c1;
  border: 1px solid #2a231f;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recept-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.recept-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.recept-naziv {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.recept-interakcije {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 10px;
}

.like-container,
.komentar-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.recept-button {
  padding: 10px 15px;
  background: #2a231f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  margin-top: 15px;
  transition: background 0.3s ease;
}

.recept-button:hover {
  background: #fbf5e5;
  color: #c97d60;
}
</style>
