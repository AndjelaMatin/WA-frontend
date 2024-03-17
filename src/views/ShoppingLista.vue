<template>
  <div class="container">
    <h2 style="text-align: center">Lista namirnica za kupovinu:</h2>
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{ completed: item.completed }"
      >
        <input type="checkbox" v-model="item.completed" />
        <span>{{ index + 1 }}. {{ item.name }}</span>
        <button class="delete-button" @click="removeItem(item)">Obriši</button>
      </li>
    </ul>
    <div class="button-container">
      <input v-model="newItem" placeholder="Dodaj namirnicu..." />
      <button class="button" @click="addItem">Dodaj namirnicu</button>
      <button class="button" @click="confirmRemoveAll">
        Obriši sve namirnice
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      newItem: "",
    };
  },
  methods: {
    addItem() {
      if (this.newItem.trim() !== "") {
        this.items.push({
          name: this.newItem.trim(),
          completed: false,
        });
        this.newItem = "";
      }
    },
    removeItem(item) {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
      // Update indices of remaining items
      this.items.forEach((item, index) => {
        item.index = index + 1;
      });
    },
    confirmRemoveAll() {
      if (confirm("Da li ste sigurni da želite da obrišete sve namirnice?")) {
        this.removeAllItems();
      }
    },
    removeAllItems() {
      this.items = [];
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
.button-container {
  margin-top: 10px;
  text-align: center;
}
.delete-button {
  margin-left: 10px;
  width: 100px;
  height: 25px;
  color: #fff;
  background: #2a231f;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  margin-top: 2px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
.button {
  width: 130px;
  height: 50px;
  color: #fff;
  background: #2a231f;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
  margin:1px
}
.button:hover {
  background: #fbf5e5;
  color: #2a231f;
}
input {
  margin: 3px;
  border-radius: 5px;
  border-color: #2a231f;
}
ul {
  list-style-type: none;
}
</style>
