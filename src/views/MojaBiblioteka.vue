<template>
    <div class="container mt-3">
      <h1 class="mb-4">Spremljeni recepti</h1>
      <div class="row">
        <Card
          v-for="card in cards"
          :key="card.id"
          :card="card"
          class="col-md-4 mb-4"
        />
      </div>
    </div>
  </template>
  
  <script>
  import Card from "../components/Card.vue";
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
  };
  </script>
  