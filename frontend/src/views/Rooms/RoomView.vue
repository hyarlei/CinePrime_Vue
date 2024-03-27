<template>
    <div>
        <button @click="goBack" style="width: fit-content; margin-bottom: 20px; align-self: start;">Voltar</button>
        <div>
            <h1 v-if="!room">Sala não encontrada</h1>
            <h1 v-else>Dados da Sala</h1>
        </div>
        <ul v-if="room">
            <li><span class="title">Id:</span> {{ id }}</li>
            <li><span class="title">Quantidade máxima de pessoas:</span> {{ room.qtd_max }}</li>
            <li><span class="title">Tipo de exibição suportada:</span> {{ room.typeExhibitionAccepted }}</li>
        </ul>
        <h2 v-if="room">Sessões Atuais da sala</h2>
        <div v-if="room && room.sessions.length > 0">
            <div v-for="(session, index) in room.sessions" :key="index">
                <p><span class="title">Sessão {{ index + 1 }}:</span></p>
                <ul>
                    <li>
                        <span class="title">Data:</span>
                        {{ formatDate(session.dateTime) }}
                    </li>
                    <li><span class="title">Id do Filme:</span> {{ session.idMovie }}</li>
                    <li><span class="title">Tipo de exibição:</span> {{ session.exibitionType }}</li>
                    <li><span class="title">Tipo de dublagem:</span> {{ session.dublingType }}</li>
                    <li><span class="title">Quantidade atual de ingressos vendidos:</span> {{ session.atualTicketsQtd }}
                    </li>
                    <li><span class="title">Quantidade máxima de ingressos:</span> {{ session.maxTicketsQtd }}</li>
                </ul>
            </div>
        </div>
        <p v-else>Não há sessões cadastradas para esta sala</p>
        <spinner v-if="loading" animation="border" role="status">
            <span class="visually-hidden">Carregando...</span>
        </spinner>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useNavigate, useParams } from 'vue-router';
import Api from '@/services/Api';
import { useAuth } from '@/hooks/useAuth';

export default {
    setup() {
        const navigate = useNavigate();
        const { user } = useAuth();
        const params = useParams();
        const { id } = params;

        const loadedRoom = ref(false);
        const loading = ref(false);
        const room = ref(null);

        const fetchRoom = async () => {
            try {
                loading.value = true;
                const { data } = await Api.get(`/room/${id}`);
                room.value = data;
            } catch (error) {
                console.error('ERROR ->', error.message);
                alert('Erro ao carregar a sala. Tente novamente mais tarde');
            } finally {
                loading.value = false;
            }
        };

        const formatDate = (dateTime) => {
            const date = new Date(dateTime);
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
        };

        const goBack = () => {
            navigate('/sala/list');
        };

        onMounted(() => {
            if (user.value && !loadedRoom.value) {
                fetchRoom();
                loadedRoom.value = true;
            }
        });

        return {
            id,
            room,
            loading,
            goBack,
            formatDate
        };
    }
};
</script>

<style>
.title {
    font-weight: bold;
}
</style>