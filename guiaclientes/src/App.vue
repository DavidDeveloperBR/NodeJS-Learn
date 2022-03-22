<template>
  <div id="app">
    <h3>Cadastro</h3>
    <small id="nomeError" v-show="deuErro">Nome é inválido, tente novamente</small><br>
    <input type="text" placeholder="Nome" v-model="nomeField" />
    <input type="email" placeholder="E-mail" v-model="emailField" />
    <input type="number" placeholder="Idade" v-model="idadeField" />
    <button @click="cadastrarUsuario">Cadastrar</button>
    <div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-link">Link</button>
</div>
    <hr />
    <div v-for="(cliente, index) in orderClientes" :key="cliente.id">
      <h4>{{ index + 1 }}</h4>
      <Cliente :cliente="cliente" @meDelete="deletarUsuario($event)"/>
      <hr />
    </div>
  </div>
</template>

<script>
import Cliente from "./components/Cliente";
import _ from 'lodash';
//import Produto from './components/Produto';
export default {
  name: "App",
  data() {
    return {
      deuErro: false,
      nomeField: "",
      emailField: "",
      idadeField: 0,
      clientes: [
        {
          id: 1,
          nome: "cliente1",
          email: "cliente1@mail.com",
          idade: 65,
        },
        {
          id: 2,
          nome: "cliente2",
          email: "cliente2@mail.com",
          idade: 35,
        },
        {
          id: 3,
          nome: "cliente3",
          email: "cliente3@mail.com",
          idade: 21,
        },
      ],
    };
  },
  components: {
    Cliente,
    //Produto
  },
  methods: {
    cadastrarUsuario: function () {
      if (this.nomeField == "" || this.nomeField == " " || this.nomeField.lenght < 3) {
        this.deuErro = true;
      } else {
        this.clientes.push({
          id: Date.now(),
          nome: this.nomeField,
          email: this.emailField,
          idade: this.idadeField,
        });
        this.nomeField = "";
        this.emailField = "";
        this.idadeField = 0;
        this.deuErro = false
      }
    },
    deletarUsuario: function($event){
      console.log("Recebendo evento!")
      var id = $event.id;

      var novoArray = this.clientes.filter(cliente => cliente.id != id);
      this.clientes = novoArray;
    }
  },
  computed: {
    orderClientes() {
      return _.orderBy(this.clientes,['nome'], ['asc']);
    }
  }
};
</script>

<style>
  #nomeError {
    color: red;
  }


</style>
