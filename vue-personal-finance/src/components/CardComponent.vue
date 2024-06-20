<script setup>
import { ref, onMounted } from 'vue';
import { useFinanceStore } from '@/stores/financeStore';
import { useAuthStore } from '@/stores/authStore.js';

const authStore = useAuthStore();
const financeStore = useFinanceStore();

const userId = authStore.id;
const budget = ref(0);

const expensesByCategory = ref({});



onMounted(async () => {
  try {
    const userBudget = await financeStore.calculateUserBudget(userId);
    budget.value = userBudget.sum;

    const categoryList = await financeStore.getAllCategories();


    console.log(categoryList)

    for (const category of categoryList) {
      const expenses = await financeStore.calculateUserExpensesByCategory(userId,  category );
      expensesByCategory.value[category] = expenses.sum;
      console.log( expensesByCategory.value[category])
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  console.log()
});
</script>

<template>
  <div class="row g-6 mb-6">
    <div class="col-xl-3 col-sm-6 col-12">
      <div class="card shadow border-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <span class="h6 font-semibold text-muted text-sm d-block mb-2">Budget</span>
              <p class="h3 font-bold mb-0" :class="budget < 0 ? 'text-danger' : 'text-success'"> $ {{ budget }}</p>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                <i class="bi bi-credit-card"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-12">
      <div class="card shadow border-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <span class="h6 font-semibold text-muted text-sm d-block mb-2">Shopping</span>
              <p class="h3 font-bold mb-0">$ {{expensesByCategory["SHOPPING"]}}</p>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                <i class="bi bi-bag"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-12">
      <div class="card shadow border-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <span class="h6 font-semibold text-muted text-sm d-block mb-2">Food & Drinks</span>
              <p class="h3 font-bold mb-0">$ {{expensesByCategory["FOOD_DRINKS"]}}</p>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                <i class="bi bi-cup-hot"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-12">
      <div class="card shadow border-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <span class="h6 font-semibold text-muted text-sm d-block mb-2">Bills & Utilities</span>
              <p class="h3 font-bold mb-0 ">$ {{expensesByCategory["BILLS_UTILITIES"]}}</p>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-warning text-white text-lg rounded-circle">
                <i class="bi bi-house"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-xl-3, .col-sm-6, .col-12 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.col-xl-3 {
  flex: 0 0 25%;
  max-width: 25%;
}

.col-sm-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.card {
  border-radius: 0.375rem;
  background-color: #fff;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.card-body {
  padding: 1.25rem;
}

.icon-shape {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.bg-tertiary {
  background-color: #6c757d; /* Adjust the color as needed */
}

.bg-primary {
  background-color: #007bff; /* Adjust the color as needed */
}

.bg-info {
  background-color: #17a2b8; /* Adjust the color as needed */
}

.bg-warning {
  background-color: #ffc107; /* Adjust the color as needed */
}

.text-white {
  color: #fff !important;
}

.text-lg {
  font-size: 1.25rem;
}

.rounded-circle {
  border-radius: 50% !important;
}
</style>
