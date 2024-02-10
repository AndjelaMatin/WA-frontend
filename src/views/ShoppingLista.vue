<template>
    <div class="shopping-list">
      <h2>Lista namirnica za kupovinu:</h2>
      <ul>
        <li v-for="(item, index) in items" :key="index" :class="{ completed: item.completed }">
          <input type="checkbox" v-model="item.completed" />
          <span>{{ item.name }}</span>
          <button class="button delete-button" @click="removeItem(index)">Obriši</button>
        </li>
      </ul>
      <div class="button-container">
        <input v-model="newItem" placeholder="Dodaj namirnicu..." />
        <button class="button" @click="addItem">Dodaj namirnicu</button>
        <button class="button" @click="confirmRemoveAll">Obriši sve namirnice</button>
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
    removeItem(index) {
      this.items.splice(index, 1);
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
.shopping-list {
  padding: 20px;
  border-radius: 5px;
  background-color: #fbf5e5;
}

.shopping-list ul {
  padding-left: 0;
}

.shopping-list li {
  list-style: none;
  margin-bottom: 5px;
}

.completed {
  text-decoration: line-through;
}

.delete-button {
  margin-left: 10px;
}

.button-container {
  margin-top: 10px;
}

.button {
  width: 120px;
  height: 40px;
  color: #fff;
  background: #2a231f;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: .2s ease-in;
  cursor: pointer;
}

.button:hover {
  background: #fbf5e5;
  color: #2a231f;
}
</style>
