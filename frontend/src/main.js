import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
// import store from './store';

const app = createApp(App);

app.use(router).mount('#app');
// app.use(store);
// Inicializar a store com o token salvo, se houver
// store.dispatch('initializeStore');
