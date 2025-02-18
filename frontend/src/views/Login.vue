<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { registerUser, loginUser } from "@/utils/authService";
import { useAuthStore } from "@/stores/useAuthStore";

const isLoginActive = ref(true);
const username = ref("");
const email = ref("");
const password = ref("");
const re_password = ref("");
const errorMessages = ref("");
const router = useRouter();

const authStore = useAuthStore();

const toggleForm = (isLogin) => {
  isLoginActive.value = isLogin;
};

const register = async () => {
  errorMessages.value = "";

  const { errorMessages: registrationError, success } = await registerUser(
    username.value,
    email.value,
    password.value,
    re_password.value
  );

  if (registrationError) {
    errorMessages.value = registrationError;
  } else if (success) {
    alert("Signup successful!");
    toggleForm(true);
  }
};

const login = async () => {
  errorMessages.value = "";

  const {
    errorMessages: loginError,
    success,
    token,
  } = await loginUser(email.value, password.value);

  if (loginError) {
    errorMessages.value = loginError;
  } else if (success) {
    alert("Login successful!");
    authStore.setToken(token);
    router.push("/");
  }
};
</script>

<template>
  <section class="flex justify-center items-center h-screen bg-blue-50">
    <div
      v-if="isLoginActive"
      class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
    >
      <header class="text-center text-xl font-semibold text-gray-800 mb-6">
        Login
      </header>
      <form @submit.prevent="login">
        <input
          v-model="email"
          type="email"
          placeholder="Email address"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          class="w-full p-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p class="text-center mt-4">
        Don't have an account?
        <span
          @click="toggleForm(false)"
          class="text-blue-500 cursor-pointer hover:underline"
        >
          Sign up
        </span>
      </p>
      <p v-if="errorMessages" class="text-red-500 text-center mt-4">
        {{ errorMessages }}
      </p>
    </div>

    <div v-else class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <header class="text-center text-xl font-semibold text-gray-800 mb-6">
        Sign Up
      </header>
      <form @submit.prevent="register">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email address"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="re_password"
          type="password"
          placeholder="Repeat Password"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          class="w-full p-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      <p v-if="errorMessages" class="text-red-500 text-center mt-4">
        {{ errorMessages }}
      </p>
      <p class="text-center mt-4">
        Already have an account?
        <span
          @click="toggleForm(true)"
          class="text-blue-500 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  </section>
</template>
