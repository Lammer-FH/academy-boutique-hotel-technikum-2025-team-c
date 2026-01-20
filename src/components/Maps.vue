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

//VALSKY - encode address for URL from "Höchstädtplatz 6, 1200 Wien" to "H%C3%B6chst%C3%A4dtplatz%206%2C%201200%20Wien"
// -> https://www.google.com/maps?q=H%C3%B6chst%C3%A4dtplatz%206%2C%201200%20Wien

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
