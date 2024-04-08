<template>
    <div v-if="!isUserAllowed">
        <h1>Você não tem acesso a esta página</h1>
        <p>Clique no botão abaixo para voltar para a página inicial</p>
        <router-link to="/">Voltar para página inicial</router-link>
    </div>
    <div v-else>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        isUserAllowed() {
            const user = this.$store.state.auth.user; // Supondo que o estado do usuário esteja armazenado no Vuex
            const isAdmin = user && user.isAdmin;
            const isEmployee = user && user.profile === 'employee';
            const isClient = user && user.profile === 'client';

            if (!user) {
                console.log('Usuário não logado tentando entrar em rota protegida');
                return false;
            }

            if (this.type === 'admin' && !isAdmin) {
                console.log('Usuário não admin tentando acessar rota de admin');
                return false;
            }

            if (this.type === 'employee' && !isEmployee) {
                console.log('Cliente tentando entrar em rota de funcionário');
                return false;
            }

            return true;
        }
    },
    props: {
        type: String
    }
};
</script>

<style>
/* Estilos opcionais */
</style>