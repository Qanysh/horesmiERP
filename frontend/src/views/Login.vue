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

<script>
export default {
  data() {
    return {
      isLoginActive: true,
      signupForm: {
        fullName: "",
        email: "",
        password: "",
        terms: false,
      },
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    toggleForm(isLogin) {
      this.isLoginActive = isLogin;
    },
    handleSignup() {
      if (!this.signupForm.terms) {
        alert("Please accept terms and conditions.");
        return;
      }
      console.log("Signup Data:", this.signupForm);
      alert("Signup Successful!");
      // Redirect to home after signup or you can route to another page
      this.$router.push({ name: "home" });
    },
    handleLogin() {
      console.log("Login Data:", this.loginForm);
      this.$router.push({ name: "home" }); // Redirect to home after login
    },
    forgotPassword() {
      // Redirect to reset password page or handle password reset logic
      this.$router.push({ name: "reset-password" });
    },
  },
};
</script>
