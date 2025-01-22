<template>
  <div class="main">
    <input type="checkbox" id="chk" aria-hidden="true" />
    <div class="signup">
      <form>
        <label for="chk" aria-hidden="true">Sign up</label>
        <input
          v-model="userName"
          type="text"
          name="txt"
          placeholder="User name"
          required
        />
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          v-model="password"
          type="password"
          name="pswd"
          placeholder="Lozinka"
          required
        />
        <button @click.prevent="signup">Sign up</button>
      </form>
    </div>

    <div class="login">
      <form>
        <label for="chk" aria-hidden="true">Login</label>
        <input
          v-model="loginEmail"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          v-model="loginPassword"
          type="password"
          name="pswd"
          placeholder="Lozinka"
          required
        />
        <button @click.prevent="login">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import api from "@/services/api";

export default {
data() {
  return {
    userName: "",
    email: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
  };
},
methods: {
  ...mapActions(["login"]),
  async signup() {
    try {
      const response = await api.post("/auth/signup", {
          name: this.userName,
          email: this.email,
          password: this.password,
        });
        console.log("Signup response: ", response);
        alert("Signup successful! Please log in.");
        this.userName = this.email = this.password = ""; 
      } catch (error) {
        console.error("Signup error:", error.response?.data || error);
        alert("Signup failed. Please try again.");
    }
  },
  async login() {
    try {
      const response = await api.post("/auth/login", {
        email: this.loginEmail,
        password: this.loginPassword,
      });

      if (response.data.token && response.data.user) {
        console.log("Login API response: ", response);
        this.$store.dispatch("login", {
          token: response.data.token,
          user: response.data.user,
        });
        console.log("Dispatched Vuex login action!");
        if (this.$route.path !== "/") {
          this.$router.push("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error);
    }
  },
},
};
</script>

<style scoped>
.main {
margin: auto;
width: 350px;
height: 500px;
background: #fee6c1;
overflow: hidden;
background-color: #fee6c1;
border-radius: 10px;
box-shadow: 2px 10px 20px #2a231f;
}
#chk {
display: none;
}
.signup {
position: relative;
width: 100%;
height: 100%;
}
label {
color: #2a231f;
font-size: 2.3em;
justify-content: center;
display: flex;
margin: 60px;
font-weight: bold;
cursor: pointer;
transition: 0.5s ease-in-out;
background-color: none;
}
input {
width: 60%;
height: 20px;
background: #fbf5e5;
color: #2a231f;
justify-content: center;
display: flex;
margin: 20px auto;
padding: 10px;
border: none;
outline: none;
border-radius: 5px;
box-shadow: 1px 2px 5px #2a231f;
}
button {
width: 60%;
height: 40px;
margin: 10px auto;
justify-content: center;
display: block;
color: #fff;
background: #2a231f;
font-size: 1em;
font-weight: bold;
margin-top: 20px;
outline: none;
border: none;
border-radius: 5px;
transition: 0.2s ease-in;
cursor: pointer;
}
button:hover {
background: #fbf5e5;
color: #2a231f;
}
.login {
height: 460px;
background: #fbf5e5;
border-radius: 60% / 10%;
transform: translateY(-180px);
transition: 0.8s ease-in-out;
}
.login label {
color: #2a231f;
transform: scale(0.6);
}

#chk:checked ~ .login {
transform: translateY(-500px);
}
#chk:checked ~ .login label {
transform: scale(1);
}
#chk:checked ~ .signup label {
transform: scale(0.6);
}
</style>