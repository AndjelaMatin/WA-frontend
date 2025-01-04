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

export default {
  components: {
    Card,
  },
  data() {
    return {
      cards: [],
    };
  },
  methods: {
    async prikazRecepata() {
      try {
        const response = await fetch("http://localhost:3000/recepti");
        const data = await response.json();
        console.log("Podaci s backenda", data);
        this.cards = data.map(dok => ({
          id: dok._id,
          title: dok.title,
          description: dok.description,
          likes: dok.likes,
          image: dok.image
        }));
      } catch (error) {
        console.error("Greška pri preuzimanju podataka:", error);
      }
    },
  },
  computed: {
    sortedCards() {
      return this.cards.slice().sort((a, b) => b.likes - a.likes).slice(0, 10);
    },
  },
  mounted() {
    this.prikazRecepata();
  },
};
</script>
