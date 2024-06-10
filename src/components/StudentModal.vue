<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
      >
        <i class="fa fa-times"></i>
      </button>
      <h2 class="text-2xl mb-4">Student Details</h2>
      <div class="mb-4">
        <strong>Student ID:</strong> {{ student.student_id }}
      </div>
      <div class="mb-4"><strong>Name:</strong> {{ student.name }}</div>
      <div class="mb-4"><strong>Email:</strong> {{ student.email }}</div>
      <div class="mb-4">
        <strong>Other Details:</strong> {{ student.other_details }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  student: Object,
});
</script>
