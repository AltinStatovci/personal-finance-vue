<script setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  users: Array,
  updateUserRole: Function,
  deleteUser: Function,
  id: String
});

const { users, id } = toRefs(props);
</script>

<template>
  <div class="card mb-4">
    <div class="card-header">Manage Users</div>
    <div class="card-body">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="userr in users" :key="userr.id">
          <td>{{ userr.firstName }}</td>
          <td>{{ userr.lastName }}</td>
          <td>{{ userr.email }}</td>
          <td>{{ userr.role }}</td>
          <td>
            <button class="btn btn-danger btn-sm m-2" :disabled="userr.id === id" @click="deleteUser(userr.id)">Delete</button>
            <button class="btn btn-primary btn-sm" :disabled="userr.id === id" @click="updateUserRole(userr)">
              {{ userr.role === 'USER' ? 'Make Admin' : 'Make User' }}
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<style scoped>

</style>
