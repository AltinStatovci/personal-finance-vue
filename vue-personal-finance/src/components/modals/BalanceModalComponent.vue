<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  show: Boolean,
  balance: Object,
});

const emit = defineEmits(['close', 'save']);

const balanceCopy = ref({ ...props.balance });

watchEffect(() => {
  balanceCopy.value = { ...props.balance };
});

const closeModal = () => {
  emit('close');
};

const saveBalance = () => {
  emit('save', balanceCopy.value);
};
</script>



<template>
  <div v-if="show" class="modal" tabindex="-1" role="dialog" style="display: block;">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Update Balance</h5>
          <button type="button" class="btn-close" @click="closeModal">

          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveBalance">
            <div class="row gx-3 mb-3">
              <div class="col-md-6">
                <label class="small mb-1" for="inputAmount">Amount</label>
                <input class="form-control" id="inputAmount" v-model="balance.budget" type="number" placeholder="Enter Cash" required>
              </div>
              <div class="col-md-6">
                <label class="small mb-1" for="inputSource">Source</label>
                <input class="form-control" id="inputSource" v-model="balance.source" type="text" placeholder="Source" required>
              </div>
            </div>
            <div class="mb-3">
              <label class="small mb-1" for="inputDate">Date</label>
              <input class="form-control" id="inputDate" v-model="balance.date" type="date" placeholder="Enter Date" required>
            </div>
            <button class="btn btn-primary" type="submit">Update Balance</button>
          </form>
        </div>
      </div>
    </div>
  </div>
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
