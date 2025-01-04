<template>
  <div class="card rounded shadow  card-hover col-lg-3 col-md-4 col-sm-12">
    <img :src="card.image" class="card-img-top img-fluid" alt="Card Image" /> 
    <div class="card-body">
      <h5 class="card-title">{{ card.title }}</h5>
      <p class="card-text">{{ card.description }}</p>
      <div class="d-flex justify-content-between">
        <div>
          <img src="../assets/heart.png" height="25px" /> {{ card.likes }}
        </div>
        <div>
          <img src="../assets/comment.png" height="25px" /> {{ card.comments }}
        </div>
      </div>
      <router-link :to="'/recept/' + card.id" class="btn button1 mt-2">Prikaži recept</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  margin: 5px 20px 5px;
  background-color: #fee6c1;
}
.card-hover:hover {
  transform: translate(0, -5px);
  transition: transform 0.3s ease-in-out;
}

.card-img-top {
  width: 100%;
  height: auto;
  margin: 10px auto;
}

.button1 {
  width: 100%;
  height: 40px;
  margin: 10px auto;
  color: #fff;
  background: #2a231f;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}

.button1:hover {
  background: #fbf5e5;
  color: #2a231f;
}
</style>
