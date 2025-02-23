<script setup>
import pc from "@/assets/img/pc.png";
</script>

<template>
  <section
    class="container mx-auto bg-gray-100 rounded-xl h-72 shadow-lg flex flex-row justify-between items-center"
  >
    <div class="px-4 py-5 mx-auto w-auto md:w-96 md:mx-0">
      <h3 class="font-semibold text-xl text-blue-800">Начало работы!</h3>
      <h1 class="font-semibold text-3xl text-gray-800">
        Знакомьтесь с <b class="font-bold text-blue-800">ERP System</b>
      </h1>
      <p class="my-5 text-gray-700">
        Вы готовы к изучению демонстрационной Horesmi. Ознакомьтесь с ней
        самостоятельно или воспользуйтесь кратким обзором.
      </p>
      <a
        href=""
        class="p-3 border rounded-lg text-white bg-blue-800 border-blue-700 hover:bg-blue-600 hover:shadow-lg transition"
      >
        Показать что-то
      </a>
    </div>
    <div class="hidden md:flex w-80 items-center justify-center">
      <img :src="pc" alt="Демонстрация ERP System" class="h-auto max-h-full" />
    </div>
  </section>
</template>
