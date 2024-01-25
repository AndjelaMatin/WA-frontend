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
    <button class="button" @click="toggleFavorite">
      {{ isSaved ? 'Ukloni iz biblioteke' : 'Dodaj u biblioteku' }}
    </button>
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
      isSaved: false,
    };
  },
  methods: {
    toggleFavorite() {
      this.isSaved = !this.isSaved;
      // You can add additional logic here, such as saving to favorites in a database.
    },
  },
};
</script>
<style>
button{
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #2a231f;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}
button:hover{
	background: #fbf5e5;
    color: #2a231f;
}
</style>
