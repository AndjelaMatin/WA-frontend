<template>
  <div class="container">
    <div v-if="!isEditing">
      <h1>{{ user.name }}</h1>
      <img :src="user.profilePicture" alt="Profile Picture" />
      <h4>Email: {{ user.email }}</h4>
      <h4>Broj mobitela: {{ user.phoneNumber }}</h4>
      <button class="button" @click="enableEditing">Izmijeni</button>
    </div>

    <form v-else @submit.prevent="updateUserData">
      <label>Ime:</label>
      <input v-model="editedUser.name" type="text" /><br />

      <label>Email:</label>
      <input v-model="editedUser.email" type="text" /><br />

      <label>Broj mobitela:</label>
      <input v-model="editedUser.phoneNumber" type="text" />

      <button class="button" type="submit">Spremi promjene</button>
      <button class="button" @click="disableEditing">Odustani</button>
    </form>
    <router-link to="/noviRecept">
      <button class="button" v-if="!isEditing">Dodaj novi recept</button>
    </router-link>
  </div>
</template>

<script>
import api from "@/services/api"; // Dodaj API servis

export default {
  data() {
    return {
      user: {}, // Prazan objekt za korisnika
      editedUser: {}, // Kopija korisničkih podataka za uređivanje
      isEditing: false,
    };
  },
  async created() {
    try {
      // Dohvati podatke o korisniku iz baze
      const response = await api.get("/korisnici");
      this.user = response.data;
      this.editedUser = { ...response.data };
    } catch (error) {
      console.error("Greška pri dohvaćanju korisnika:", error);
    }
  },
  methods: {
    enableEditing() {
      this.isEditing = true;
    },
    disableEditing() {
      this.isEditing = false;
    },
    async updateUserData() {
      try {
        // Ažuriranje korisničkih podataka putem API-ja
        const response = await api.put(`/korisnici/${this.user.id}`, this.editedUser);
        this.user = response.data; // Ažuriraj lokalne podatke s odgovorom API-ja
        this.isEditing = false;
      } catch (error) {
        console.error("Greška pri ažuriranju korisnika:", error);
      }
    },
  },
};
</script>

<style>
/* CSS ostaje nepromijenjen */
</style>
