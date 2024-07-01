<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-3xl font-bold text-red-600 mb-6">Payment Error</h1>
      <p class="text-gray-700 mb-4">
        An error occurred during the payment process. Please try again.
      </p>
      <p class="text-gray-700 mb-8">
        If the problem persists, click the button below to contact Paystack
        support team for assistance.
      </p>
      <div class="flex justify-between">
        <router-link
          to="/dashboard"
          class="bg-uil-400 text-white py-2 px-4 rounded hover:bg-uil-500"
        >
          Retry Payment
        </router-link>
        <button
          @click="contactSupport"
          class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Contact Support
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const contactSupport = () => {
  // Logic to contact support
  // This redirects to a support page or open a mailto link
  console.log("Contacting support...");
  window.location.href = "https://paystack.com/contact/support";
};
</script>

<style scoped>
/* Additional styles if necessary */
</style>
