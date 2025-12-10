<script setup>
import Roomcard from "./Roomcard.vue";
import DatePicker from "./DatePicker.vue";
import { useRoomStore } from "../stores/RoomStore";
import { computed, onMounted, ref, watch } from "vue";
import { usePagination } from "../composables/usePagination";

const roomsStore = useRoomStore();
const bookingDates = ref({ start: null, end: null });

onMounted(() => {
  roomsStore.fetchRooms();
});

// Watch for date changes and fetch available rooms
watch(
  bookingDates,
  (newDates) => {
    if (newDates.start && newDates.end) {
      roomsStore.fetchAvailableRooms(newDates.start, newDates.end);
    }
  },
  { deep: true }
);

// Show available rooms if dates are selected, otherwise show no rooms
const displayedRooms = computed(() => {
  if (bookingDates.value.start && bookingDates.value.end) {
    return roomsStore.availableRooms;
  }
  return [];
});

const {
  currentPage,
  totalPages,
  paginatedItems: paginatedRooms,
  goToPage,
  prevPage,
  nextPage,
} = usePagination(displayedRooms, {
  pageSize: 5,
  initialPage: 1,
});
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 m-6">
    <div class="mb-6">
      <DatePicker v-model="bookingDates" />
    </div>

    <!-- Loading State -->
    <div
      v-if="roomsStore.isLoadingAvailability"
      class="flex justify-center items-center py-12"
    >
      <div class="text-center">
        <i
          class="bi bi-hourglass-split text-4xl text-sky-700 animate-pulse"
        ></i>
        <p class="mt-4 text-gray-600">Verfügbare Zimmer werden geladen...</p>
      </div>
    </div>

    <!-- No Dates Selected Message -->
    <div
      v-else-if="!bookingDates.start || !bookingDates.end"
      class="text-center py-24"
    >
      <i class="bi bi-calendar-heart text-5xl text-sky-700"></i>
      <p class="text-gray-700 text-xl font-medium mb-2 mt-2">
        Bitte wählen Sie ein Datum
      </p>
      <p class="text-gray-500 text-sm">
        Wählen Sie Ihre An- und Abreisedaten, um verfügbare Zimmer anzuzeigen.
      </p>
    </div>

    <!-- No Results Message -->
    <div
      v-else-if="
        bookingDates.start && bookingDates.end && displayedRooms.length === 0
      "
      class="text-center py-12"
    >
      <i class="bi bi-calendar-x text-4xl text-gray-400 mb-4"></i>
      <p class="text-gray-600 text-lg">
        Keine verfügbaren Zimmer für den gewählten Zeitraum.
      </p>
    </div>

    <!-- Rooms List -->
    <div v-else class="flex flex-col gap-6">
      <Roomcard v-for="room in paginatedRooms" :key="room.id" :room="room" />
    </div>
  </div>

  <nav
    v-if="displayedRooms.length > 5 && !roomsStore.isLoadingAvailability"
    class="mt-4 flex items-center justify-center space-x-2"
    aria-label="Pagination"
  >
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-2 py-2 mb-2 rounded border bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-100"
    >
      <svg
        class="w-4 h-4 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m15 19-7-7 7-7"
        />
      </svg>
    </button>

    <button
      v-for="n in totalPages"
      :key="n"
      @click="goToPage(n)"
      :class="[
        'px-3 py-1 mb-2 rounded border',
        { 'bg-gray-200': currentPage === n },
      ]"
    >
      {{ n }}
    </button>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-2 py-2 mb-2 rounded border bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-100"
    >
      <svg
        class="w-4 h-4 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 5 7 7-7 7"
        />
      </svg>
    </button>
  </nav>
</template>
