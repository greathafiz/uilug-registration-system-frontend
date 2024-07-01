<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <h2 class="text-2xl mb-4">
        {{ isEditing ? "Edit Skill" : "Add Skill" }}
      </h2>
      <form @submit.prevent="saveSkill">
        <div class="mb-4">
          <label for="skill_name" class="block text-sm font-bold mb-2"
            >Skill Name</label
          >
          <input
            v-model="skill.skill_name"
            id="skill_name"
            type="text"
            class="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-bold mb-2"
            >Description</label
          >
          <textarea
            v-model="skill.description"
            id="description"
            class="border rounded w-full py-2 px-3"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="slots" class="block text-sm font-bold mb-2"
            >Slots Available</label
          >
          <input
            v-model="skill.slots"
            id="slots"
            type="number"
            class="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div class="mb-4">
          <label for="trainer" class="block text-sm font-bold mb-2"
            >Trainer</label
          >
          <select
            v-model="skill.trainer_id"
            id="trainer"
            class="border rounded w-full py-2 px-3"
            required
          >
            <option value="" disabled>Select a trainer</option>
            <option
              v-for="trainer in trainers"
              :key="trainer.trainer_id"
              :value="trainer.trainer_id"
            >
              {{ trainer.trainer_name }}
            </option>
          </select>
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
            {{ isEditing ? "Save Changes" : "Add Skill" }}
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
  skill: Object,
  trainers: Array,
  isEditing: Boolean,
});

const emit = defineEmits(["close", "save"]);
const skill = ref({});
const visible = ref(false);

watch(
  () => props.skill,
  (newSkill) => {
    skill.value = newSkill
      ? { ...newSkill }
      : { name: "", description: "", slots: 0, trainer_id: "" };
    visible.value = true;
  }
);

const saveSkill = async () => {
  try {
    if (props.isEditing) {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL_PROD}/skills/${
          skill.value.skill_id
        }`,
        {
          skill_name: skill.value.skill_name,
          description: skill.value.description,
          trainer_id: skill.value.trainer_id,
          slots: skill.value.slots,
        }
      );
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL_PROD}/skills`,
        skill.value
      );
    }
    emit("save");
    close();
  } catch (error) {
    console.error("Error saving skill:", error);
  }
};

const close = () => {
  visible.value = false;
  emit("close");
};
</script>
