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
import { cardsData } from "@/store_recepti";

export default {
  components: {
    Card,
  },
  data() {
    return {
      cards: cardsData,
    };
  },
  computed: {
    sortedCards() {
      const sortedCards = this.cards.slice().sort((a, b) => b.likes - a.likes);
      return sortedCards.slice(0, 10);
    },
  },
};
</script>