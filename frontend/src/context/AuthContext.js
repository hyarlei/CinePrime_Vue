// No arquivo src/contexts/AuthContext.js
import { createContext, ref, watchEffect } from 'vue';
import Api from '@src/services/Api';

// Crie um novo contexto de autenticação
const AuthContext = createContext({});

export function useAuth() {
  return AuthContext;
}

export const AuthContextProvider = {
  // Função que cria o provedor de contexto de autenticação
  setup(props, { slots }) {
    // Crie um estado reativo para o usuário
    const user = ref(null);

    // Efeito colateral para verificar se há usuário armazenado no localStorage
    watchEffect(() => {
      if (!user.value) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          user.value = storedUser;
          Api.defaults.headers['Authorization'] = `Bearer ${storedUser.token}`;
        }
      }
    });

    // Função para fazer login
    async function signIn(email, password) {
      try {
        const { data } = await Api.post('/auth', {
          email: email,
          password: password,
        });

        user.value = data.user;
        Api.defaults.headers['Authorization'] = `Bearer ${data.user.token}`;
        localStorage.setItem('user', JSON.stringify(data.user));
      } catch (error) {
        throw error;
      }
    }

    // Função para fazer logout
    function signOut() {
      localStorage.removeItem('user');
      user.value = null;
      Api.defaults.headers['Authorization'] = undefined;
    }

    return () => <AuthContext.Provider value={{ user, signIn, signOut }}>{slots.default()}</AuthContext.Provider>;
  },
};
