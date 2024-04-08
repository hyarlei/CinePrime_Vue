<template>
    <div v-if="loading">
        <Spinner animation="border" role="status">
            <span class="visually-hidden">Carregando...</span>
        </Spinner>
    </div>
    <div v-else>
        <h1 v-if="!movie">Filme não encontrado</h1>
        <div v-if="movie" style="display: flex; flex-direction: column; width: 100%;">
            <div>
                <button @click="handleBack" style="width: fit-content; margin-bottom: 20px;">Voltar</button>
                <h1>Dados de Filme</h1>
            </div>
            <ul>
                <li><span class="title">Id:</span> {{ id }}</li>
                <li><span class="title">Nome do filme:</span> {{ movie.name }}</li>
                <li><span class="title">Gênero:</span> {{ movie.genre }}</li>
                <li><span class="title">Duração:</span> {{ movie.duration }} minutos</li>
                <li><span class="title">Classificação:</span> {{ movie.classification }}</li>
                <li><span class="title">Siponse:</span> {{ movie.synopsis }}</li>
            </ul>
            <h2>Sessões Atuais do filme</h2>
            <div v-if="movie.sessions.length === 0">
                <p>Não há sessões cadastradas para este filme</p>
            </div>
            <div v-else>
                <div v-for="(session, index) in movie.sessions" :key="index">
                    <p><span class="title">Sessão {{ index + 1 }}:</span></p>
                    <ul>
                        <li><span class="title">Data:</span> {{ formatDateTime(session.dateTime) }}</li>
                        <li><span class="title">Id da Sala:</span> {{ session.idRoom }}</li>
                        <li><span class="title">Tipo de exibição:</span> {{ session.exibitionType }}</li>
                        <li><span class="title">Tipo de dublagem:</span> {{ session.dublingType }}</li>
                        <li><span class="title">Quantidade atual de ingressos vendidos:</span> {{
        session.atualTicketsQtd }}</li>
                        <li><span class="title">Quantidade máxima de ingressos:</span> {{ session.maxTicketsQtd }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useNavigate, useParams } from 'vue-router';
import Api from '@/services/Api';

export default {
    setup() {
        const navigate = useNavigate();
        const params = useParams();
        const { id } = params;

        const loading = ref(false);
        const movie = ref(null);

        const fetchMovie = async () => {
            try {
                loading.value = true;
                const { data } = await Api.get(`/movie/${id}`);
                movie.value = data;
            } catch (error) {
                console.log('ERROR ->', error.message);
                alert('Erro ao carregar filme. Tente novamente mais tarde');
            } finally {
                loading.value = false;
            }
        };

        const handleBack = () => {
            navigate('/filme/list');
        };

        const formatDateTime = (dateTime) => {
            const date = new Date(dateTime);
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
            return formattedDate;
        };

        onMounted(() => {
            fetchMovie();
        });

        return {
            loading,
            movie,
            handleBack,
            formatDateTime
        };
    }
};
</script>

<style scoped>
.title {
    font-weight: bold;
}
</style>