<template>
    <div>
        <button @click="handleBack" style="width: fit-content; margin-right: 20px; align-self: start;">Voltar</button>
        <form @submit.prevent="handleSubmit">
            <InputText label="Nome:" placeholder="Ex: Ana Maria" v-model="name" />
            <InputText label="CPF:" placeholder="Ex: 02738499302" v-model="cpf" />
            <InputText label="Email:" placeholder="Ex: anamaria@gmail.com" v-model="email" />
            <InputText label="Telefone:" placeholder="Ex: (85) 94344-4385" v-model="phone" />
            <InputText v-if="!editing" label="Senha:" placeholder="Senha" type="password" v-model="password" />
            <Button variant="success" text="Salvar" />
        </form>
        <spinner v-if="loading" />
    </div>
</template>

<script>
import { ref } from 'vue';
import { useNavigate, useLocation } from 'vue-router';
import Api from '@/services/Api';
import InputText from '@/components/InputText';
import Button from '@/components/Button';

export default {
    setup() {
        const navigate = useNavigate();
        const location = useLocation();
        const editing = location.state?.id;
        const loadedEmployee = ref(false);
        const id = ref(null);
        const loading = ref(false);
        const name = ref('');
        const cpf = ref('');
        const email = ref('');
        const phone = ref('');
        const password = ref('');

        const fetchEmployee = async () => {
            try {
                loading.value = true;
                const { data } = await Api.get('/employee/' + id.value);
                name.value = data.nome;
                cpf.value = data.cpf;
                email.value = data.email;
                phone.value = data.telefone;
            } catch (error) {
                console.log('ERROR ->', error.message);
                alert('Erro ao carregar funcionário. Tente novamente mais tarde');
            } finally {
                loading.value = false;
            }
        };

        const handleSubmit = async () => {
            try {
                loading.value = true;
                if (editing) {
                    const { data } = await Api.put('/employee/' + id.value, {
                        nome: name.value,
                        cpf: cpf.value,
                        email: email.value,
                        telefone: phone.value,
                        password: password.value,
                    });
                    alert(`Funcionário ${data.nome} atualizado com sucesso!`);
                    navigate('/funcionario/list');
                } else {
                    const { data } = await Api.post('/employee/', {
                        nome: name.value,
                        cpf: cpf.value,
                        email: email.value,
                        telefone: phone.value,
                        password: password.value,
                    });
                    alert(`Funcionário ${data.nome} cadastrado com sucesso!`);
                    navigate('/funcionario/list');
                }
            } catch (error) {
                console.log('ERROR ->', error.message);
                alert(`Erro: ${error.response.data.message}`);
            } finally {
                loading.value = false;
            }
        };

        const handleBack = () => {
            navigate('/funcionario/list');
        };

        if (editing && loadedEmployee.value === false) {
            fetchEmployee();
            loadedEmployee.value = true;
            id.value = location.state.id;
        }

        return {
            name,
            cpf,
            email,
            phone,
            password,
            loading,
            handleSubmit,
            handleBack,
            editing
        };
    },
    components: {
        InputText,
        Button
    }
};
</script>

<style>
/* Estilos opcionais podem ser adicionados aqui */
</style>