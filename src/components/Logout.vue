<template>
  <div></div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("accessToken");
  router.push("/login");
};

logout();
</script>
