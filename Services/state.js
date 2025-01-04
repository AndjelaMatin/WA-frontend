import {createStore} from "vuex";
import { Auth } from "@/Services";
import axios from "axios";

const store = createStore ({
    state: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        isAuthenticated: !!localStorage.getItem("user"),
        isBusinessUser:
            JSON.parse(localStorage.getItem("user"))?.userType === "business" || false,
        isSuperAdmin:
            JSON.parse(localStorage.getItem("user"))?.userType === "superadmin" || false,
        token: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")).token : null,
        posts: [],
    },

    mutations: {
        ADD_POST(state, post) {
            state.posts.push(post);
        },
        SET_POST(state, posts) {
            state.posts = posts;
        },
        setUser(state, user) {
            console.log("Setting user in vuex: U STATE.JS-u sam...", user);
            state.user = user;
            state.isAuthenticated = !!user;
            state.isBusinessUser = user?.userType === "business";
            state.isSuperAdmin = user?.role === "superadmin";
            state.token = user.token;
            if(user) {
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                localStorage.removeItem("user");
            }
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.isBusinessUser = false;
            state.isSuperAdmin = false;
            state.token = null;
            localStorage.removeItem("user");
        },
    },
    actions: {
        async add({commit, getters}, postData){
            try{
                const token = getters.getuser?.token;
                const response = await axios.post(
                    "https://localhost:3000/recepti", 
                    postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            commit("ADD_POST",response.data);
            } catch (error) {
                console.error("Error creating post: STATE.js", error);
                throw error;
            }
        },
        async fetchPost({commit}) {
            try {
                const response = await axios.get(
                    "https://localhost:3000/posts"
                );
                commit("SET_POST", response.data);
            } catch(error){
                console.error("Error fetching posts: STATE.js")
            }
        }
    }
})