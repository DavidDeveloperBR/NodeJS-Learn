<template>
    <div>
        <input type="text" name="email" placeholder="E-mail"><br/>
        <input type="text" name="nome" placeholder="Nome"><br/>
        <button>Teste!</button>
        <h4>{{parametroRota}}</h4>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    created() {
        //this.parametroRota = this.$route.params.data;
    },
    data() {
        return {
            parametroRota: 'Nada',
            nome: '',
        }
    },
}
</script>
