<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg">
      <div class="container-fluid dropdown">
        <a class="navbar-brand" href="/"><img src="@/assets/nmslogo.jpg" alt="logo" width="200" height="60px"></a>
        <button
          class="btn navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/profil">Profil</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/mojaBiblioteka">Moja biblioteka</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/shoppingLista">Shopping lista</a>
            </li>            
            <li class="nav-item">
              <a class="nav-link" href="/noviRecept">Dodaj recept</a>
            </li>      
            <li class="nav-item">
              <a class="nav-link" href="/oNama">O nama</a>
            </li>      
            <li class="nav-item">
              <a class="nav-link" href="/login">Login</a>
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
  transition: .2s ease-in;
  cursor: pointer;
}

.button1:hover {
  background: #fbf5e5;
  color: #2a231f;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}

</style>
