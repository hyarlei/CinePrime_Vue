<template>
    <div>
        <h1>Bem vindo ao Cine Prime</h1>
        <p>A melhor plataforma de gerenciamento de cinemas da região!</p>

        <Button variant="success" text="Sobre a equipe Cine Prime" @click="handleSubmit"></Button>
    </div>
</template>

<script>

import Button from "../../components/Button/index.vue";

export default {
    components: {
        Button
    },
    methods: {
        async handleSubmit() {
            alert(`
          Hyarlei Silva Freitas - 542646\n
          Antonio Victor Cavalcante Rodrigues - 535739`);
        }
    }
};
</script>