<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  balances: Array,
  onViewBalance: Function,
  onDeleteBalance: Function,
});

const { balances } = toRefs(props);
</script>

<template>
  <div class="card-header">
    <div class="table-responsive" id="app">
      <table class="table table-hover table-nowrap">
        <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Budget</th>
          <th scope="col">Source</th>
          <th scope="col">Date</th>
          <th scope="col">Category</th>
          <th scope="col" class="text-end"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(balance, index) in balances" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ balance.budget }}</td>
          <td>{{ balance.source }}</td>
          <td>{{ balance.date }}</td>
          <td>Balance</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-success m-2" @click="onViewBalance(balance)">View</button>
            <button class="btn btn-sm btn-square btn-outline-danger text-danger-hover" @click="onDeleteBalance(balance.id)">
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
