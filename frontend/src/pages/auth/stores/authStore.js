import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated, getUser, clearAuthData, setAuthData } from '../utils/storage';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref(getUser());
  const isAuth = ref(isAuthenticated());

  const currentUser = computed(() => user.value);
  const authenticated = computed(() => isAuth.value);

  function login(userData) {
    user.value = userData;
    isAuth.value = true;
    setAuthData(userData);
  }

  function logout() {
    user.value = null;
    isAuth.value = false;
    clearAuthData();
    router.push('/login');
    window.location.reload();
  }

  return {
    user,
    isAuth,
    currentUser,
    authenticated,
    login,
    logout
  };
});