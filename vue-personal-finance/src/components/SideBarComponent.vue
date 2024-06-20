<script setup>

import {useAuthStore} from "@/stores/authStore.js";
import {useRouter} from "vue-router";
import Swal from "sweetalert2";

const authStore = useAuthStore();
const router = useRouter();


async function onLogOut() {
  await authStore.logOut();
  await Swal.fire({
    title: "Logged out!",
    text: "You have been logged out!",
    icon: "success",
  });
 await router.push({name:'logIn'});
}

async function onProfile() {
  await router.push({name:'profile'});
}


const onDashBoard = () => {
  router.push({path:'/'})
}

const onForm = () => {
  router.push({path:'/addCashOrExpenses'})
}
</script>

<template>
  <!-- Vertical Navbar -->
  <nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
    <div class="container-fluid">
      <!-- Hamburger  -->
      <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Brand -->
      <a class="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
        <h3 class="text-success"><span class="text-info">Finance</span>App</h3>
      </a>

      <!-- Collapse -->
      <div class="collapse navbar-collapse" id="sidebarCollapse">
        <!-- Navigation -->
        <ul class="navbar-nav">

          <li class="nav-item">
            <button class="nav-link" @click="onDashBoard">
              <i class="bi bi-house"></i> Dashboard
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link" @click="onForm">
              <i class="bi bi-cash-coin"></i> Add Cash Or Expenses
            </button>
          </li>






        </ul>
        <!-- Divider -->
        <hr class="navbar-divider my-5 opacity-20">
        <!-- Navigation -->

        <!-- Push content down -->
        <div class="mt-auto"></div>
        <!-- User (md) -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="nav-link" @click="onProfile">
              <i class="bi bi-person-square"></i> Profile
            </button>
          </li>
          <li class="nav-item">
            <button @click="onLogOut" class="btn btn-outline-danger btn-sm m-lg-5">
              <i class="bi bi-box-arrow-left"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>