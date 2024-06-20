<script setup>
import { ref } from 'vue';
import { useAuthStore } from "@/stores/authStore.js";

const authStore = useAuthStore();
const props = defineProps({
  addExpenses: Function
});

const userId = authStore.id;
const amount = ref('');
const purpose = ref('');
const category = ref('');
const date = ref('');

const saveExpenses = () => {
  const newExpenses = {
    userId: userId,
    expenses: amount.value,
    purpose: purpose.value,
    category: category.value,
    date: date.value
  };
  props.addExpenses(newExpenses);
};
</script>

<template>
  <div class="card mb-4">
    <div class="card-header">Add Expenses</div>
    <div class="card-body">
      <form>
        <div class="row gx-3 mb-3">
          <div class="col-md-6">
            <label class="small mb-1" for="inputAmount">Amount</label>
            <input class="form-control" id="inputAmount" type="number" placeholder="Enter Expenses" v-model="amount">
          </div>
          <div class="col-md-6">
            <label class="small mb-1" for="inputPurpose">Purpose</label>
            <input class="form-control" id="inputPurpose" type="text" placeholder="Purpose" v-model="purpose">
          </div>
        </div>
        <div class="mb-3">
          <label class="small mb-1" for="inputCategory">Category</label>
          <select class="form-control" id="inputCategory" v-model="category">
            <option value="" disabled>Select Category</option>
            <option value="SHOPPING">SHOPPING</option>
            <option value="FOOD_DRINKS">FOOD_DRINKS</option>
            <option value="BILLS_UTILITIES">BILLS_UTILITIES</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="small mb-1" for="inputDate">Date</label>
          <input class="form-control" id="inputDate" type="date" placeholder="Enter Date" v-model="date">
        </div>
        <button class="btn btn-primary" type="button" @click="saveExpenses">Add Expenses</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
