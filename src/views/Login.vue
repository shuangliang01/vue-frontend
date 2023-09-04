<template>
  <b-alert show>Default Alert</b-alert>
  <div class="middle-box">
    <div>
      <h3 class="welcome">User Login</h3>
    </div>
    <div class="form-group">
      <label>Email</label>
      <br />
      <input class="form-control" v-model="email"/>
    </div>
    <div class="form-group">
      <label>Password</label>
      <br />
      <input class="form-control" v-model="password" type="password"/>
    </div>
    <div class="form-group">
      <button @click="login">Login</button>
    </div>
    <div class="form-group">
      <a href='/register'>Create an account</a>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import router from "@/router";
import {withBasename} from "@/utils/params";
export default {
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login() {
      const user = new FormData()
      user.append('email', this.email)
      user.append('password', md5(this.password))
      fetch(withBasename("/login"), {
        method:'post',
        body: user,
        credentials: 'same-origin'
      }).then(response => {
        if(response.ok){
          response.json().then(data => {
            if (data.status == 200) {
              localStorage.token = data.token
              router.push('/expenses')
            } else {
              alert(data.message)
            }
          })
        }
        else{
          response.json().then(e => {
            console.log(e)
          })
        }
      })
    }
  }
}
</script>

<style scoped src="../assets/main.css">

</style>
