<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  show: Boolean,
  expense: Object,
});

const emit = defineEmits(['close', 'save']);

const expenseCopy = ref({ ...props.expense });

watchEffect(() => {
  expenseCopy.value = { ...props.expense };
});

const closeModal = () => {
  emit('close');
};

const saveExpenses = () => {
  emit('save', expenseCopy.value);
};
</script>


<template>
  <transition name="modal">
    <div v-if="show" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Expenses</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveExpenses">
              <div class="row gx-3 mb-3">
                <div class="col-md-6">
                  <label class="small mb-1" for="inputAmount">Amount</label>
                  <input class="form-control" id="inputAmount" v-model="expense.expenses" type="number" placeholder="Enter Expenses" required>
                </div>
                <div class="col-md-6">
                  <label class="small mb-1" for="inputPurpose">Purpose</label>
                  <input class="form-control" id="inputPurpose" v-model="expense.purpose" type="text" placeholder="Purpose" required>
                </div>
              </div>
              <div class="mb-3">
                <label class="small mb-1" for="inputCategory">Category</label>
                <select class="form-control" id="inputCategory" v-model="expense.category" required>
                  <option value="" disabled>Select Category</option>
                  <option value="SHOPPING">SHOPPING</option>
                  <option value="FOOD_DRINKS">FOOD_DRINKS</option>
                  <option value="BILLS_UTILITIES">BILLS_UTILITIES</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="small mb-1" for="inputDate">Date</label>
                <input class="form-control" id="inputDate" v-model="expense.date" type="date" placeholder="Enter Date" required>
              </div>
              <button class="btn btn-primary" type="submit">Update Expenses</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>



<style scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.modal-dialog {
  margin: 1.75rem auto;
}


</style>
