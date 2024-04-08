<template>
    <div>
        <button @click="goBack" style="width: fit-content; margin-bottom: 20px; align-self: start;">Voltar</button>
        <button @click="goToAddSession" class="btn mb-3"
            style="align-self: flex-end; border-color: green; font-weight: 500; color: white; background-color: green;">Cadastrar
            nova sessão</button>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Data</th>
                    <th>Sala</th>
                    <th>Filme</th>
                    <th>Tipo de exibição</th>
                    <th>Tipo de dublagem</th>
                    <th>Quantidade de ingressos vendidos</th>
                    <th>Capacidade</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(session, index) in sessions" :key="index">
                    <td>{{ session.id }}</td>
                    <td>{{ formatDate(session.dateTime) }}</td>
                    <td>{{ session.idRoom }}</td>
                    <td>{{ session.movie.name }}</td>
                    <td>{{ session.exibitionType }}</td>
                    <td>{{ session.dublingType }}</td>
                    <td>{{ session.atualTicketsQtd }}</td>
                    <td>{{ session.maxTicketsQtd }}</td>
                    <td>
                        <button @click="editSession(session.id)" class="btn"
                            style="background-color: #4682B4; color: #f0f0f0; font-weight: bold; margin-right: 10px;">Editar</button>
                        <button @click="confirmDeleteSession(session.id)" class="btn"
                            style="background-color: #F0373E; color: #ffff; font-weight: bold;">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <spinner v-if="loading" animation="border" role="status">
            <span class="visually-hidden">Carregando...</span>
        </spinner>
    </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import { useNavigate, useLocation } from 'vue-router';
import Api from '@/services/Api';
import { useAuth } from '@/hooks/useAuth';
import { converterParaFormatoDdMmYyyy } from '@/services/Convertions';

export default {
    setup() {
        const { user } = useAuth();
        const loadedUser = ref(false);
        const navigate = useNavigate();
        const loading = ref(false);
        const sessions = ref([]);

        const loadSessions = async () => {
            try {
                loading.value = true;
                const { data } = await Api.get('/session');
                sessions.value = data;
            } catch (error) {
                console.error('ERROR ->', error.message);
                alert('Erro ao carregar filmes. Tente novamente mais tarde.');
            } finally {
                loading.value = false;
            }
        };

        const excludeSession = async (id) => {
            try {
                loading.value = true;
                await Api.delete('/session/' + id);
                alert(`Sessão excluída com sucesso!`);
                sessions.value = sessions.value.filter(session => session.id !== id);
            } catch (error) {
                console.error('ERROR ->', error.message);
                alert(`Erro: ${error.response.data.message}`);
            } finally {
                loading.value = false;
            }
        };

        const goBack = () => {
            navigate('/');
        };

        const goToAddSession = () => {
            navigate('/sessoes/cadastrar');
        };

        const editSession = (id) => {
            navigate('/sessoes/editar', { state: { id } });
        };

        const confirmDeleteSession = (id) => {
            if (confirm('Tem certeza que deseja excluir essa sessão?')) {
                excludeSession(id);
            }
        };

        const formatDate = (date) => {
            return converterParaFormatoDdMmYyyy(date);
        };

        onMounted(() => {
            if (user && !loadedUser.value) {
                loadedUser.value = true;
                loadSessions();
            }
        });

        return {
            loading,
            sessions,
            goBack,
            goToAddSession,
            editSession,
            confirmDeleteSession,
            formatDate
        };
    }
};
</script>

<style>
/* Estilos opcionais */
</style>