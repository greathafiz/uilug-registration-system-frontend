<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click.self="closeModal"
  >
    <div class="p-6 bg-white rounded-lg shadow-lg max-w-2xl w-full relative">
      <button @click="closeModal" class="text-gray-700 absolute top-2 right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          view-box="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-4">{{ skill.skill_name }}</h2>
      <p class="mb-4">{{ skill.description }}</p>
      <p class="mb-4">Available Slots: {{ skill.slots }}</p>
      <p class="mb-4">
        Trainer: {{ skill.trainer.trainer_name }}. Contact:
        {{ skill.trainer.phone_number }}
      </p>

      <button
        @click="registerSkill(skill.skill_id)"
        class="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  skill: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close", "register"]);

const closeModal = () => {
  emit("close");
};
const registerSkill = (skillId) => {
  emit("register", skillId);
};
</script>
