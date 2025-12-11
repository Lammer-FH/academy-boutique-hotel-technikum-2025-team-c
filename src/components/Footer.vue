<template>
  <footer class="bg-gray-100 text-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col flex-row items-center md:justify-between gap-4">
        <nav class="flex flex-wrap gap-4 text-sm text-gray-400">
          <router-link to="/" class="hover:text-white">Home</router-link>
          <div>|</div>
          <router-link to="/impressum" class="hover:text-white"
            >Impressum</router-link
          >
        </nav>
      </div>

      <div
        class="mt-6 border-top pt-4 text-xs text-gray-400 text-center md:text-center"
      >
        © {{ new Date().getFullYear() }} Boutique Hotel Technikum
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.border-top {
  border-top: 1px solid rgb(200, 203, 207);
}
</style>
