<script setup>
import { ref, onMounted } from 'vue';
import BalanceTableComponent from '@/components/homeComponent/BalanceTableComponent.vue';
import ExpensesTableComponent from "@/components/homeComponent/ExpensesTableComponent.vue";
import SideBarComponent from "@/components/SideBarComponent.vue";
import CardComponent from "@/components/CardComponent.vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useFinanceStore } from "@/stores/financeStore.js";
import Swal from "sweetalert2";
import BalanceModalComponent from '@/components/modals/BalanceModalComponent.vue';
import ExpensesModalComponent from '@/components/modals/ExpensesModalComponent.vue';

const authStore = useAuthStore();
const financeStore = useFinanceStore();

const id = authStore.id;
const userBalances = ref([]);
const userExpenses = ref([]);

const showBalanceModal = ref(false);
const selectedBalance = ref({});

const showExpensesModal = ref(false);
const selectedExpense = ref({});

onMounted(async () => {
  try {
    const balances = await financeStore.getAllUserBalance(id);
    userBalances.value = balances;
    console.log(balances);
  } catch (error) {
    console.error('Failed to fetch user balances:', error);
  }

  try {
    const expenses = await financeStore.getAllUserExpenses(id);
    userExpenses.value = expenses;
    console.log(expenses);
  } catch (error) {
    console.error('Failed to fetch user expenses:', error);
  }

  console.log("Test");
  console.log(id);
});

const balanceToExpenses = ref('Balance');
const isBalance = ref(true);

const changeBalanceToExpenses = () => {
  isBalance.value = !isBalance.value;
  balanceToExpenses.value = isBalance.value ? 'Balance' : 'Expenses';
};

const deleteUserBalance = async (id) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      await financeStore.deleteBalance(id);
      await Swal.fire({
        title: "Balance Deleted successfully!",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    console.error('Failed to delete user expenses:', error);
  }
};

const deleteUserExpenses = async (id) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      await financeStore.deleteExpenses(id);
      await Swal.fire({
        title: "Expenses Deleted successfully!",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    }
  } catch (error) {
    console.error('Failed to delete user expenses:', error);
  }
};

const viewBalance = (balance) => {
  selectedBalance.value = { ...balance };
  showBalanceModal.value = true;
};

const saveBalance = async (updatedBalance) => {
  try {
    console.log(updatedBalance)
    await financeStore.updateBalance(updatedBalance.id, updatedBalance);
    Swal.fire({
      title: "Expenses Updated successfully!",
      icon: "success"
    }).then(() => {
      showExpensesModal.value = false;
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error('Failed to update balance:', error);
  }
};

const viewExpenses = (expense) => {
  selectedExpense.value = { ...expense };
  showExpensesModal.value = true;
};

const saveExpenses = async (updatedExpense) => {
  console.log(updatedExpense)
  try {
    await financeStore.updateExpenses(updatedExpense.id ,updatedExpense);
    Swal.fire({
      title: "Expenses Updated successfully!",
      icon: "success"
    }).then(() => {
      showExpensesModal.value = false;
    }).then(() => {
      window.location.reload();
    });
  } catch (error)
  {
    console.error('Failed to update expenses:', error);
  }
};

</script>



<template>
  <div class="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
    <SideBarComponent />
    <!-- Main content -->
    <div class="h-screen flex-grow-1 overflow-y-lg-auto">
      <!-- Header -->
      <header class="bg-surface-primary border-bottom pt-6">
        <div class="container-fluid">
          <div class="mb-npx">
            <div class="row align-items-center">
              <div class="mb-5">
                <!-- Title -->
                <h1 class="h1 mb-0 ls-tight text-center" style="color: #0e1c36">Finance Application</h1>
              </div>
              <!-- Actions -->
              <div class="col-sm-6 col-12 text-sm-end">
                <div class="mx-n1">
                  <!-- Add any actions if needed -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- Main -->
      <main class="py-6 bg-surface-secondary">
        <div class="container-fluid">
          <CardComponent/>
          <div class="card mb-4">
            <div class="d-flex justify-content-center">
              <button id="btn" @click="changeBalanceToExpenses" class="btn btn-sm btn-outline-primary w-23 h-10 mt-2 ">{{ balanceToExpenses }}</button>
            </div>
            <BalanceTableComponent v-if="isBalance" :balances="userBalances" :onViewBalance="viewBalance" :onDeleteBalance="deleteUserBalance" />
            <ExpensesTableComponent v-if="!isBalance" :expenses="userExpenses" :onViewExpenses="viewExpenses" :onDeleteExpenses="deleteUserExpenses"/>
          </div>
        </div>
      </main>
    </div>
  </div>
  <BalanceModalComponent v-if="showBalanceModal" :show="showBalanceModal" :balance="selectedBalance" @close="showBalanceModal = false" @save="saveBalance" />
  <ExpensesModalComponent v-if="showExpensesModal" :show="showExpensesModal" :expense="selectedExpense" @close="showExpensesModal = false" @save="saveExpenses" />
</template>


<style scoped>
@import url(https://unpkg.com/@webpixels/css@1.1.5/dist/index.css);
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");


</style>
