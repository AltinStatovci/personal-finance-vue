<script setup>
import {onMounted, ref} from 'vue';
import {useAuthStore} from "@/stores/authStore.js";

const authStore = useAuthStore()

const props = defineProps({
  addBalance: Function
});



const userId = authStore.id
const amount = ref('');
const source = ref('');
const date = ref('');

const saveBalance = () => {
  const newBalance = {
    userId: userId,
    budget: amount.value,
    source: source.value,
    date: date.value
  };
  props.addBalance(newBalance);
};
</script>

<template>
  <div class="card mb-4">
    <div class="card-header">Add Balance</div>
    <div class="card-body">
      <form>
        <div class="row gx-3 mb-3">
          <div class="col-md-6">
            <label class="small mb-1" for="inputAmount">Amount</label>
            <input class="form-control" id="inputAmount" type="number" placeholder="Enter Cash" v-model="amount">
          </div>
          <div class="col-md-6">
            <label class="small mb-1" for="inputSource">Source</label>
            <input class="form-control" id="inputSource" type="text" placeholder="Source" v-model="source">
          </div>
        </div>
        <div class="mb-3">
          <label class="small mb-1" for="inputDate">Date</label>
          <input class="form-control" id="inputDate" type="date" placeholder="Enter Date" v-model="date">
        </div>
        <button class="btn btn-primary" type="button" @click="saveBalance">Add Balance</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
