<template>
    <div>
        <button @click="goBack" style="width: fit-content; margin-bottom: 20px; align-self: start;">Voltar</button>
        <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column;">
            <label for="start">Data da sessão:</label>
            <input type="date" id="start" v-model="dateTime" style="margin-top: 10px;">

            <select v-model="idRoom" style="margin-top: 10px;">
                <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.id }}</option>
            </select>

            <select v-model="idMovie" style="margin-top: 10px;">
                <option v-for="movie in movies" :key="movie.id" :value="movie.id">{{ movie.name }}</option>
            </select>

            <input type="text" v-model="exibitionType" placeholder="Tipo de exibição" style="margin-top: 10px;">
            <input type="number" v-model="maxTicketsQtd" placeholder="Capacidade da sessão" style="margin-top: 10px;">
            <input type="text" v-model="dublingType" placeholder="Tipo de dublagem" style="margin-top: 10px;">

            <input v-if="editing" disabled type="number" v-model="atualTicketsQtd" placeholder="Ingressos vendidos"
                style="margin-top: 10px;">

            <button type="submit" style="margin-top: 20px;">Salvar</button>
        </form>
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

export default {
    setup() {
        const navigate = useNavigate();
        const location = useLocation();
        const { user } = useAuth();

        const editing = location.state?.id;
        const loadedSession = ref(false);
        const firstRender = ref(false);
        const loading = ref(false);
        const { id } = location.state || {};

        const dateTime = ref("");
        const idRoom = ref("");
        const idMovie = ref("");
        const exibitionType = ref("");
        const dublingType = ref("");
        const maxTicketsQtd = ref("");
        const atualTicketsQtd = ref(0);

        const rooms = ref([]);
        const movies = ref([]);

        const fetchSession = async () => {
            try {
                loading.value = true;
                const { data } = await Api.get('/session/' + id);
                dateTime.value = data.dateTime;
                idRoom.value = data.room;
                idMovie.value = data.movie;
                exibitionType.value = data.exibitionType;
                dublingType.value = data.dublingType;
                maxTicketsQtd.value = data.maxTicketsQtd;
            } catch (error) {
                console.error('ERROR ->', error.message);
                alert('Erro ao carregar filme. Tente novamente mais tarde');
            } finally {
                loading.value = false;
            }
        };

        const loadRoomsAndMovies = async () => {
            try {
                let roomsData = await Api.get('/room');
                let moviesData = await Api.get('/movie');
                rooms.value = roomsData.data;
                movies.value = moviesData.data;
            } catch (error) {
                console.log('ERROR ->', error.message);
                alert('Erro ao corregar salas e filmes disponíveis. Tente novamente mais tarde.');
            }
        };

        const handleSubmit = async () => {
            try {
                loading.value = true;
                const payload = {
                    dateTime: dateTime.value ? new Date(dateTime.value).toISOString() : undefined,
                    idRoom: typeof idRoom.value === 'object' ? Number(idRoom.value.id) : Number(idRoom.value),
                    idMovie: typeof idMovie.value === 'object' ? Number(idMovie.value.id) : Number(idMovie.value),
                    exibitionType: exibitionType.value,
                    dublingType: dublingType.value,
                    maxTicketsQtd: Number(maxTicketsQtd.value),
                    atualTicketsQtd: Number(atualTicketsQtd.value),
                };
                if (editing) {
                    await Api.put(`/session/${id}`, payload);
                    alert(`Sessão atualizada com sucesso!`);
                } else {
                    await Api.post('/session/', payload);
                    alert(`Sessão cadastrada com sucesso!`);
                }
                navigate("/sessoes/list");
            } catch (error) {
                console.log("ERROR ->", error.message);
                alert(`Erro: ${error.response.data.message}`);
            } finally {
                loading.value = false;
            }
        };

        const goBack = () => {
            navigate('/sessoes/list');
        };

        onMounted(() => {
            if (editing && user && !loadedSession.value) {
                fetchSession();
                loadedSession.value = true;
            }
            if (user && !firstRender.value) {
                loadRoomsAndMovies();
                firstRender.value = true;
            }
        });

        return {
            dateTime,
            idRoom,
            idMovie,
            exibitionType,
            dublingType,
            maxTicketsQtd,
            atualTicketsQtd,
            loading,
            goBack,
            handleSubmit,
            rooms,
            movies
        };
    }
};
</script>

<style>
/* Estilos opcionais */
</style>