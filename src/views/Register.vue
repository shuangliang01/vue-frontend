<template>
  <form class="middle-box" id="userRegisterForm" @submit="checkForm">
    <div>
      <h3 class="welcome">Register</h3>
    </div>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <div class="form-group">
      <label>User Name</label>
      <input
          class="form-control"
          type="text" placeholder="User Name"
          v-model="username"
      />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input
          class="form-control"
          type="email" placeholder="email"
          v-model="email"
      />
    </div>

    <div class="form-group">
      <label>Password</label>
      <input
          class="form-control"
          type="password" placeholder="Password"
          v-model="password"
      />
    </div>

    <div class="form-group">
      <label>Confirm Password</label>
      <input
          class="form-control"
          type="password" placeholder="Confirm Password"
          v-model="confirmpassword"
      />
    </div>
    <button class="success btn btn-primary block full-width m-b">Register</button>
  </form>
</template>

<script>
import md5 from 'md5'
import router from "@/router";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      errors: "",
    }
  },
  methods: {
    register(data) {
      return fetch("http://localhost:3000/api/register", {
        method:'post',
        body: data,
        credentials: 'same-origin'
      }).then(response => {
        if(response.ok){
          response.json().then(data => {
            if (data.status === 200) {
              router.push('/login')
            }
            if (data.status === 201) {
              this.errors.push(data.message);
            }
            console.log(data)
          })

        }
        else{
          response.json().then(error => {
            console.log(error)
          })
        }
      })
    },
    checkForm: function (e) {
      e.preventDefault();
      this.errors = [];
      if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }
      if (this.password !== this.confirmpassword) {
        this.errors.push('Confirm Password not match');
      }
      if (!this.errors.length) {
        const data = new FormData();
        data.append('username', this.username);
        data.append('email', this.email);
        data.append('password', md5(this.password));
        this.register(data)
      }
    },
    validEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  }

}
</script>



<style scoped src="../assets/main.css">

</style>