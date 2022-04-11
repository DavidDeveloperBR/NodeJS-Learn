<template>
  <div>
    <h1>Painel ADM</h1>

    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Cargo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tfoot></tfoot>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            {{ user.name }}
          </td>
          <td>
            {{ user.email }}
          </td>
          <td>
            {{ processRole(user.role) }}
          </td>
          <td>
            <router-link :to="{name: 'edit', params:{id: user.id}}"><button class="button is-success">Editar</button></router-link> |
            <button class="button is-danger" @click="showModal(user.id)">
              Deletar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div :class="{ modal: true, 'is-active': modal }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">Você deseja excluir esse registro?</p>
          </header>
          <div class="card-content">
            <div class="content">
              <p>Exclusão do registro</p>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item" @click="deleteUser()">Sim</a>
            <a href="#" class="card-footer-item" @click="hideModal">Não</a>
          </footer>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="hideModal"
      ></button>
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

    axios.get("http://localhost:8686/user", req)
      .then((res) => {
        console.log(res);
        this.users = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Olá!");
  },
  data() {
    return {
      users: [],
      modal: false,
      deleteUserId: -1,
    };
  },
  methods: {
    hideModal() {
      this.modal = false;
    },
    showModal(id) {
      this.deleteUserId = id;
      this.modal = true;
    },
    deleteUser() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios.delete("http://localhost:8686/user/" + this.deleteUserId, req)
        .then(res => {
          console.log(res);
          this.users = this.users.filter(user => user.id != this.deleteUserId);
          this.modal = false;
        })
        .catch((err) => {
          console.log(err);
          this.modal = false;
        });
    },
  },
  computed: {
    processRole() {
      return (value) => {
        if (value == 0) {
          return "Comum";
        } else {
          return "Admin";
        }
      };
    },
  },
};
</script>

<style scoped>
</style>