<template>
  <div class="relative">
    <input
      :type="isPasswordVisible ? 'text' : 'password'"
      class="border w-full px-4 py-2"
      placeholder="Password"
      v-model="password"
      @input="handlePassword"
    />
    <button
      v-if="password.length > 0"
      class="absolute inset-y-0 right-0 flex items-center px-4"
      @click="toggleVisibility"
      type="button"
    >
      <i v-if="isPasswordVisible" class="fa-regular fa-eye"></i>
      <i v-else class="fa-regular fa-eye-slash"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["passwordEntered"]);

const password = ref("");
const isPasswordVisible = ref(false);

const toggleVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const handlePassword = () => {
  emit("passwordEntered", password.value);
};

const clearPassword = () => {
  password.value = "";
};

defineExpose({ clearPassword });
</script>
