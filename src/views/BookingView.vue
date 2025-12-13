<script setup>
import { computed } from "vue";
import { useBookingStore } from "@/stores/BookingStore";
import BookingCheck from "../components/BookingCheck.vue";
import BookingConfirmation from "../components/BookingConfirmation.vue";
import BookingForm from "../components/BookingForm.vue";

const bookingStore = useBookingStore();
const step = computed(() => bookingStore.bookingStep);
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-8 px-4"
  >
    <div class="max-w-3xl mx-auto mb-4">
      <BookingForm v-if="step === 'form'" />
      <BookingCheck v-else-if="step === 'check'" />
      <BookingConfirmation v-else-if="step === 'confirmation'" />
    </div>
  </div>
</template>
