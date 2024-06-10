<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white shadow-md fixed z-20 inset-y-0 left-0 transform',
        { '-translate-x-full lg:translate-x-0': !isSidebarOpen },
      ]"
      class="lg:relative lg:translate-x-0 transition-transform duration-200 ease-in-out w-64"
    >
      <div class="p-4 flex justify-between items-center lg:hidden">
        <div class="flex items-center justify-center w-full">
          <img
            src="https://schooltry-tertiary-2.s3.eu-west-1.amazonaws.com/institutionLogos/Unilorin_6500995e76d79.jpeg"
            alt="Unilorin Logo"
            class="w-[70%]"
          />
        </div>
        <button @click="toggleSidebar" class="text-gray-700">
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
      </div>

      <div class="p-4 lg:flex lg:flex-col lg:items-center">
        <img
          src="https://schooltry-tertiary-2.s3.eu-west-1.amazonaws.com/institutionLogos/Unilorin_6500995e76d79.jpeg"
          alt="Unilorin Logo"
          class="mx-auto w-[70%] lg:block hidden"
        />
      </div>
      <nav class="mt-6">
        <ul>
          <li>
            <router-link
              to="/"
              class="block px-4 py-2 text-gray-700 hover:text-gray-200"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/dashboard"
              class="block px-4 py-2 text-gray-700 hover:text-gray-200"
              >Skills Catalogue</router-link
            >
          </li>
          <li>
            <router-link
              to="/profile"
              class="block px-4 py-2 text-gray-700 hover:text-gray-200"
              >Profile</router-link
            >
          </li>
          <li>
            <router-link
              to="/logout"
              class="block px-4 py-2 text-gray-700 hover:text-gray-200"
              >Logout</router-link
            >
          </li>
        </ul>
      </nav>
    </aside>
    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <header
        class="bg-white shadow p-4 flex justify-between items-center lg:ml-0"
      >
        <h1 class="text-xl font-bold">Welcome {{ user.full_name }}...</h1>
        <button @click="toggleSidebar" class="text-gray-700 lg:hidden">
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
              d="M6 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </header>
      <!-- Skills Catalogue -->
      <main class="flex-1 p-6">
        <h1 class="text-3xl font-bold mb-6">Skills Catalogue</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="bg-white p-4 rounded shadow"
          >
            <h2 class="text-xl font-bold">{{ skill.skill_name }}</h2>
            <p class="mt-2">{{ truncate(skill.description, 50) }}</p>
            <!-- <div class="flex justify-normal"> -->
            <button
              @click="openModal(skill)"
              class="mt-4 mr-2 bg-uil-400 text-white py-2 px-4 rounded hover:bg-uil-500"
            >
              View Details
            </button>
            <button
              @click="registerSkill(user.student_id, skill.skill_id)"
              class="mt-4 bg-uil-400 text-white py-2 px-4 rounded hover:bg-uil-500"
            >
              Register
            </button>
            <!-- </div> -->
          </div>
        </div>
        <SkillModal
          :is-open="isModalOpen"
          :skill="selectedSkill"
          @close="closeModal"
          @register="registerSkill(user.student_id, selectedSkill.skill_id)"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import SkillModal from "./SkillModal.vue";
import { truncate } from "@/utils/truncate.js";

const toast = useToast();
const user = ref({});
const skills = ref([]);
const isSidebarOpen = ref(false);
const isModalOpen = ref(false);
const selectedSkill = ref(null);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const openModal = (skill) => {
  selectedSkill.value = skill;
  isModalOpen.value = true;
};

const closeModal = () => (isModalOpen.value = false);

const fetchSkills = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/v1/skills");
    skills.value = data;
  } catch (error) {
    console.error("An error occured while fetching skills", error);
  }
};

const fetchUserDetails = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/auth/profile"
    );
    user.value = data;
  } catch (error) {
    console.error("An error occured while fetching user details.");
  }
};

const registerSkill = async (studentId, skillId) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/payments/initialize",
      {
        student_id: studentId,
        skill_id: skillId,
      }
    );
    if (data) {
      window.open(data.data.authorization_url);
      // console.log(data);
    }
  } catch (error) {
    console.error(error.response.data);

    if (error.response.data.statusCode === 400) {
      toast.error(`You can't register twice.`);
    } else {
      toast.error("An error occured while registering. Please try again.");
    }
  }
};

onMounted(() => {
  fetchUserDetails();
  fetchSkills();
});
</script>
