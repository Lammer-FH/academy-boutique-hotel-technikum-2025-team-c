<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <!-- VALSKY - added CSS classes in App.vue make sure that the footer component stays always on the bottom of the website -->
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
