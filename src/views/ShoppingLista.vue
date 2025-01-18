<template>
  <div class="container">
    <h2 class="title">Lista namirnica za kupovinu:</h2>
    <div class="button-container">
      <input v-model="newItem" placeholder="Dodaj namirnicu..." />
      <button class="button" @click="addItem">Dodaj namirnicu</button>
      <button class="button delete-button" @click="removeSelectedItems">
        Obriši označene
      </button>
    </div>
    <ul class="item-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{ completed: item.completed }"
      >
        <div class="item-content">
          <input
  type="checkbox"
  v-model="item.completed"
  @change="updateItem(index)" />

          <span>{{ index + 1 }}. {{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [], // Popunjeno iz baze
      newItem: "", // Nova stavka za unos
    };
  },
  methods: {
    // Dohvati sve stavke iz shopping liste
    async fetchItems() {
      try {
        const response = await fetch("/api/shoppingLista");
        const data = await response.json();
        this.items = data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja stavki:", error);
      }
    },
    // Dodaj novu stavku u shopping listu
    async addItem() {
      if (this.newItem.trim() !== "") {
        const newItem = { name: this.newItem.trim(), completed: false };
        try {
          const response = await fetch("/api/shoppingLista", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          });

          if (!response.ok) {
            throw new Error("Greška prilikom dodavanja stavke.");
          }

          this.items.push(newItem); // Dodaj novu stavku u lokalnu listu
          this.newItem = ""; // Resetiraj input polje
        } catch (error) {
          console.error("Greška prilikom dodavanja stavke:", error);
        }
      }
    },
    // Obriši označene stavke
    async removeSelectedItems() {
      try {
        const completedItems = this.items.filter((item) => item.completed); // eslint-disable-line no-unused-vars
        const remainingItems = this.items.filter((item) => !item.completed);

        // Ažuriraj bazu s preostalim stavkama
        const response = await fetch("/api/shoppingLista", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: remainingItems }),
        });

        if (!response.ok) {
          throw new Error("Greška prilikom brisanja označenih stavki.");
        }

        // Ažuriraj lokalnu listu
        this.items = remainingItems;
      } catch (error) {
        console.error("Greška prilikom brisanja označenih stavki:", error);
      }
    },
    async updateItem(index) {
  const item = this.items[index]; // Dohvati stavku prema indeksu
  try {
    const response = await fetch(`/api/shoppingLista/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item), // Pošalji ažurirani objekt stavke
    });

    if (!response.ok) {
      throw new Error("Greška prilikom ažuriranja stavke.");
    }
  } catch (error) {
    console.error("Greška prilikom ažuriranja stavke:", error);
  }
},
  },
  mounted() {
    this.fetchItems(); // Dohvati stavke iz baze pri učitavanju
  },
};
</script>
<style scoped>
.container {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background: #fee6c1;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2a231f;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button {
  padding: 10px 20px;
  background: #2a231f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease;
}

.button:hover {
  background: #fbf5e5;
  color: #2a231f;
}

.item-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.item-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 10px;
  background: #fbf5e5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}

.item-list li:hover {
  background: #ffe9c6;
}

.item-list li.completed span {
  text-decoration: line-through;
  color: #888;
}

.item-content {
  display: flex;
  align-items: center;
}

.item-content input[type="checkbox"] {
  margin-right: 10px;
}

.delete-button {
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.delete-button:hover {
  background: #a71d2a;
}
</style>