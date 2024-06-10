<template>
  <div class="flex h-screen">
    <img
      class="hidden lg:block w-[40%]"
      src="https://schooltry-tertiary-2.s3.eu-west-1.amazonaws.com/institutionBanners/Unilorin_081084832221708299447.jpg"
      alt="Unilorin Banner"
    />

    <div class="flex flex-col justify-center items-center w-full lg:w-1/2">
      <img
        class="w-[20%]"
        src="https://schooltry-tertiary-2.s3.eu-west-1.amazonaws.com/institutionLogos/Unilorin_6500995e76d79.jpeg"
        alt="Unilorin Logo"
      />
      <div class="text-3xl flex justify-center items-center flex-col">
        <h1 class="text-4xl">University of Ilorin</h1>
        <h2 class="text-2xl">GSE 301 Registration Portal</h2>
      </div>

      <form class="mt-20 w-[75%] space-y-10" @submit.prevent="onSubmit">
        <h3 class="text-xl">Enter your details below.</h3>
        <input
          type="text"
          class="border w-full px-4 py-2"
          v-model="id"
          placeholder="Username"
        />
        <PasswordInput ref="passwordInput" @password-entered="handlePassword" />

        <div class="text-right cursor-pointer text-uil-500 hover:text-uil-400">
          Forgot Password?
        </div>

        <button
          class="w-full text-white bg-uil-500 py-2 rounded font-bold cursor-pointer hover:bg-uil-400"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import PasswordInput from "@/components/PasswordInput.vue";
import axios from "axios";

const id = ref("");
const password = ref("");
const passwordInput = ref(null);

const router = useRouter();
const toast = useToast();

const handlePassword = (value) => {
  password.value = value;
};

const onSubmit = async () => {
  if (!id.value || !password.value) {
    toast.error("Both fields must be filled");
    return;
  }

  const userDetails = {
    username: id.value,
    password: password.value,
  };

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      userDetails
    );
    const token = data.access_token;
    const role = data.roles;

    localStorage.setItem("accessToken", token);
    localStorage.setItem("userRole", role);

    if (role === "admin") {
      router.push("/admin");
    } else if (role === "student") {
      router.push("/dashboard");
    }
  } catch (error) {
    if (error && error.response && error.response.data) {
      console.error(error.response.data);
    } else {
      console.error("Login failed", error);
    }
    toast.error("Login failed. Please try again.");
  } finally {
    id.value = "";
    if (
      passwordInput.value &&
      typeof passwordInput.value.clearPassword === "function"
    ) {
      passwordInput.value.clearPassword();
    }
  }
};
</script>
