<template>
  <div>
    <div class="recepti-container">
      <div class="recept-card" v-for="recept in recepti" :key="recept._id">
        <img :src="recept.slika" alt="Slika recepta" class="recept-image" />
        <h2 class="recept-naziv">{{ recept.naziv }}</h2>
        <p><strong>Sastojci:</strong> {{ recept.sastojci.join(', ') }}</p>
        <p><strong>Porcije:</strong> {{ recept.porcije }}</p>
          <div class="recept-interakcije">
  <div class="like-container">
    <img src="heart.png" height="25px" alt="svidanje" />
    <span>{{ recept.svidanja }}</span>
  </div>
  <div class="komentar-container">
    <img src="comment-dots.png" height="25px" alt="komentar" />
    <span>{{ recept.komentari.length }}</span>
  </div>
</div>
        <button class="recept-button" @click="openRecipe(recept._id)">
          Pogledaj recept
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import api from '@/services/api'; // Import API instance
export default {
  data() {
    return {
      recepti: [], // Skladište za recepte
    };
  },
  async created() {
    try {
      // Povlačenje recepata sa backend-a
      const response = await api.get('/recepti');
      this.recepti = response.data; 
      console.log(response.data); // Smeštamo recepte u lokalni state
    } catch (error) {
      console.error('Greška pri povlačenju recepata:', error);
    }
  },
  methods: {
    openRecipe(id) {
      this.$router.push({ name: 'ReceptStranica', params: { id } });
    },
  },
};
</script>

<style scoped>
.recepti-container {
  display: grid; 
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px; 
  justify-items: center; 
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
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Glatka tranzicija */
}

.recept-card:hover {
  transform: scale(1.05); /* Povećanje na hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Intenzivnija sjena na hover */
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

.like-container, .komentar-container {
  display: flex;
  align-items: center;
  gap: 5px; 
}

.like-container {
  justify-content: flex-start; 
}

.komentar-container {
  justify-content: flex-end; 
}

.like-container img, .komentar-container img {
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.like-container img:hover, .komentar-container img:hover {
  opacity: 0.4; 
  color:#c97d60;
}

.like-container span, .komentar-container span {
  font-size: 14px;
  color: #2a231f;
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