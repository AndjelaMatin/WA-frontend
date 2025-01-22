<script setup>
import { computed } from "vue";
import { useStore } from "vuex"; 
import { useRouter } from "vue-router"; 

const router = useRouter();
const store = useStore();

const isAuthenticated = computed(() => store.state.isAuthenticated); 
const handleLogout = () => {
  store.dispatch("logout"); 
  router.push("/"); 
};
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-light bg">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">
      <img src="@/assets/nmslogo.png" alt="logo" width="200" height="60px" />
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav me-auto mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/oNama">O nama</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" to="/noviRecept">Dodaj recept</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" to="/shoppingLista">Shopping lista</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" to="/profil">Profil</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto"> 
        <li class="nav-item" v-if="isAuthenticated">
          <button
            class="nav-link btn custom-btn"
            @click="handleLogout"
          >
            Logout
          </button>
        </li>
        <li class="nav-item" v-else>
          <router-link
            class="nav-link btn custom-btn"
            to="/login"
          >
            Login/Sign up
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <RouterView />
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
};
</script>

<style scoped>
.nav-link {
  transition: font-weight 0.3s;
}
#app {
  background-image: url('@/assets/pitajabuka.jpg');
  background-size: cover;
}
.nav-link:hover {
  font-weight: bold;
}

.bg {
  background-color: #fee6c1;
  margin-bottom: 10px;
}
.search-input {
  height: 40px;
  margin: 10px auto;
  justify-content: center;
}
.button1 {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #2a231f;
  font-size: 1em;
  font-weight: bold;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
.button1:hover {
  background: #fbf5e5;
  color: #2a231f;
}
.navbar-toggler {
  border: none;
  outline: none;
}
.nav-link.btn {
  background-color: #2a231f;
  color: #fff;
  border-radius: 5px;
  padding: 5px 15px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.nav-link.btn:hover {
  background-color: #fbf5e5;
  color: #2a231f;
}
.custom-btn {
  background-color: #2a231f; 
  color: #fff; 
  border-radius: 5px; 
  padding: 5px 15px; 
  font-weight: bold; 
  border: none; 
  transition: background-color 0.3s ease, color 0.3s ease; 
}

.custom-btn:hover {
  background-color: #fbf5e5; 
  color: #2a231f;
}

</style>