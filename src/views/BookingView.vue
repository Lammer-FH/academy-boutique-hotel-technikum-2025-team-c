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
  <div>
    <BookingForm v-if="step === 'form'" />
    <BookingCheck v-else-if="step === 'check'" />
    <BookingConfirmation v-else-if="step === 'confirmation'" />
  </div>
</template>
