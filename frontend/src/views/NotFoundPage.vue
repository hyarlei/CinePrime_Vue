<template>
    <div>
        <h1>Oops!</h1>
        <h3>Erro 404</h3>
        <p>Essa página não existe no Cine Prime.</p>
    </div>
</template>

<script>
export default {
    created() {
        // Verifica se a rota atual é a rota de erro 404
        if (this.$route.fullPath !== '/404') {
            // Redireciona para a página de erro 404
            this.$router.replace('/404');
        }
    }
};
</script>

<style scoped>
/* Estilos opcionais podem ser adicionados aqui */
</style>