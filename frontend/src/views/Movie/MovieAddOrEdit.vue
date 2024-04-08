<template>
    <div>
        <button @click="handleBack" style="width: fit-content; margin-right: 20px; align-self: start;">Voltar</button>
        <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column;">
            <InputText label="Nome:" placeholder="Digite aqui o nome do filme" v-model="name" />
            <label for="genre">Escolha o gênero do filme:</label>
            <select name="genre" id="genre" v-model="genre">
                <option value="" disabled hidden>Escolha uma opção</option>
                <option value="Drama">Drama</option>
                <option value="Comédia">Comédia</option>
                <option value="Ação">Ação</option>
                <option value="Aventura">Aventura</option>
                <option value="Terror">Terror</option>
                <option value="Suspense">Suspense</option>
                <option value="Romance">Romance</option>
                <option value="Ficção Científica">Ficção Científica</option>
                <option value="Fantasia">Fantasia</option>
                <option value="Documentário">Documentário</option>
                <option value="Animação">Animação</option>
            </select>
            <label for="duration">Duração do filme:</label>
            <input type="number" placeholder="Digite aqui a duração do filme" v-model.number="duration" />
            <InputText label="Classificação:" placeholder="Digite aqui a classificação do filme"
                v-model="classification" />
            <InputText label="Sinopse:" placeholder="Digite aqui a sinopse do filme" v-model="synopsis" />
            <Button variant="success" text="Salvar" type="submit" />
        </form>
        <template v-if="loading">
            <Spinner animation="border" role="status">
                <span class="visually-hidden">Carregando...</span>
            </Spinner>
        </template>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useNavigate, useLocation } from 'vue-router';
import Api from '@/services/Api';
import InputText from '@/components/InputText';
import Button from '@/components/Button';

export default {
    components: {
        InputText,
        Button
    },
    setup() {
        const navigate = useNavigate();
        const location = useLocation();
        const { user } = useAuth();

        const editing = location.state?.id;
        const loadedMovie = ref(false);
        const id = ref(editing ? location.state.id : null);
        const loading = ref(false);
        const name = ref("");
        const genre = ref("");
        const duration = ref("");
        const classification = ref("");
        const synopsis = ref("");

        const fetchMovie = async () => {
            try {
                loading.value = true;
                const { data } = await Api.get(`/movie/${id.value}`);
                name.value = data.name;
                genre.value = data.genre;
                duration.value = data.duration;
                classification.value = data.classification;
                synopsis.value = data.synopsis;
            } catch (error) {
                console.log('ERROR ->', error.message);
                alert('Erro ao carregar filme. Tente novamente mais tarde');
            } finally {
                loading.value = false;
            }
        };

        const handleSubmit = async () => {
            try {
                loading.value = true;
                const payload = {
                    name: name.value,
                    genre: genre.value,
                    duration: Number(duration.value),
                    classification: classification.value,
                    synopsis: synopsis.value
                };
                const { data } = editing ? await Api.put(`/movie/${id.value}`, payload) : await Api.post('/movie/', payload);
                const action = editing ? 'atualizado' : 'cadastrado';
                alert(`Filme ${data.name} ${action} com sucesso!`);
                navigate("/filme/list");
            } catch (error) {
                console.log("ERROR ->", error.message);
                alert(`Erro: ${error.response.data.message}`);
            } finally {
                loading.value = false;
            }
        };

        const handleBack = () => {
            navigate('/filme/list');
        };

        if (editing && user && !loadedMovie.value) {
            fetchMovie();
            loadedMovie.value = true;
        }

        return {
            loading,
            name,
            genre,
            duration,
            classification,
            synopsis,
            handleSubmit,
            handleBack
        };
    }
};
</script>

<style>
/* Estilos opcionais podem ser adicionados aqui */
</style>