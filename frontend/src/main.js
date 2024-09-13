import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import store from './store';  // Importe o Vuex store

const app = createApp(App);

// Certifique-se de usar o Vuex e o router
app.use(store);
app.use(router);

store.dispatch('initializeStore');

app.mount('#app');
