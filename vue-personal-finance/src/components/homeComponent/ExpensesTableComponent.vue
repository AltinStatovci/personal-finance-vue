<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  expenses: Array,
  onViewExpenses: Function,
  onDeleteExpenses: Function,
});

const { expenses } = toRefs(props);


</script>

<template>

  <div class="card-header">
    <div class="table-responsive" id="app">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Expenses</th>
          <th scope="col">purpose</th>
          <th scope="col">Date</th>
          <th scope="col">Category</th>
          <th scope="col" class="text-end">

          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(expense, index) in expenses" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ expense.expenses }}</td>
          <td>{{ expense.purpose }}</td>
          <td>{{ expense.date }}</td>
          <td>{{ expense.category }}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-success m-2" @click="onViewExpenses(expense)">View</button>
            <button class="btn btn-sm btn-square btn-outline-danger text-danger-hover" @click="onDeleteExpenses(expense.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css");
</style>
