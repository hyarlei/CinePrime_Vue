<template>
    <div>
        <button @click="handleBack" style="width: fit-content; margin-right: 20px; align-self: start;">Voltar</button>
        <button @click="handleAdd"
            style="margin-bottom: 20px; align-self: flex-end; border-color: green; background-color: green; font-weight: bold;">Cadastrar
            novo funcionário</button>
        <template v-if="loading">
            <spinner />
        </template>
        <template v-else-if="!employees">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Ainda sem funcionários</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </Table>
        </template>
        <template v-else>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in employees" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ employee.nome }}</td>
                        <td>{{ employee.cpf }}</td>
                        <td>{{ employee.telefone }}</td>
                        <td>{{ employee.email }}</td>
                        <td>
                            <button @click="handleEdit(employee.id)"
                                style="background-color: #4682B4; color: #f0f0f0; font-weight: bold; margin-right: 10px;">Editar</button>
                            <button @click="handleDelete(employee.id)"
                                style="background-color: #F0373E; color: #0f0f0f; font-weight: bold;">Excluir</button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </template>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useNavigate } from 'vue-router';
import Api from '@/services/Api';
import Button from '@/components/Button';

export default {
    components: {
        Button
    },
    setup() {
        const navigate = useNavigate();
        const { user } = useAuth();
        const loadedUser = ref(false);
        const loading = ref(false);
        const employees = ref([]);

        const loadEmployees = async () => {
            try {
                loading.value = true;
                const { data } = await Api.get('/employee');
                if (data.length > 0) {
                    employees.value = data;
                } else {
                    employees.value = false;
                }
            } catch (error) {
                console.log('ERROR ->', error.message);
                alert('Erro ao carregar funcionários. Tente novamente mais tarde.');
            } finally {
                loading.value = false;
            }
        };

        const excludeEmployee = async (id) => {
            try {
                loading.value = true;
                await Api.delete('/employee/' + id);
                alert(`Funcionário excluído com sucesso!`);
                employees.value = employees.value.filter((employee) => employee.id !== id);
            } catch (error) {
                console.log('ERROR ->', error.message);
                alert(`Erro: ${error.response.data.message}`);
            } finally {
                loading.value = false;
            }
        };

        const handleBack = () => {
            navigate('/');
        };

        const handleAdd = () => {
            navigate('/funcionario/cadastrar');
        };

        const handleEdit = (id) => {
            navigate('/funcionario/editar', { state: { id } });
        };

        const handleDelete = (id) => {
            if (confirm('Tem certeza que deseja excluir esse funcionário?')) {
                excludeEmployee(id);
            } else {
                return false;
            }
        };

        onMounted(() => {
            if (user && !loadedUser.value) {
                loadedUser.value = true;
                loadEmployees();
            }
        });

        return {
            loading,
            employees,
            handleBack,
            handleAdd,
            handleEdit,
            handleDelete
        };
    }
};
</script>

<style>
/* Estilos opcionais podem ser adicionados aqui */
</style>