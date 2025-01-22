<template>
  <div class="form-container">
    <h2 class="form-title">MOJ PROFIL</h2>
    <div v-if="!isEditing">
      <h3 class="user-info">Ime: {{ user.name }}</h3>
      <h4 class="user-info">Email: {{ user.email }}</h4>
      <button class="edit-btn" @click="enableEditing">Izmijeni podatke</button>
    </div>

    <form v-else @submit.prevent="updateUserData" class="profile-form">
      <div class="form-group">
        <label for="name">Ime</label>
        <input id="name" v-model="editedUser.name" placeholder="Unesi ime" required />
      </div>

      <div class="form-group">
        <label for="currentPassword">Trenutna lozinka</label>
        <input
          id="currentPassword"
          v-model="passwords.currentPassword"
          type="password"
          placeholder="Unesi trenutnu lozinku"
          required
        />
      </div>

      <div class="form-group">
        <label for="newPassword">Nova lozinka</label>
        <input
          id="newPassword"
          v-model="passwords.newPassword"
          type="password"
          placeholder="Unesi novu lozinku"
        />
      </div>

      <button type="submit" class="submit-btn">Spremi promjene</button>
      <button type="button" class="cancel-btn" @click="disableEditing">Odustani</button>
    </form>
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
      passwords: { currentPassword: "", newPassword: "" },
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
    enableEditing() {
      this.isEditing = true;
    },
    disableEditing() {
      this.isEditing = false;
      this.passwords = { currentPassword: "", newPassword: "" };
      this.editedUser = { ...this.user };
    },
    async fetchUserData() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/auth/korisnici", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.$store.commit("setUser", response.data);
        this.editedUser = { ...response.data };
      } catch (error) {
        console.error("Greška pri dohvaćanju korisnika:", error);
      }
    },
    async updateUserData() {
      try {
        const token = localStorage.getItem("token");
        await api.put(
          "/auth/korisnici",
          {
            name: this.editedUser.name !== this.user.name ? this.editedUser.name : null,
            currentPassword: this.passwords.currentPassword || null,
            newPassword: this.passwords.newPassword || null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Podaci uspješno ažurirani.");
        this.fetchUserData();
        this.disableEditing();
      } catch (error) {
        console.error("Greška pri ažuriranju podataka:", error);
        alert("Došlo je do greške pri ažuriranju podataka.");
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fbf5e5;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #2a231f;
  background-color: #ffe9c6;
  padding: 10px;
  border-radius: 8px;
}

.user-info {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
}

.profile-form .form-group {
  margin-bottom: 20px;
}

.profile-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.profile-form input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.edit-btn,
.submit-btn,
.cancel-btn {
  background-color: #2a231f;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-right: 10px;
}

.edit-btn:hover,
.submit-btn:hover {
  background-color: #fbf5e5;
  color: #2a231f;
  transform: scale(1.05);
}

.cancel-btn {
  background-color: #dc3545;
}

.cancel-btn:hover {
  background-color: #a71d2a;
}
</style>
