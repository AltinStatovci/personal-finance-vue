import { defineStore } from 'pinia'
import client from "../helper/client.js";
import {computed, ref} from "vue";
import {jwtDecode} from "jwt-decode";
import CookieHelper from "@/helper/cookie.js";

export const useAuthStore = defineStore('auth', () =>{

    const token = ref(CookieHelper.getCookie('token'));

    async function logIn(user){
        const response = await client.post(`auth/authenticate`,user);

        if (response.status === 200) {
            CookieHelper.setCookie('token', response.data.token, 1);
            token.value = response.data.token;
        }
        console.log(response)
        console.log("test")
        console.log(response)

    }

    async function signUp(registerUser){
        const  response = await client.post(`auth/register`,registerUser);
    }

    function logOut() {
        if (isLoggedIn.value) {
            CookieHelper.deleteCookie('token'); // Delete token cookie
            token.value = null;

        }

    }
    // getters
    const loggedInUser = computed(() => {
        // nese ka token dekodoje
        return token.value ? jwtDecode(token.value) : null;
    })

    const isAdmin = computed(() => {
        return loggedInUser.value.role === 'ADMIN';
    })

    const id = computed(() => {
        return loggedInUser.value.id;
    })

    const email = computed(() => {
        return loggedInUser.value.sub;
    })


    const isLoggedIn = computed(() => {
        return !!token.value;
    })





    return { logIn, signUp, logOut , isLoggedIn , loggedInUser ,token, id , email , isAdmin}

})
