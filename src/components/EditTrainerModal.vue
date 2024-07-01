<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 class="text-2xl mb-4">
        {{ isEditing ? "Edit Trainer's Info." : "Add New" }}
      </h2>
      <form @submit.prevent="saveTrainer">
        <div class="mb-4">
          <label for="trainer_name" class="block text-sm font-bold mb-2"
            >Trainer's Name</label
          >
          <input
            v-model="trainer.trainer_name"
            id="trainer_name"
            type="text"
            class="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-bold mb-2">Email</label>
          <input
            v-model="trainer.email"
            id="email"
            class="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div class="mb-4">
          <label for="phone_number" class="block text-sm font-bold mb-2"
            >Phone Number</label
          >
          <input
            v-model="trainer.phone_number"
            id="phone_number"
            type="text"
            class="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-sm font-bold mb-2"
            >Address</label
          >
          <input
            v-model="trainer.address"
            id="address"
            type="text"
            class="border rounded w-full py-2 px-3"
          />
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="close"
            class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button type="submit" class="bg-uil-400 text-white px-4 py-2 rounded">
            {{ isEditing ? "Save Changes" : "Add New" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const props = defineProps({
  //   skill: Object,
  trainer: Object,
  isEditing: Boolean,
});

const emit = defineEmits(["close", "save"]);
const trainer = ref({});
const visible = ref(false);

watch(
  () => props.trainer,
  (newTrainer) => {
    trainer.value = newTrainer
      ? { ...newTrainer }
      : { trainer_name: "", email: "", phone_number: "", address: "" };
    visible.value = true;
  }
);

const saveTrainer = async () => {
  console.log(trainer.value);
  try {
    if (props.isEditing) {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL_PROD}/trainers/${
          trainer.value.trainer_id
        }`,
        trainer.value
      );
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_PROD}/trainers`,
        trainer.value
      );
    }
    emit("save");
    close();
  } catch (error) {
    console.error(`Error saving trainer's details:`, error);
  }
};

const close = () => {
  visible.value = false;
  emit("close");
};
</script>
