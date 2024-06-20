<script setup>
import { computed, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";


const authStore = useAuthStore();
const formData = reactive({
  firstName:'',
  lastName:'',
  email: '',
  password: '',
})

const formIsValid = ref(true);
const error = ref('');

const router = useRouter();
const route = useRoute();

async function handleSubmit(){
  formIsValid.value = true;

  if(!formData.email || !formData.password || !formData.firstName || !formData.lastName) {

    formIsValid.value = false;

    error.value = 'All Fields are required.'

    await Swal.fire({
      title: "Error!",
      text: error.value,
      icon: "error"
    });

    return;
  }

  try {
    await authStore.signUp(formData)

    await Swal.fire({
      title: "Signed up successfully!",
      text: "Please login!",
      icon: "success"
    });
    const redirectUrl = `${route.query.redirect || "logIn"}`

    await router.push({name: redirectUrl});

  } catch (e) {
    formIsValid.value = false;
    // error.value = e.response.data.error.message;
    console.log(e)
  }

}

</script>

<template>
  <div  style="background-color : #ebf2fa ; height : 100vh ; width: 100%" >

    <div class="col-md-6 offset-md-3">


      <div class="text-center">
        <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
             width="200px" alt="profile">
      </div>

        <form @submit.prevent="handleSubmit">




          <!-- FirstName input -->
          <div class="mb-3">
            <input type="text" class="form-control " id="Username" aria-describedby="emailHelp"
                   placeholder="First Name"  v-model.trim="formData.firstName">
          </div>

          <!-- LastName input -->
          <div class="mb-3">
            <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                   placeholder="last Name"  v-model.trim="formData.lastName">
          </div>

          <!-- email input -->
          <div class="mb-3">
            <input type="email" class="form-control" id="Username" aria-describedby="emailHelp"
                   placeholder=" email"  v-model.trim="formData.email">
          </div>

          <!-- Password input -->
          <div class="mb-3">
            <input type="password" class="form-control" id="password" placeholder="password"  v-model.trim="formData.password">
          </div>

          <!-- Submit  -->
          <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Register</button></div>


          <div id="emailHelp" class="form-text text-center mb-5 text-dark">Have an Account
            -> <router-link to="/login" class="navbar-brand" ><strong>Log In</strong></router-link>
          </div>
        </form>
      </div>

    </div>


</template>

<style scoped>


.btn-color{
  background-color: #0e1c36;
  color: #fff;

}
.btn-color:hover{
  background-color: #fff;
  color: #0e1c36;
  border: 2px solid #0e1c36;
}

.profile-image-pic{
  height: 200px;
  width: 200px;
  object-fit: cover;
}


a{
  text-decoration: none;
}
</style>