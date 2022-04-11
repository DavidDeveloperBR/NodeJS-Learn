<template>
  <div>
    <h1>Edição de Usuário</h1>
    <hr />
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined">
          <div class="notification is-danger">
            {{ error }}
          </div>
        </div>

        <p>Nome</p>
        <input
          type="text"
          v-model="name"
          placeholder="Nome do usuário."
          class="input"
        />
        <p>E-mail</p>
        <input
          type="email"
          v-model="email"
          placeholder="email@email.com.br"
          class="input"
        />
        <hr />
        <button class="button is-success" @click="update">Editar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get("http://localhost:8686/user/" + this.$route.params.id, req)
      .then((res) => {
        this.id = res.data.id;
        this.name = res.data.name;
        this.email = res.data.email;
      })
      .catch((err) => {
        console.log(err);
        this.$router.push({ name: "users" });
      });
  },
  data() {
    return {
      id: -1,
      name: "",
      email: "",
      error: undefined,
    };
  },
  methods: {
    update() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .put("http://localhost:8686/user", {
          id: this.id,
          name: this.name,
          email: this.email,
        }, req)
        .then((res) => {
          console.log(res);
          this.$router.push({name: "users" });
        })
        .catch(err => {
          console.log(err);
          var msgError = err.response.data.err;
          this.error = msgError;       
        });
    },
  },
};
</script>

<style>
</style>