<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 2000);
});
</script>

<template>
    <section class="container mx-auto my-10">
        <h1 class="text-center font-bold text-2xl lg:text-start">Activities</h1>
        <hr class="my-4" />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-items-center lg:justify-items-start">
            <!-- Block 1 -->
            <div>
                <p class="mb-3 ml-1 lg:ml-1">Ongoing Sales</p>
                <template v-if="loading">
                    <div class="flex gap-4 md:gap-10">
                        <div v-for="i in 3" :key="'loading-' + i"
                            class="relative bg-gray-200 rounded py-6 shadow-xl ring-1 ring-gray-300/5 mx-auto max-w-lg animate-pulse px-4">
                            <div class="space-y-3">
                                <div class="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
                                <div class="h-10 bg-gray-300 rounded w-auto mx-auto"></div>
                                <div class="h-4 bg-gray-300 rounded w-auto mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="flex gap-4 md:gap-10">
                        <div v-for="i in 3" :key="'content-' + i">
                            <div
                                class="relative bg-white py-6 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-lg rounded-lg px-4">
                                <div class="mx-auto max-w-md">
                                    <p>Sales this month</p>
                                    <div class="divide-y divide-gray-300/50">
                                        <div class="space-y-6 py-2 text-base leading-7 text-gray-600">
                                            <h3 class="font-bold text-3xl">8 100$</h3>
                                        </div>
                                        <div class="pt-5 text-base font-semibold leading-7">
                                            <p class="text-gray-900">Show more</p>
                                            <p>
                                                <a href="/" class="text-sky-500 hover:text-sky-600">Continue &rarr;</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- Block 2 -->
            <div>
                <p class="mb-3 ml-1 lg:ml-1">Ongoing Sales</p>
                <template v-if="loading">
                    <div class="flex gap-4 md:gap-10">
                        <div v-for="i in 3" :key="'loading-' + i"
                            class="relative bg-gray-200 rounded py-6 shadow-xl ring-1 ring-gray-300/5 mx-auto max-w-lg animate-pulse px-4">
                            <div class="space-y-3">
                                <div class="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
                                <div class="h-10 bg-gray-300 rounded w-auto mx-auto"></div>
                                <div class="h-4 bg-gray-300 rounded w-auto mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="flex gap-4 md:gap-10">
                        <div v-for="i in 3" :key="'content-' + i">
                            <div
                                class="relative bg-white py-6 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-lg rounded-lg px-4">
                                <div class="mx-auto max-w-md">
                                    <p>Sales this month</p>
                                    <div class="divide-y divide-gray-300/50">
                                        <div class="space-y-6 py-2 text-base leading-7 text-gray-600">
                                            <h3 class="font-bold text-3xl">8 100$</h3>
                                        </div>
                                        <div class="pt-5 text-base font-semibold leading-7">
                                            <p class="text-gray-900">Show more</p>
                                            <p>
                                                <a href="/" class="text-sky-500 hover:text-sky-600">Continue &rarr;</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- Block 3 -->
            <div>
                <p class="mb-3 ml-1 lg:ml-1">Ongoing Sales</p>
                <template v-if="loading">
                    <div class="flex gap-4 md:gap-10">
                        <div v-for="i in 3" :key="'loading-' + i"
                            class="relative bg-gray-200 rounded py-6 shadow-xl ring-1 ring-gray-300/5 mx-auto max-w-lg animate-pulse px-4">
                            <div class="space-y-3">
                                <div class="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
                                <div class="h-10 bg-gray-300 rounded w-auto mx-auto"></div>
                                <div class="h-4 bg-gray-300 rounded w-auto mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="flex gap-4 md:gap-10">
                        <div v-for="i in 3" :key="'content-' + i">
                            <div
                                class="relative bg-white py-6 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-lg rounded-lg px-4">
                                <div class="mx-auto max-w-md">
                                    <p>Sales this month</p>
                                    <div class="divide-y divide-gray-300/50">
                                        <div class="space-y-6 py-2 text-base leading-7 text-gray-600">
                                            <h3 class="font-bold text-3xl">8 100$</h3>
                                        </div>
                                        <div class="pt-5 text-base font-semibold leading-7">
                                            <p class="text-gray-900">Show more</p>
                                            <p>
                                                <a href="/" class="text-sky-500 hover:text-sky-600">Continue &rarr;</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- Block 4 -->
            <div>
                <p class="mb-3 ml-1 lg:ml-1">Ongoing Sales</p>
                <template v-if="loading">
                    <div class="flex gap-4 md:gap-10">
                        <div v-for="i in 3" :key="'loading-' + i"
                            class="relative bg-gray-200 rounded py-6 shadow-xl ring-1 ring-gray-300/5 mx-auto max-w-lg animate-pulse px-4">
                            <div class="space-y-3">
                                <div class="h-4 bg-gray-300 rounded w-24 mx-auto"></div>
                                <div class="h-10 bg-gray-300 rounded w-auto mx-auto"></div>
                                <div class="h-4 bg-gray-300 rounded w-auto mx-auto"></div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="flex gap-4 md:gap-10">
                        <div v-for="i in 3" :key="'content-' + i">
                            <div
                                class="relative bg-white py-6 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-lg rounded-lg px-4">
                                <div class="mx-auto max-w-md">
                                    <p>Sales this month</p>
                                    <div class="divide-y divide-gray-300/50">
                                        <div class="space-y-6 py-2 text-base leading-7 text-gray-600">
                                            <h3 class="font-bold text-3xl">8 100$</h3>
                                        </div>
                                        <div class="pt-5 text-base font-semibold leading-7">
                                            <p class="text-gray-900">Show more</p>
                                            <p>
                                                <a href="/" class="text-sky-500 hover:text-sky-600">Continue &rarr;</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>
