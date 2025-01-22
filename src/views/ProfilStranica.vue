<template>
  <div class="container" v-if="user && user.name">
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
  <div v-else>
    <p>Loading user data...</p>
  </div>
</template>

<script>
import api from "@/services/api";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user", "isAuthenticated"]), 
  },
  data() {
    return {
      editedUser: {}, 
      isEditing: false,
    };
  },
  created() {
    if (!this.user) {
      this.fetchUserData(); 
    } else {
      this.editedUser = { ...this.user }; 
    }
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/auth/korisnici", {
          headers: {Authorization: `Bearer ${token}`},
        });
        this.$store.commit("setUser", response.data); 
        this.editedUser = { ...response.data }; 
      } catch (error) {
        console.error("Greška pri dohvaćanju korisnika:", error);
      }
    },
    enableEditing() {
      this.isEditing = true;
    },
    disableEditing() {
      this.isEditing = false;
    },
    async updateUserData() {
      try {
        const response = await api.put(`/auth/korisnici/${this.user.id}`, this.editedUser);
        this.$store.commit("setUser", response.data); 
        this.isEditing = false;
      } catch (error) {
        console.error("Greška pri ažuriranju korisnika:", error);
      }
    },
  },
};
</script>
