import axios from "axios";
import store from "./state.js"

let Service = axios.create({
    baseURL: "localhost:3000",
    timeout: 5000,
});

Service.interceptors.request.use(
    (config) => {
        const token = store.getters.getuser?.token;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

let Posts = {
    posts: [],

    getPosts() {
        return this._posts;
    },
    
    setPosts(posts) {
        this._posts = posts;
    },
    async add(post){
        try{
            return Service.post("/recepti", post);
        } catch (error) {
            console.error("Greška u dodavanju kartica: fr SERVICES/INDEX.JS", error);
        }
    },
    async posts() {
        try {
            let response = await Service.get("/recepti");
            let data = response.data;

            data = data.map((doc) => {
                return {
                    //ovdje idu podaci koji se upisuju...kasnije
                }
            });
            return data;
        }catch(error){
            console.log("Greška u dohvaćanju kartica! fr SERVICES/INDEX.JS", error);
            throw error;
        }
    },
    async getAllRatings() {
        try{
            let response = await Services.get("/recepti");
            let data = response.data;

            // Mapiranje ID-ja i ocjena iz poslove
            let ratings = data.map((doc) => ({
                _id: doc._id,
                rating: doc.rating,
            }));
            return ratings;
        }catch(error){
            console.error("Greška u dohvaćanju ocjena!! fr SERVICES/INDEX.JS", error);
            throw error;
        }
    },
};

let Auth = {
    async login(username, password) {
        try {
            let response = await Service.post("/auth", {
                username: username,
                password: password,
            });

            let user = response.data;
            store.commit("setUser", user); // Use Vuex mutation to set user
            return true;
        }   catch(error){
            console.error("Login error: fr SERVICES/INDEX.JS", error);
            return false;
        }
    },

    logout(){
        store.commit("clearUser"); //Use Vuex mutation to clear user
    },

    getUser(){
        const user = store.getters.getuser;
        console.log("Dohvaćen korisnik sa Vuex-a! fr SERVICES/INDEX.JS", user);
        return user;
    },

    authenticated(){
        let user = this.getUser();
        if(user && user.token) {
            store.commit("setUser", user);
            return true;
        }
        store.commit("clearUser");
        return false;
    },

    async signup(user) {
        try{
            let response = await Service.post("/register", user);
            if(response.data && response.data.id){
                return true;
            }
            console.log(response.data);
            return response.data;
        } catch(error) {
            console.error("Signup error: fr SERVICES/INDEX.JS", error);
            throw error;
        }
    },
};

export {Service, Posts, Auth}