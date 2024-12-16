<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- Navbar -->
  <nav class="container mx-auto my-3">
    <div class="flex items-center space-x-3">
      <RouterLink to="/" class="text-2xl font-bold text-blue-800">HORESMI</RouterLink>
      <button id="menu-toggle" class="md:hidden p-2 text-gray-700 hover:text-blue-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <p class="text-xl text-gray-500 hidden md:flex">|</p>
      <ul id="menu" class="md:space-x-6 space-x-3 hidden md:flex items-center">
        <li class="relative group text-gray-700 hover:text-blue-700 transition">
          <span class="cursor-pointer">Finance</span>
          <ul
            class="absolute left-0 hidden bg-white shadow-lg rounded-lg group-hover:block transition-all duration-300">
            <li>
              <a href="#"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-t-lg transition">
                Budgets
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition">
                Reports
              </a>
            </li>
            <li>
              <a href="#"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-b-lg transition">
                Analytics
              </a>
            </li>
          </ul>
        </li>
        <li class="relative group text-gray-700 hover:text-blue-700 transition">
          <span class="cursor-pointer">Cash Management</span>
          <ul
            class="absolute left-0 hidden bg-white shadow-lg rounded-lg group-hover:block transition-all duration-300">
            <li>
              <a href="#"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-t-lg transition">
                Overview
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition">
                Forecast
              </a>
            </li>
            <li>
              <a href="#"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-b-lg transition">
                Reconciliation
              </a>
            </li>
          </ul>
        </li>
        <li class="relative group text-gray-700 hover:text-blue-700 transition">
          <span class="cursor-pointer">Sales</span>
          <ul
            class="absolute left-0 hidden bg-white shadow-lg rounded-lg group-hover:block transition-all duration-300">
            <li>
              <a href="#"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-t-lg transition">
                Orders
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition">
                Invoices
              </a>
            </li>
            <li>
              <a href="/"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-b-lg transition">
                Customers
              </a>
            </li>
          </ul>
        </li>
        <li class="relative group text-gray-700 hover:text-blue-700 transition">
          <span class="cursor-pointer">Purchasing</span>
          <ul
            class="absolute left-0 hidden bg-white shadow-lg rounded-lg group-hover:block transition-all duration-300">
            <li>
              <a href="#"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-t-lg transition">
                Suppliers
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition">
                Purchase Orders
              </a>
            </li>
            <li>
              <a href="#"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-b-lg transition">
                Inventory
              </a>
            </li>
          </ul>
        </li>
        <li class="relative group text-gray-700 hover:text-blue-700 transition">
          <span class="cursor-pointer">Shopify</span>
          <ul
            class="absolute left-0 hidden bg-white shadow-lg rounded-lg group-hover:block transition-all duration-300">
            <li>
              <a href="#"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-t-lg transition">
                Products
              </a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition">
                Orders
              </a>
            </li>
            <li>
              <a href="#"
                class="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-b-lg transition">
                Integrations
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <p class="text-xl text-gray-500 hidden md:flex">|</p>
      <a href="" class="text-blue-800 hover:text-blue-600 transition hidden md:flex">Все отчеты</a>
      <p class="text-lg text-gray-500 hidden md:flex">|</p>

    </div>
    <div class="hidden md:flex items-center space-x-6 mt-2">
      <RouterLink to="/customers" class="text-blue-800 hover:text-blue-600 transition">Customers </RouterLink>
      <RouterLink to="/vendors" class="text-blue-800 hover:text-blue-600 transition">Vendors</RouterLink>
      <RouterLink to="/items" class="text-blue-800 hover:text-blue-600 transition">Items</RouterLink>
      <a href="" class="text-blue-800 hover:text-blue-600 transition">Bank accounts</a>
      <a href="" class="text-blue-800 hover:text-blue-600 transition">Chart of Accounts</a>
      <a href="" class="text-blue-800 hover:text-blue-600 transition">Purchase orders</a>
      <a href="" class="text-blue-800 hover:text-blue-600 transition">Sales orders</a>
    </div>
    <!-- Для мобилок гамбургер кнопка -->
    <div id="mobile-menu" class="md:hidden flex flex-col space-y-4 mt-4">
      <a href="#" class="text-blue-800 hover:text-blue-600 transition">Finance</a>
      <a href="#" class="text-blue-800 hover:text-blue-600 transition">Cash Management</a>
      <a href="#" class="text-blue-800 hover:text-blue-600 transition">Sales</a>
      <a href="#" class="text-blue-800 hover:text-blue-600 transition">Purchasing</a>
      <a href="#" class="text-blue-800 hover:text-blue-600 transition">Shopify</a>
      <a href="#" class="text-blue-800 hover:text-blue-600 transition">Все отчеты</a>
    </div>
  </nav>
</template>

<script>
// Ожидаем, когда страница загрузится
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  // Добавляем обработчик клика для кнопки гамбургера
  menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
});
</script>