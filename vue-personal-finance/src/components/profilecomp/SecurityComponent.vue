<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { useUserStore } from "@/stores/userStore.js";
import Swal from "sweetalert2";

const props = defineProps({
  changePassword: Function,
  userId: String
});

const userStore = useUserStore();

const oldPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');
const oldPasswordValid = ref(true);

const validateOldPassword = async () => {
  try {
    const isValid = await userStore.checkOldPassword(props.userId, oldPassword.value);
    oldPasswordValid.value = isValid;

  } catch (error) {
    console.error('Error checking old password:', error);
    oldPasswordValid.value = false;
  }
}

const handleSubmit = async () => {
  if (!oldPasswordValid.value) {
    await Swal.fire({
      title: "Old password is incorrect!",
      icon: "error"
    });
    return;
  }

  if (newPassword.value !== confirmNewPassword.value) {
    await Swal.fire({
      title: "Passwords do not match!",
      icon: "error"
    });
    return;
  }

  if (!newPassword.value) {
    await Swal.fire({
      title: "New password cannot be empty!",
      icon: "error"
    });
    return;
  }

  await props.changePassword(newPassword.value);
}
</script>

<template>
  <div class="card mb-4">
    <div class="card-header">Change Password</div>
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="small mb-1" for="oldPassword">Old Password</label>
          <input class="form-control" id="oldPassword" type="password" v-model="oldPassword" @blur="validateOldPassword" required>
          <div v-if="!oldPasswordValid" class="text-danger">Old password is incorrect</div>
        </div>
        <div class="mb-3">
          <label class="small mb-1" for="newPassword">New Password</label>
          <input class="form-control" id="newPassword" type="password" v-model="newPassword" required>
        </div>
        <div class="mb-3">
          <label class="small mb-1" for="confirmNewPassword">Confirm New Password</label>
          <input class="form-control" id="confirmNewPassword" type="password" v-model="confirmNewPassword" required>
        </div>
        <button class="btn btn-primary" type="submit">Change Password</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
