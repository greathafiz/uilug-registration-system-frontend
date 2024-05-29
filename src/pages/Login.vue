<template>
  <div class="flex h-screen">
    <img
      class="hidden lg:block w-1/2"
      src="https://schooltry-tertiary-2.s3.eu-west-1.amazonaws.com/institutionBanners/Unilorin_081084832221708299447.jpg"
      alt="Unilorin Banner"
    />

    <div class="flex flex-col justify-center items-center w-full lg:w-1/2">
      <img
        class="w-[20%]"
        src="https://schooltry-tertiary-2.s3.eu-west-1.amazonaws.com/institutionLogos/Unilorin_6500995e76d79.jpeg"
        alt="Unilorin Logo"
      />
      <div class="text-3xl">
        <h1>University of Ilorin</h1>
      </div>

      <form
        method="post"
        class="mt-20 w-[75%] space-y-10"
        @submit.prevent="onSubmit"
      >
        <h3 class="text-xl">Enter your details below.</h3>
        <input
          type="text"
          class="border w-full px-4 py-2"
          v-model="id"
          placeholder="Matric. Number"
        />
        <PasswordInput @password-entered="handlePassword" />

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
import { ref } from "vue";
import { useToast } from "vue-toastification";
import PasswordInput from "@/components/PasswordInput.vue";

const id = ref("");
let enteredPassword = ref("");
const toast = useToast();

const handlePassword = (password) => {
  enteredPassword = password;
};

const onSubmit = () => {
  if (!id.value || !enteredPassword) {
    toast.error("Both fields must be filled");
    return;
  }

  const userDetails = {
    id: id.value,
    password: enteredPassword,
  };
  console.log(userDetails);

  id.value = "";
  // enteredPassword = "";
};
</script>
