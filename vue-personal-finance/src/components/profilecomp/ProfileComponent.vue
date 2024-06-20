<script setup>
import {  toRefs } from 'vue';

const props = defineProps({
  user: Object,
  editProfile: Function,
  deleteProfile:Function
});

const { user } = toRefs(props);
</script>

<template>
  <div class="row">
    <div class="col-xl-4">
      <div class="card mb-4 mb-xl-0">
        <div class="card-header">Profile</div>
        <div class="card-body text-center">
          <img class="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="">
          <div class="small font-italic text-muted mb-4">{{ user.firstName }} {{ user.lastName }}</div>
          <button class="btn btn-primary" type="button">--------</button>
        </div>
      </div>
    </div>
    <div class="col-xl-8">
      <div class="card mb-4">
        <div class="card-header">Account Details</div>
        <div class="card-body">
          <form>
            <div class="row gx-3 mb-3">
              <div class="col-md-6">
                <label class="small mb-1" for="inputFirstName">First name</label>
                <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" v-model="user.firstName">
              </div>
              <div class="col-md-6">
                <label class="small mb-1" for="inputLastName">Last name</label>
                <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" v-model="user.lastName">
              </div>
            </div>
            <div class="mb-3">
              <label class="small mb-1" for="inputEmailAddress">Email address</label>
              <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" v-model="user.email">
            </div>
            <button class="btn btn-primary" type="button" @click="editProfile">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  margin-top: 20px;
  background-color: #f2f6fc;
  color: #69707a;
}

.img-account-profile {
  height: 10rem;
}

.rounded-circle {
  border-radius: 50% !important;
}

.card {
  box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%);
}

.card .card-header {
  font-weight: 500;
}

.card-header:first-child {
  border-radius: 0.35rem 0.35rem 0 0;
}

.card-header {
  padding: 1rem 1.35rem;
  margin-bottom: 0;
  background-color: rgba(33, 40, 50, 0.03);
  border-bottom: 1px solid rgba(33, 40, 50, 0.125);
}

</style>

