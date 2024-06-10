<template>
  <div class="min-h-screen flex">
    <!-- Sidebar -->
    <nav class="w-64 bg-gray-800 text-white flex flex-col fixed h-full">
      <div class="px-4 py-4">
        <h2 class="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <div class="flex-1 overflow-y-auto">
        <router-link
          to="/admin/skills"
          class="block px-4 py-2 hover:bg-gray-700"
          >Skills</router-link
        >
        <router-link
          to="/admin/trainers"
          class="block px-4 py-2 hover:bg-gray-700"
          >Trainers</router-link
        >
        <router-link
          to="/admin/students"
          class="block px-4 py-2 hover:bg-gray-700"
          >Students</router-link
        >
        <router-link
          to="/admin/registrations"
          class="block px-4 py-2 hover:bg-gray-700"
          >Registrations</router-link
        >
        <!-- <router-link
          to="/admin/payments"
          class="block px-4 py-2 hover:bg-gray-700"
          >Payments</router-link
        > -->
      </div>
      <div class="px-4 py-4 mt-auto">
        <router-link to="/logout"
          ><button
            class="bg-red-600 w-full text-left text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button></router-link
        >
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex-1 p-8 ml-64">
      <router-view />
    </div>
  </div>
</template>
