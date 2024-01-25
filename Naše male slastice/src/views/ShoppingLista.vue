<!-- ShoppingList.vue -->

<template>
    <div class="shopping-list">
      <h2>Lista namirnica za kupovinu:</h2>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <input type="checkbox" v-model="item.completed" />
          <span :class="{ completed: item.completed }">{{ item.name }}</span>
          <button class="button" @click="removeItem(index)">Obriši namirnicu</button>
        </li>
      </ul>
      <div>
        <input v-model="newItem" placeholder="Add item..." />
        <button class="button" @click="addItem">Dodaj namirnicu</button>
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
    },
  };
  </script>
  
  <style scoped>
 .button {
  width: 100%;
  height: 40px;
  margin: 10px 3px 1px 1px;
  color: #fff;
  background: #2a231f;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: .2s ease-in;
  cursor: pointer;
  height:30px;
}
.button:hover {
  background: #fbf5e5;
  color: #2a231f;
}
  </style>
  