<template>
    <div>
        <button @click="goBack" style="width: fit-content; margin-right: 20px;">Voltar</button>
        <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column;">
            <label for="qtd_max">Quantidade máxima da Sala:</label>
            <input v-model="qtdMax" placeholder="Digite aqui a quantidade máxima da sala" type="number" id="qtd_max" />
            <input-text label="Tipo de exibição da Sala:" placeholder="Digite aqui o tipo de exibição da sala"
                :value="typeExhibitionAccepted" @input="handleTypeExhibitionChange" />
            <button type="submit" style="background-color: green; color: white;">Salvar</button>
        </form>
    </div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import { useNavigate, useLocation } from 'vue-router';
import Api from '@/services/Api';
import InputText from '@/components/InputText';
import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

export default {
    components: {
        InputText,
        Button
    },
    setup() {
        const navigate = useNavigate();
        const location = useLocation();
        const { user } = useAuth();

        const editing = location.value.state?.id;
        const loadedRoom = ref(false);
        const id = ref(null);
        const loading = ref(false);

        const roomData = reactive({
            qtdMax: '',
            typeExhibitionAccepted: ''
        });

        const fetchRoom = async () => {
            try {
                loading.value = true;
                const response = await Api.get(`/room/${id.value}`);
                roomData.qtdMax = response.data.qtd_max;
                roomData.typeExhibitionAccepted = response.data.typeExhibitionAccepted;
            } catch (error) {
                console.error('ERROR ->', error.message);
                alert('Erro ao carregar a sala. Tente novamente mais tarde');
            } finally {
                loading.value = false;
            }
        };

        watch(user, () => {
            if (editing && user.value && !loadedRoom.value) {
                fetchRoom();
                loadedRoom.value = true;
            }
        });

        const handleSubmit = async () => {
            try {
                loading.value = true;
                const requestData = {
                    qtd_max: Number(roomData.qtdMax),
                    typeExhibitionAccepted: roomData.typeExhibitionAccepted
                };

                let response;
                if (editing) {
                    response = await Api.put(`/room/${id.value}`, requestData);
                    alert('Sala atualizada com sucesso!');
                } else {
                    response = await Api.post('/room/', requestData);
                    alert('Sala cadastrada com sucesso!');
                }

                navigate('/sala/list');
            } catch (error) {
                console.error('ERROR ->', error.message);
                alert(`Erro: ${error.response.data.message}`);
            } finally {
                loading.value = false;
            }
        };

        const goBack = () => {
            navigate('/sala/list');
        };

        const handleTypeExhibitionChange = (value) => {
            roomData.typeExhibitionAccepted = value;
        };

        return {
            roomData,
            loading,
            handleSubmit,
            goBack,
            handleTypeExhibitionChange
        };
    }
};
</script>

<style>
/* Estilos opcionais */
</style>