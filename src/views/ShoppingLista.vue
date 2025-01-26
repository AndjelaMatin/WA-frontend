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
        :key="item.id"
        :class="{ completed: item.completed }"
      >
        <div class="item-content">
          <input
            type="checkbox"
            v-model="item.completed"
            @change="updateItem(item)"
          />
          <span>{{ index + 1 }}. {{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      items: [], // Stavke iz baze
      newItem: "", // Nova stavka za unos
    };
  },
  methods: {
    // Dohvati sve stavke iz shopping liste
    async fetchItems() {
  const token = localStorage.getItem("token");

  try {
    const response = await api.get("/shoppingLista", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Dohvaćene stavke iz API-ja:", response.data);

    if (Array.isArray(response.data)) {
      this.items = response.data; // Postavi stavke ako je odgovor niz
    } else {
      console.error("Odgovor API-ja nije niz:", response.data);
      this.items = []; // Postavi prazni niz kao fallback
    }
  } catch (error) {
    console.error("Greška prilikom dohvaćanja stavki:", error);
  }
},
    // Dodaj novu stavku
    async addItem() {
  if (this.newItem.trim() !== "") {
    const token = localStorage.getItem("token");
    const newItem = { name: this.newItem.trim(), completed: false };

    try {
      const response = await api.post("/shoppingLista", newItem, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.item) {
        if (Array.isArray(this.items)) {
          this.items.push(response.data.item); // Dodaj novu stavku u niz
        } else {
          console.error("this.items nije niz:", this.items);
          this.items = [response.data.item]; // Inicijaliziraj kao niz s novom stavkom
        }
      } else {
        console.error("Odgovor API-ja ne sadrži novu stavku:", response.data);
      }

      this.newItem = ""; // Resetiraj input polje
    } catch (error) {
      console.error("Greška prilikom dodavanja stavke:", error);
    }
  }
},
    // Ažuriraj status stavke
    async updateItem(item) {
      const token = localStorage.getItem("token");

      try {
        await api.put(`/shoppingLista/${item.id}`, { completed: item.completed }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error("Greška prilikom ažuriranja stavke:", error);
      }
    },
    // Obriši označene stavke
    async removeSelectedItems() {
  const token = localStorage.getItem("token");

  try {
    // Pošalji zahtjev za brisanje označenih stavki
    await api.delete("/shoppingLista/completed", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Ukloni označene stavke iz lokalne liste
    this.items = this.items.filter((item) => !item.completed);
  } catch (error) {
    console.error("Greška prilikom brisanja označenih stavki:", error);
  }
},
  },
  async created() {
    // Dohvati stavke prilikom učitavanja komponente
    await this.fetchItems();
  },
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background: #fbf5e5;
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
  background: #fee6c1;
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