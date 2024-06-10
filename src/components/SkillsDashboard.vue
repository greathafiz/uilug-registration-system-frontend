<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Skills</h1>
    <button
      @click="openAddModal"
      class="bg-uil-400 text-white px-4 py-2 mb-4 rounded"
    >
      Add Skill
    </button>
    <table class="w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr>
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">Skill Name</th>
          <th class="px-4 py-2">Description</th>
          <th class="px-4 py-2">Slots Available</th>
          <th class="px-4 py-2">Trainer</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(skill, index) in skills" :key="skill.skill_id">
          <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ truncate(skill.skill_name, 20) }}</td>
          <td class="border px-4 py-2">
            {{ truncate(skill.description, 50) }}
          </td>
          <td class="border px-4 py-2">{{ skill.slots }}</td>
          <td class="border px-4 py-2">
            {{ truncate(skill.trainer.trainer_name, 20) }}
          </td>
          <td class="border px-4 py-2">
            <button
              @click="editSkill(skill)"
              class="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              <i class="fas fa-edit"></i>
            </button>

            <button
              @click="deleteSkill(skill.skill_id)"
              class="bg-red-500 text-white px-2 py-1 ml-2 rounded"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit Modal -->
    <EditSkillModal
      :skill="selectedSkill"
      :trainers="trainers"
      :is-editing="isEditing"
      @close="closeModal"
      @save="fetchSkills"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import EditSkillModal from "@/components/EditSkillModal.vue";
import { truncate } from "@/utils/truncate.js";

const skills = ref([]);
const trainers = ref([]);
const selectedSkill = ref(null);
const isEditing = ref(false);

const fetchSkills = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/v1/skills");
    skills.value = data;
  } catch (error) {
    console.error("An error occured while fetching skills", error);
  }
};

const fetchTrainers = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/v1/trainers");
    trainers.value = data;
  } catch (error) {
    console.error("An error occured while fetching trainers", error);
  }
};

const openAddModal = () => {
  selectedSkill.value = {
    skill_name: "",
    description: "",
    slots: "",
    trainer: "",
  };
  isEditing.value = false;
};

const editSkill = (skill) => {
  selectedSkill.value = skill;
  isEditing.value = true;
};

const deleteSkill = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/skills/${id}`);
    fetchSkills();
  } catch (error) {
    console.error("Error deleting skill:", error);
  }
};

const closeModal = () => {
  selectedSkill.value = null;
  isEditing.value = false;
  fetchSkills();
};

onMounted(() => {
  fetchTrainers();
  fetchSkills();
});
</script>
