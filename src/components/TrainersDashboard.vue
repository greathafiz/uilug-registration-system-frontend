<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Trainers</h1>
    <button
      @click="openAddModal"
      class="bg-uil-400 text-white px-4 py-2 mb-4 rounded"
    >
      Add New
    </button>
    <table class="w-full bg-white rounded-lg shadow-md">
      <thead>
        <tr>
          <th class="px-4 py-2">#</th>
          <th class="px-4 py-2">Trainer Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Phone Number</th>
          <th class="px-4 py-2">Address</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(trainer, index) in trainers" :key="trainer.trainer_id">
          <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
          <td class="border px-4 py-2">{{ trainer.trainer_name }}</td>
          <td class="border px-4 py-2">{{ trainer.email }}</td>
          <td class="border px-4 py-2">{{ trainer.phone_number }}</td>
          <td class="border px-4 py-2">
            {{ truncate(trainer.address, 30) }}
          </td>
          <td class="border px-4 py-2">
            <button
              @click="editTrainer(trainer)"
              class="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              <i class="fas fa-edit"></i>
            </button>

            <button
              @click="deleteTrainer(trainer.trainer_id)"
              class="bg-red-500 text-white px-2 py-1 ml-2 rounded"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add/Edit Modal -->
    <EditTrainerModal
      :trainer="selectedTrainer"
      :is-editing="isEditing"
      @close="closeModal"
      @save="fetchTrainers"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import EditTrainerModal from "@/components/EditTrainerModal.vue";
import { truncate } from "@/utils/truncate";

const trainers = ref([]);
const selectedTrainer = ref(null);
const isEditing = ref(false);

const fetchTrainers = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL_PROD}/trainers`
    );
    trainers.value = data;
  } catch (error) {
    console.error("An error occured while fetching trainers", error);
  }
};

const openAddModal = () => {
  selectedTrainer.value = {
    trainer_name: "",
    email: "",
    phone_number: "",
    address: "",
  };
  isEditing.value = false;
};

const editTrainer = (trainer) => {
  selectedTrainer.value = trainer;
  isEditing.value = true;
};

const deleteTrainer = async (id) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL_PROD}/skills/${id}`
    );
    fetchTrainers();
  } catch (error) {
    console.error("Error deleting trainer:", error);
  }
};

const closeModal = () => {
  selectedTrainer.value = null;
  isEditing.value = false;
  fetchTrainers();
};

onMounted(() => {
  fetchTrainers();
});
</script>
