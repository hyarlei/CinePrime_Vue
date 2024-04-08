<template>
    <form @submit.prevent="handleSubmit">
        <InputText label="Email:" v-model="email" />
        <InputText label="Senha:" type="password" v-model="password" />
        <Button variant="success" text="Entrar" type="submit" />
    </form>
</template>

<script>
import { ref } from 'vue';
import { useNavigate } from 'vue-router';
import InputText from '@/components/InputText.vue';
import Button from '@/components/Button.vue';
import { useAuth } from '@/hooks/useAuth';

export default {
    components: {
        InputText,
        Button
    },
    setup() {
        const { signIn } = useAuth();
        const navigate = useNavigate();
        const email = ref('');
        const password = ref('');

        const handleSubmit = async () => {
            try {
                await signIn(email.value, password.value);
                navigate('/');
            } catch (error) {
                console.log("ERROR ->", error);
                alert(`Erro: ${error.response.data.message}`);
            }
        };

        return {
            email,
            password,
            handleSubmit
        };
    }
};
</script>

<style>
/* Estilos opcionais */
</style>