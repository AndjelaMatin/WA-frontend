<template>
  <div class="container mt-3">
    <h1>Dobrodošli na našu slatku platformu!</h1>
    <h1 class="mb-4">Najbolji recepti</h1>
    <div class="row">
      <Card
        v-for="card in sortedCards"
        :key="card.id"
        :card="card"
        class="col-md-4 mb-4"
      />
    </div>
  </div>
</template>

<script>
import Card from "../components/CardComponent.vue";
import api from '@/services/api';

export default {
  components: {
   Card,
  },
  data() {
    return {
      cards: [],
    };
  },
  async created() {
 try {
    // Povlačenje podataka s baze
    const response = await api.get('/recepti');
    // Uklanjanje duplikata prema 'id' svojstvu
   const uniqueCards = response.data.filter((value, index, self) => 
      index === self.findIndex((t) => t.id === value.id)
    );
    this.cards = uniqueCards; 
  } catch (error) {
    console.error('Greška pri povlačenju podataka:', error);
  } 
},
  computed: {
    sortedCards() {
      const sortedCards = this.cards.slice().sort((a, b) => b.likes - a.likes);
      return sortedCards.slice(0, 10);
    },
  },
};
</script>

