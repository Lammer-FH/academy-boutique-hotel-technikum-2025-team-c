<script setup>
import { computed } from "vue";

const props = defineProps({
  address: {
    type: String,
    default: "Höchstädtplatz 6, 1200 Wien",
  },
  hotelName: {
    type: String,
    default: "Boutique Hotel Technikum Wien",
  }
});

const encodedAddress = computed(() => encodeURIComponent(props.address));

const embedSrc = computed(
  () => `https://www.google.com/maps?q=${encodedAddress.value}&output=embed`
);
</script>

<template>
  <section>
    <p v-if="hotelName" class="font-bold mt-2 text-gray-600 max-w-2xl">{{ hotelName }}</p>
    <p v-if="address" class="mt-2 text-gray-600 max-w-2xl">{{ address }}</p>

    <div
      class="mt-6 rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white"
    >
      <iframe
        title="Google Maps"
        class="w-full h-80 sm:h-96"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        :src="embedSrc"
        allowfullscreen
      ></iframe>
    </div>
  </section>
</template>
