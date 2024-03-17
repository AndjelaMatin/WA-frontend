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
      const userIndex = korisnici.findIndex((u) => u.id === this.user.id);
      if (userIndex !== -1) {
        korisnici[userIndex] = { ...this.editedUser };
        // Ovdje trebate implementirati logiku za ažuriranje podataka u store-u.
        // Primjer: this.$store.commit('updateUser', { index: userIndex, user: this.editedUser });
        this.isEditing = false;
      }
    },
  },
};
</script>
<style>
h1,
h2 {
  background-color: #2a231f;
  color: #fbf5e5;
  border-radius: 5px;
  text-align: center;
}
.button {
  width: 100%;
  height: 40px;
  margin: 10px 3px 1px 1px;
  background: #fee6c1;
  color: #2a231f;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
  height: 30px;
}
.button:hover {
  color: #fbf5e5;
  background: #2a231f;
}
label {
  background-color: #fbf5e5;
  border-radius: 5px;
  text-align: center;
}
input {
  margin: 3px;
  border-radius: 5px;
  border-color: #2a231f;
}
</style>
