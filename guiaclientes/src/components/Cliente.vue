<template>
    <div :class="{'cliente': !isPremium,'cliente-premium': isPremium}">
        <h4>Nome: {{cliente.nome}}</h4>
        <p>E-mail: {{cliente.email}}</p>
        <p v-if="showIdade === true">Idade: {{cliente.idade}}</p>
        <p v-else-if="showIdade > 23">else if</p>
        <p v-else>Esse cliente escondeu a idade</p>       
        <p v-show="showIdade === true">Idade: {{cliente.idade}}</p>
        <button @click="mudarCor($event)" >Mudar cor!</button>
        <button @click="emitirEventoDelete">Deletar</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isPremium: true
        }
    },
    props: {
        cliente: Object,
        showIdade: Boolean
    },
    methods:{
        mudarCor: function($event){
            console.log($event);
            this.isPremium = !this.isPremium
        },
        emitirEventoDelete: function(){
            console.log("Emitindo do filho!");
            this.$emit("meDelete", {id: this.cliente.id ,curso: "Formação Node.JS", emPromocao: true, component: this })
        },
        testar: function(){
            console.log("Testando!");
        }
    }
    
}
</script>

<style scoped>
    .cliente{
        background-color: #ECE5E3;
        max-width: 600px;
        height: 250px;
        padding: 1%;
        margin-top: 2%;
    }
    .cliente-premium {
        background-color: black;
        color: yellow;
        max-width: 600px;
        height: 250px;
        padding: 1%;
        margin-top: 2%;
    }

</style>