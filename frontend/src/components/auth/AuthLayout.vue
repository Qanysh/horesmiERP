<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow">
      <h1 class="text-2xl font-bold mb-6 text-center">
        <slot name="title"></slot>
      </h1>

      <slot></slot>

      <div v-if="$slots.footer" class="mt-4 text-center text-sm">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
