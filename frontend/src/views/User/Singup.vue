<template>
    <form @submit.prevent="handleSubmit">
        <InputText label="Nome:" placeholder="Ex: Ana Maria" v-model="name" />
        <InputText label="CPF:" placeholder="Ex: 000.000.000-00" v-model="formattedCpf" @input="handleCpfChange" />
        <InputText label="Email:" placeholder="Ex: anamaria@gmail.com" v-model="email" />
        <InputText label="Telefone:" placeholder="Ex: (00) 00000-0000" v-model="formattedPhone"
            @input="handlePhoneChange" />
        <InputText label="Senha:" type="password" v-model="password" />
        <Button variant="success" text="Cadastrar" type="submit" />
    </form>
</template>

<script>
import { ref } from 'vue';
import { useNavigate } from 'vue-router';
import InputText from '@/components/InputText.vue';
import Button from '@/components/Button.vue';
import Api from '@/services/Api.js';

export default {
    components: {
        InputText,
        Button
    },
    setup() {
        const navigate = useNavigate();

        const name = ref('');
        const cpf = ref('');
        const email = ref('');
        const phone = ref('');
        const password = ref('');
        const formattedCpf = ref('');
        const formattedPhone = ref('');

        const MAX_CPF_LENGTH = 11; // 11 digits for CPF
        const MAX_PHONE_LENGTH = 11; // 11 digits for Brazilian phone number

        const formatCpf = (value) => {
            // Implementação da formatação do CPF
        };

        const formatPhoneNumber = (rawValue) => {
            // Implementação da formatação do número de telefone
        };

        const handleInputChange = (rawValue, formatter, maxLength) => {
            // Implementação do tratamento de entrada para o CPF e telefone
        };

        const handleCpfChange = (e) => {
            // Implementação do manipulador de mudança para o CPF
        };

        const handlePhoneChange = (e) => {
            // Implementação do manipulador de mudança para o número de telefone
        };

        const handleSubmit = async () => {
            // Implementação do envio do formulário
        };

        return {
            name,
            cpf,
            email,
            phone,
            password,
            formattedCpf,
            formattedPhone,
            handleCpfChange,
            handlePhoneChange,
            handleSubmit
        };
    }
};
</script>

<style>
/* Estilos opcionais */
</style>