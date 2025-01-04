<script setup>
import { RouterView } from "vue-router";
</script>
<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg custom-navbar"
    >
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <img
          src="@/assets/nmslogo.png"
            height="50"
            class="d-inline-block align-top"
            alt=""
          />
        </a>
        <div class="d-flex">
          
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
          <router-link class="nav-link" to="/profil">Profil</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shoppingLista">Shopping lista</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/noviRecept">Dodaj recept</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/oNama">O nama</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Prijava/registracija</router-link>
        </li>
        <form class="d-flex">
        <input
          class="form-control me-2 search-input"
          type="search"
          placeholder="Upiši naziv slastice"
        />
        <button class="button1" type="submit">Potraži</button>
      </form>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>



<style >
.custom-navbar {
  background-color: #fee6c1;
  margin-bottom: 10px;

}
.nav-link {
  transition: font-weight 0.3s;
}

.nav-link:hover {
  font-weight: bold;
}

.button1 {
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
</style>


<!-- <script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg">
    <div class="container-fluid">
    <router-link class="navbar-brand" to="/"
      ><img src="@/assets/nmslogo.png" alt="logo" width="200" height="60px"/>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav me-auto mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/profil">Profil</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/shoppingLista">Shopping lista</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/noviRecept">Dodaj recept</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/oNama">O nama</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
      </ul>
      <form class="d-flex">
        <input
          class="form-control me-2 search-input"
          type="search"
          placeholder="Upiši naziv slastice"
        />
        <button class="button1" type="submit">Potraži</button>
      </form>
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
</style> -->
