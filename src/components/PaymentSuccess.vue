<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <div class="max-w-lg p-8 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-semibold">Payment Successful</h1>
      <p class="my-4 text-gray-700">
        Your payment was successful! Here are the details:
      </p>

      <div v-if="skill">
        <h2 class="text-2xl font-bold mb-2">{{ skill.skill_name }}</h2>
        <p class="text-gray-700 mb-4">{{ skill.description }}</p>

        <h3 class="text-xl font-bold mb-2">Trainer Details</h3>
        <p class="text-gray-700">
          <strong>Name: </strong>{{ skill.trainer.trainer_name }}
        </p>
        <p class="text-gray-700">
          <strong>Email:</strong> {{ skill.trainer.email }}
        </p>
        <p class="text-gray-700">
          <strong>Phone:</strong> {{ skill.trainer.phone_number }}
        </p>

        <a
          :href="skill.trainer.whatsappLink"
          class="bg-uil-400 text-white py-2 px-4 rounded mt-4 block text-center hover:bg-uil-500 cursor-pointer"
        >
          Join WhatsApp Group
        </a>
        <a
          href="/dashboard"
          class="py-2 px-4 rounded mt-4 block text-center hover:bg-gray-200 cursor-pointer"
        >
          Go Back to Dashboard
        </a>
      </div>
      <div v-else>
        <p class="text-gray-700 mb-4">Loading details...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const paymentReference = ref("");
const route = useRoute();
const skill = ref(null);

const loadDetails = async () => {
  const { skillId, reference } = route.query;
  paymentReference.value = reference || "";
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL_PROD}/skills/${skillId}`
    );
    skill.value = data;
  } catch (error) {
    console.error("Error fetching details", error);
  }
};

onMounted(loadDetails);
</script>
