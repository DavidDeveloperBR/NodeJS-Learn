<template>
  <div>
    <h1>Registro de Usuário</h1>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">
            {{ error }}
          </div>
        </div>

        <p>E-mail</p>
        <input
          type="email"
          v-model="email"
          placeholder="email@email.com.br"
          class="input"
        />
        <p>Senha</p>
        <input
          type="password"
          v-model="password"
          placeholder="*******"
          class="input"
        />
        <hr />
        <button class="button is-success" @click="login">Logar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      email: "",
      error: undefined
    };
  },
  methods: {
    login() {
      axios.post("http://localhost:8686/login", {
        email: this.email,
        password: this.password
      }).then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        this.$router.push({name: 'home'});
      }).catch(err => {
          var msgError = err.response.data.err;
          this.error = msgError;
      })
    }
  }
};
</script>

<style>
</style>