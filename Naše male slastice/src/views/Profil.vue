<template>
  <div style="background-image:url('/src/assets/bg.jpg');
           background-size: cover; background-position: center; height: 100vh">
    <div class="main">
      <div v-if="!isEditing">
        <h1>{{ user.name }}</h1>
        <img :src="user.profilePicture" alt="Profile Picture">
        <h4>Email: {{ user.email }}</h4>
        <h4>Broj mobitela: {{ user.phoneNumber }}</h4>
        <button class="button" @click="enableEditing">Izmijeni</button>
      </div>
  
      <form v-else @submit.prevent="updateUserData">
        <label>Ime:</label>
        <input v-model="editedUser.name" type="text">
  
        <label>Email:</label>
        <input v-model="editedUser.email" type="text">
  
        <label>Broj mobitela:</label>
        <input v-model="editedUser.phoneNumber" type="text">
  
        <button class="button" type="submit">Spremi promjene</button>
        <button class="button" @click="disableEditing">Odustani</button>
      </form>
  <router-link to="/noviRecept">
        <button class="button" v-if="!isEditing">Dodaj novi recept</button>
      </router-link>
    </div>
  </div> 
  </template>
  
  <script>
  import { korisnici } from "@/store_korisnici";
  
  export default {
    data() {
      return {
        user: korisnici[0],
        editedUser: { ...korisnici[0] },
        isEditing: false,
      };
    },
    methods: {
      enableEditing() {
        this.isEditing = true;
      },
      disableEditing() {
        this.isEditing = false;
      },
      updateUserData() {
        const userIndex = korisnici.findIndex(u => u.id === this.user.id);
        if (userIndex !== -1) {
          korisnici[userIndex] = { ...this.editedUser };
          // Ovdje trebate implementirati logiku za ažuriranje podataka u store-u.
          // Primjer: this.$store.commit('updateUser', { index: userIndex, user: this.editedUser });
          this.isEditing = false; // Nakon spremanja, onemogući uređivanje
        }
      },
    },
  };
  </script>
  <style>
.main{
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 15px 15px 15px 15px;
background-color: transparent;
}
h1,h2{
  background-color:#2a231f;
  color:#fbf5e5;
  border-radius: 5px;
  text-align: center;
}
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