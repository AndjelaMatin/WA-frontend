<template>
    <div class="edit-recipe-container">
      <h1>Uredi recept</h1>
      <form @submit.prevent="azurirajRecept">
        <label for="naziv">Naziv recepta:</label>
        <input
          id="naziv"
          v-model="tempRecept.naziv"
          type="text"
          placeholder="Unesite naziv recepta"
        />
  
        <label for="sastojci">Sastojci (odvojeni zarezima):</label>
        <textarea
          id="sastojci"
          v-model="tempRecept.sastojci"
          placeholder="Unesite sastojke, odvojene zarezima"
        ></textarea>
  
        <label for="upute">Upute (odvojene novim redom):</label>
        <textarea
          id="upute"
          v-model="tempRecept.upute"
          placeholder="Unesite upute za pripremu"
        ></textarea>
  
        <label for="slika">URL slike:</label>
        <input
          id="slika"
          v-model="tempRecept.slika"
          type="url"
          placeholder="Unesite URL slike"
        />
  
        <label for="porcije">Broj porcija:</label>
        <input
          id="porcije"
          v-model.number="tempRecept.porcije"
          type="number"
          min="1"
          placeholder="Unesite broj porcija"
        />
  
        <div class="buttons-container">
          <button type="submit" class="save-button">Spremi promjene</button>
          <button type="button" class="cancel-button" @click="odustaniOdPromjena">
            Odustani
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import api from "@/services/api";
  
  export default {
    data() {
      return {
        originalRecept: {}, 
        tempRecept: {}, 
      };
    },
    async created() {
      try {
        const { data } = await api.get(`/recepti/${this.$route.params.id}`);
        this.originalRecept = {
          ...data,
          sastojci: data.sastojci.join(", "),
          upute: data.upute.join("\n"),
        };
        this.tempRecept = { ...this.originalRecept };
      } catch (error) {
        console.error("Greška pri dohvaćanju recepta:", error);
      }
    },
    methods: {
      async azurirajRecept() {
        try {
          const promjene = {};
  
          // Provjera koji podaci su promijenjeni
          for (const key in this.tempRecept) {
            if (this.tempRecept[key] !== this.originalRecept[key]) {
              if (key === "sastojci") {
                promjene[key] = this.tempRecept[key]
                  .split(",")
                  .map((s) => s.trim());
              } else if (key === "upute") {
                promjene[key] = this.tempRecept[key]
                  .split("\n")
                  .map((u) => u.trim());
              } else {
                promjene[key] = this.tempRecept[key];
              }
            }
          }
  
          if (Object.keys(promjene).length === 0) {
            alert("Nema promjena za spremiti.");
            return;
          }
  
          const token = localStorage.getItem("token");
          await api.put(`/recepti/${this.$route.params.id}`, promjene, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          alert("Recept uspješno ažuriran!");
          this.$router.push("/mojirecepti");
        } catch (error) {
          console.error("Greška pri ažuriranju recepta:", error);
          alert("Došlo je do greške pri spremanju promjena.");
        }
      },
      odustaniOdPromjena() {
        this.$router.push("/mojirecepti");
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-recipe-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fbf5e5;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #2a231f;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #c97d60;
  }
  
  input,
  textarea {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .buttons-container {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  .save-button {
    padding: 10px 20px;
    background-color: #2a231f;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  
  .save-button:hover {
    background-color: #c97d60;
  }
  
  .cancel-button {
    padding: 10px 20px;
    background-color: #c94e50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  
  .cancel-button:hover {
    background-color: #ff6b6b;
  }
  </style>
  