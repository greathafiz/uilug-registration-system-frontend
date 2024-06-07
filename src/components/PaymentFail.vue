<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <div class="max-w-lg p-8 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-semibold text-red-500">Payment Failed</h1>
      <p class="my-4">
        Unfortunately, your payment failed. Reference: {{ reference }}
      </p>
      <router-link
        to="/dashboard"
        class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >Go back to Dashboard</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const reference = ref("");
const route = useRoute();

onMounted(() => {
  reference.value = route.query.reference || "";
});
</script>
