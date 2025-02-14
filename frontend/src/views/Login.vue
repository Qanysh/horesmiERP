<template>
  <section class="flex justify-center items-center h-screen bg-blue-50">
    <div
      v-if="isLoginActive"
      class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
    >
      <!-- Login Form -->
      <header class="text-center text-xl font-semibold text-gray-800 mb-6">
        Login
      </header>
      <form @submit.prevent="handleLogin">
        <input
          v-model="loginForm.email"
          type="email"
          placeholder="Email address"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="loginForm.password"
          type="password"
          placeholder="Password"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <a
          href="#"
          class="text-blue-600 text-sm hover:underline mb-4 inline-block"
          @click.prevent="forgotPassword"
        >
          Forgot password?
        </a>
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
    </div>

    <!-- SignUp Form -->
    <div v-else class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <header class="text-center text-xl font-semibold text-gray-800 mb-6">
        Sign Up
      </header>
      <form @submit.prevent="handleSignup">
        <input
          v-model="signupForm.fullName"
          type="text"
          placeholder="Full name"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="signupForm.email"
          type="email"
          placeholder="Email address"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <input
          v-model="signupForm.password"
          type="password"
          placeholder="Password"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <div class="flex items-center gap-2">
          <input
            v-model="signupForm.terms"
            type="checkbox"
            id="signupCheck"
            class="form-checkbox"
          />
          <label for="signupCheck">I accept all terms & conditions</label>
        </div>
        <button
          type="submit"
          class="w-full p-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
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

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// State for the form
const isLoginActive = ref(true);
const signupForm = ref({
  fullName: "",
  email: "",
  password: "",
  terms: false,
});
const loginForm = ref({
  email: "",
  password: "",
});

const toggleForm = (isLogin) => {
  isLoginActive.value = isLogin;
};

const handleSignup = () => {
  if (!signupForm.value.terms) {
    alert("Please accept terms and conditions.");
    return;
  }
  console.log("Signup Data:", signupForm.value);
  alert("Signup Successful!");
  router.push({ name: "home" });
};

const handleLogin = () => {
  console.log("Login Data:", loginForm.value);
  router.push({ name: "home" });
};

const forgotPassword = () => {
  router.push({ name: "reset-password" });
};
</script>
