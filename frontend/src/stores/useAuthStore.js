// src/stores/auth.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const setToken = (newToken) => {
    token.value = newToken;
  };

  return {
    token,
    setToken,
  };
});
