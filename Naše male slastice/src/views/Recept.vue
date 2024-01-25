
<template>
    <div v-if="cards">
      <h2>{{ cards.title }}</h2>
      <img :src="cards.image" class="card-img-top img-fluid" alt="Card Image">
      <div>
            <img src="../assets/heart.png" height="25px"> {{ cards.likes }}
          </div>
          <div>
            <img src="../assets/comment.png" height="25px"> {{ cards.comments }}
          </div>
      <p>{{ cards.description }}</p>
  
      <h3>Sastojci:</h3>
      <ul>
        <li v-for="ingredient in cards.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
      </ul>
      <h3>Upute za pripremu:</h3>
      <ol>
        <li v-for="instruction in cards.instructions" :key="instruction">
          {{ instruction }}
        </li>
      </ol>
    </div>
    <div v-else>
      <p>No recipe selected.</p>
    </div>
  </template>
  <script>
import { cardsData } from "@/store_recepti";
  
  export default {
  data() {
    return {
      cards: cardsData[3],
    };
  },
    };
</script>