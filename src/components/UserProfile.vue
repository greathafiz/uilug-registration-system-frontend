<template>
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="p-8 max-w-md w-full bg-white rounded-lg shadow-md">
      <h2
        class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
      >
        {{ user.full_name }}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ user.matric_number }}
      </p>
      <p class="mt-2 text-center text-sm text-gray-600">{{ user.email }}</p>
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ user.department }}
      </p>
      <p class="mt-2 text-center text-sm text-gray-600">{{ user.level }}</p>
      <div class="mt-6 flex justify-center">
        <button
          @click="logout"
          class="bg-red-500 text-white py-2 px-4 ml-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const user = ref({});
const router = useRouter();
const logout = () => {
  localStorage.removeItem("accessToken");
  router.push("/login");
};

onMounted(() => {
  (async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/auth/profile"
      );
      user.value = data;
    } catch (error) {
      console.error("An error occured while fetching user details.", error);
    }
  })();
});
</script>
