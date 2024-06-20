<script setup>
import { ref, onMounted } from 'vue';
import SideBarComponent from "@/components/SideBarComponent.vue";
import ProfileComponent from "@/components/profilecomp/ProfileComponent.vue";
import SecurityComponent from "@/components/profilecomp/SecurityComponent.vue";
import AdminComponent from "@/components/profilecomp/AdminComponent.vue";
import { useUserStore } from "@/stores/userStore.js";
import { useAuthStore } from "@/stores/authStore.js";
import Swal from "sweetalert2";

const authStore = useAuthStore();
const userStore = useUserStore();

const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});

const users = ref([]);
const activeTab = ref('profile');
const id = authStore.id;
const isAdmin = authStore.isAdmin;

onMounted(async () => {
  const fetchedUser = await userStore.getUserById(id);
  if (fetchedUser) {
    user.value = fetchedUser;
  }

  const fetchedUsers = await userStore.getUsers();
  if (fetchedUsers) {
    users.value = fetchedUsers.value;
  }
});

const editProfile = async () => {
  try {
    await userStore.updateUser(id, user.value);
    await Swal.fire({
      title: "User updated successfully!",
      text: "Please press Okay!",
      icon: "success"
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    alert('Failed to update profile');
  }
};

const changePassword = async (newPassword) => {
  try {
    user.value.password = newPassword;
    await userStore.updateUser(id, user.value);
    await Swal.fire({
      title: "User updated successfully!",
      text: "Please press Okay!",
      icon: "success"
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    alert('Failed to update password');
  }
};

const updateUserRole = async (userr) => {
  try {
    if (userr.role === 'USER') {
      user.value.role = 'ADMIN';
    } else {
      user.value.role = 'USER';
    }

    user.value.firstName = userr.firstName;
    user.value.lastName = userr.lastName;
    user.value.email = userr.email;
    user.value.password = userr.password;

    await userStore.updateUser(userr.id, user.value);
    await Swal.fire({
      title: "User Role updated successfully!",
      text: "Please press Okay!",
      icon: "success"
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    alert('Failed to update user role');
  }
};

const deleteUser = async (userId) => {
  try {
    await userStore.deleteUser(userId);
    await Swal.fire({
      title: "User Deleted successfully!",
      icon: "success"
    }).then(() => {
      window.location.reload();
    });
  } catch (error) {
    alert('Failed to delete user');
  }
};

const changeTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="d-flex">
    <SideBarComponent/>
    <div class="container-xl px-4 mt-4">
      <nav class="nav nav-borders">
        <button class="nav-link" :class="{ active: activeTab === 'profile' }" @click.prevent="changeTab('profile')">Profile</button>
        <button class="nav-link" :class="{ active: activeTab === 'security' }" @click.prevent="changeTab('security')">Security</button>
        <button v-if="isAdmin" class="nav-link" :class="{ active: activeTab === 'admin' }" @click.prevent="changeTab('admin')">Admin</button>
      </nav>
      <hr class="mt-0 mb-4">
      <transition name="slide-fade">
        <ProfileComponent v-if="activeTab === 'profile'" :user="user" :editProfile="editProfile"/>
      </transition>

      <transition name="slide-fade">
        <SecurityComponent v-if="activeTab === 'security'" :changePassword="changePassword" :userId="id"/>
      </transition>

      <transition name="slide-fade">
        <AdminComponent v-if="activeTab === 'admin'" :users="users" :updateUserRole="updateUserRole" :deleteUser="deleteUser" :id="id"/>
      </transition>
    </div>
  </div>
</template>

<style scoped>

</style>

