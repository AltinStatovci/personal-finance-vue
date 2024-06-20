<script setup>
import { ref, onMounted } from 'vue';
import SideBarComponent from "@/components/SideBarComponent.vue";
import BalanceFormComponent from "@/components/AddBalanceForm/BalanceFormComponent.vue";
import ExpensesFormComponent from "@/components/AddBalanceForm/ExpensesFormComponent.vue";
import CookieHelper from "@/helper/cookie.js";
import { useFinanceStore } from "@/stores/financeStore.js";
import Swal from "sweetalert2";
import router from "@/router/index.js";

const financeStore = useFinanceStore();

const activeTab = ref('Balance');

const addBalance = async (newBalance) => {
  try {
    await financeStore.addBalance(newBalance);
    await Swal.fire({
      title: "Balance Added successfully!",
      icon: "success"
    }).then(() => {
      router.push({ name: 'home' });
    });
  } catch (error) {
    console.error('Failed to add balance:', error);
  }
};

const addExpenses = async (newExpenses) => {
  try {
    await financeStore.addExpenses(newExpenses);
    await Swal.fire({
      title: "Expenses Added successfully!",
      icon: "success"
    }).then(() => {
      router.push({ name: 'home' });
    });
  } catch (error) {
    console.error('Failed to add expenses:', error);
  }
};

const changeTab = (tab) => {
  activeTab.value = tab;
};

onMounted(() => {
  console.log(CookieHelper.getCookie("token"));
});
</script>

<template>
  <div class="d-flex">
    <SideBarComponent/>
    <div class="container-xl px-4 mt-4">
      <nav class="nav nav-borders">
        <button class="nav-link" :class="{ active: activeTab === 'Balance' }" @click.prevent="changeTab('Balance')">Add Balance</button>
        <button class="nav-link" :class="{ active: activeTab === 'Expenses' }" @click.prevent="changeTab('Expenses')">Add Expenses</button>
      </nav>
      <hr class="mt-0 mb-4">
      <transition name="slide-fade">
        <BalanceFormComponent v-if="activeTab === 'Balance'" :addBalance="addBalance"/>
      </transition>
      <transition name="slide-fade">
        <ExpensesFormComponent v-if="activeTab === 'Expenses'" :addExpenses="addExpenses"/>
      </transition>
    </div>
  </div>
</template>

<style scoped>

</style>
