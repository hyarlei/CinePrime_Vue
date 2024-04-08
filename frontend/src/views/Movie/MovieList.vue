<template>
    <div>
        <button @click="handleBack" style="width: fit-content; margin-right: 20px; align-self: start;">Voltar</button>
        <button @click="handleAddMovie" class="mb-3"
            style="align-self: flex-end; border-color: green; color: green;">Cadastrar novo filme</button>
        <div v-if="movies && movies.length > 0">
            <table class="table" style="width: 100%;">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Gênero</th>
                        <th>Duração</th>
                        <th>Classificação</th>
                        <th>Sinopse</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="movie in movies" :key="movie.id">
                        <td>{{ movie.id }}</td>
                        <td>{{ movie.name }}</td>
                        <td>{{ movie.genre }}</td>
                        <td>{{ convertMinutesToHours(movie.duration) }}</td>
                        <td>{{ movie.classification }}</td>
                        <td>{{ movie.synopsis }}</td>
                        <td>
                            <button @click="handleEditMovie(movie.id)" class="btn"
                                style="background-color: #4682B4; color: #f0f0f0; font-weight: bold;">Editar</button>
                            <button @click="handleDeleteMovie(movie.id)" class="btn"
                                style="background-color: #FF433F; color: #f0f0f0; font-weight: bold; margin-left: 5px;">Excluir</button>
                            <button @click="handleViewMovie(movie.id)" class="btn"
                                style="background-color: #2E8B57; color: #f0f0f0; font-weight: bold; margin-left: 5px;">Visualizar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <button @click="handleAddMovie" class="mb-3"
                style="align-self: flex-end; border-color: green; color: green;">Cadastrar novo filme</button>
            <table class="table" style="width: 100%;">
                <thead>
                    <tr>
                        <th>Ainda sem filmes</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div v-if="loading" style="margin-top: 20px;">
            <spinner></spinner>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useNavigate } from 'vue-router';
import Api from '@/services/Api';
import Button from '@/components/Button';

export default {
    components: {
        Button
    },
    setup() {
        const navigate = useNavigate();
        const loadedUser = ref(false);
        const loading = ref(false);
        const movies = ref([]);

        const loadMovies = async () => {
            try {
                loading.value = true;
                const { data } = await Api.get('/movie');
                movies.value = data;
            } catch (error) {
                console.log('ERROR ->', error.message);
                alert('Erro ao carregar filmes. Tente novamente mais tarde.');
            } finally {
                loading.value = false;
            }
        };

        const handleDeleteMovie = async (id) => {
            try {
                loading.value = true;
                await Api.delete(`/movie/${id}`);
                alert('Filme excluído com sucesso!');
                movies.value = movies.value.filter((movie) => movie.id !== id);
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

        const handleAddMovie = () => {
            navigate('/filme/cadastrar');
        };

        const handleEditMovie = (id) => {
            navigate('/filme/editar', { state: { id } });
        };

        const handleViewMovie = (id) => {
            navigate(`/filme/${id}`);
        };

        const convertMinutesToHours = (minutes) => {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return remainingMinutes > 0 ? `${hours}h${remainingMinutes}m` : `${hours}h`;
        };

        return {
            loading,
            movies,
            handleDeleteMovie,
            handleBack,
            handleAddMovie,
            handleEditMovie,
            handleViewMovie,
            convertMinutesToHours
        };
    }
};
</script>

<style scoped>
/* Estilos opcionais podem ser adicionados aqui */
</style>