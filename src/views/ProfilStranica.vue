<template>
  <div class="profile-container">
    <div class="profile-card" v-if="!isEditing">
      <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture" />
      <h1 class="profile-name">{{ user.name }}</h1>
      <div class="profile-details">
        <h4>Email: {{ user.email }}</h4>
        <h4>Broj mobitela: {{ user.phoneNumber }}</h4>
      </div>
      <button class="button" @click="enableEditing">Izmijeni</button>
    </div>

    <form class="profile-form" v-else @submit.prevent="updateUserData">
      <label for="name">Ime:</label>
      <input id="name" v-model="editedUser.name" type="text" class="input-field" /><br />

      <label for="email">Email:</label>
      <input id="email" v-model="editedUser.email" type="text" class="input-field" /><br />

      <label for="phone">Broj mobitela:</label>
      <input id="phone" v-model="editedUser.phoneNumber" type="text" class="input-field" /><br />

      <div class="button-group">
        <button class="button" type="submit">Spremi promjene</button>
        <button class="button cancel" @click="disableEditing">Odustani</button>
      </div>
    </form>

    <router-link to="/noviRecept">
      <button class="button add-recipe-button" v-if="!isEditing">Dodaj novi recept</button>
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
.profile-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background: #fbf5e5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.profile-card {
  padding: 20px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-name {
  font-size: 24px;
  font-weight: bold;
  color: #2a231f;
  margin-bottom: 10px;
}

.profile-details h4 {
  margin: 5px 0;
  font-size: 18px;
  color: #555;
}

.profile-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.input-field {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.button {
  padding: 10px 20px;
  background: #2a231f;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.button:hover {
  background: #fbf5e5;
  color: #2a231f;
}

.button.cancel {
  background: #dc3545;
}

.button.cancel:hover {
  background: #a71d2a;
}

.add-recipe-button {
  margin-top: 20px;
}
</style>
