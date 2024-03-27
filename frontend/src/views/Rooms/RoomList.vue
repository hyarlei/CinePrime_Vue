<template>
    <div>
        <button @click="goBack" style="width: fit-content; margin-right: 20px;">Voltar</button>
        <button @click="navigateToAddRoom"
            style="align-self: flex-end; border-color: green; background-color: green; font-weight: bold;">Cadastrar
            nova sala</button>
        <table>
            <thead>
                <tr>
                    <th>Sala</th>
                    <th>Quantidade máxima de pessoas</th>
                    <th>Tipo de exibição suportada</th>
                    <th style="max-width: 120px;">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(room, index) in rooms" :key="index">
                    <td>{{ room.id }}</td>
                    <td>{{ room.qtd_max }}</td>
                    <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{
            room.typeExhibitionAccepted }}</td>
                    <td style="height: 150px; display: flex; flex-direction: column; justify-content: space-evenly;">
                        <button @click="editRoom(room.id)"
                            style="background-color: #4682B4; color: #f0f0f0; font-weight: bold;">Editar</button>
                        <button @click="deleteRoom(room.id)"
                            style="background-color: #FF433F; color: #f0f0f0; font-weight: bold;">Excluir</button>
                        <button @click="viewRoom(room.id)"
                            style="background-color: #2E8B57; color: #f0f0f0; font-weight: bold;">Visualizar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useNavigate } from 'vue-router';
import Api from '@/services/Api';
import { useAuth } from '@/hooks/useAuth';

export default {
    setup() {
        const navigate = useNavigate();
        const { user } = useAuth();
        const rooms = ref([]);
        const loading = ref(false);

        const loadRooms = async () => {
            try {
                loading.value = true;
                const { data } = await Api.get('/room');
                rooms.value = data;
            } catch (error) {
                console.error('ERROR ->', error.message);
                alert('Erro ao carregar as salas. Tente novamente mais tarde.');
            } finally {
                loading.value = false;
            }
        };

        const deleteRoom = async (id) => {
            try {
                loading.value = true;
                await Api.delete(`/room/${id}`);
                rooms.value = rooms.value.filter((room) => room.id !== id);
                alert('Sala excluída com sucesso!');
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

        const navigateToAddRoom = () => {
            navigate('/sala/cadastrar');
        };

        const editRoom = (id) => {
            navigate(`/sala/editar/${id}`);
        };

        const viewRoom = (id) => {
            navigate(`/sala/${id}`);
        };

        onMounted(() => {
            if (user.value) {
                loadRooms();
            }
        });

        return {
            rooms,
            loading,
            goBack,
            navigateToAddRoom,
            editRoom,
            deleteRoom,
            viewRoom
        };
    }
};
</script>

<style>
/* Estilos opcionais */
</style>