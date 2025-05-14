<template>
  <section class="flex justify-center items-center h-screen bg-blue-50">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <header class="text-center text-xl font-semibold text-gray-800 mb-6">
        Reset Password
      </header>
      <form @submit.prevent="handleReset">
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="w-full p-4 mb-4 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          class="w-full p-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");

const handleReset = () => {
  console.log("Password reset requested for:", email.value);
  alert("Password reset link has been sent!");
  router.push({ name: "login" });
};
</script>
