<template>
  <div>
    <div class="recepti-container">
      <!-- Prikaz recepata -->
      <div class="recept-card" v-for="recept in recepti" :key="recept._id">
        <img :src="recept.slika" alt="Slika recepta" class="recept-image" />
        <h2>{{ recept.naziv }}</h2>
        <p><strong>Sastojci:</strong> {{ recept.sastojci.join(', ') }}</p>
        <p><strong>Upute:</strong> {{ recept.upute }}</p>
        <p><strong>Porcije:</strong> {{ recept.porcije }}</p>
        <p><strong>Sviđanja:</strong> {{ recept.svidanja }}</p>
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
};
</script>

<style scoped>
.recepti-container {
  display: grid; 
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px; 
  justify-items: center; 
}

.recept-card {
  width: 100%; 
  max-width: 300px; 
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.recept-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}
</style>
