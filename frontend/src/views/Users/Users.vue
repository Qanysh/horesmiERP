<script setup>
import { ref } from 'vue';
import UsersTableComponent from '@/components/tables/User/UsersTableComponent.vue';
</script>

<template>
    <div class="col-1 w-full md:flex relative overflow-x-auto container mx-auto space-x-10 ">
        <table class="w-full md:w-2/3 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">UserName</th>
                    <th scope="col" class="px-6 py-3">Full Name</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Authentication Email</th>
                </tr>
            </thead>
            <tbody>
               
                
            </tbody>
        </table>
        <div class="space-y-5 w-1/3">
            <h3>Permission sets</h3>
            <table class="w-full  text-left text-sm text-gray-500 rtl:text-right ">
                <thead class=" text-xs uppercase text-gray-700 dark:bg-gray-700 ">
                    <tr>
                        <th scope="col" class="px-6 py-3">Permission set</th>
                        <th scope="col" class="px-6 py-3">Company</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 ">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Some Rule
                        </th>
                        <td class="px-6 py-4"> Some Company
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>