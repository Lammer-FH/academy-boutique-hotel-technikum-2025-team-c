<script setup>
import { onMounted, computed } from "vue";
import { useBookingStore } from "@/stores/BookingStore";
import { useRoomStore } from "@/stores/RoomStore";

const bookingStore = useBookingStore();
const roomStore = useRoomStore();

const selectedRoom = computed(() => roomStore.selectedRoom);
const fromDate = computed(() => roomStore.selectedFromDate);
const toDate = computed(() => roomStore.selectedToDate);

const formatDate = (iso) => {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
};

const matchingBooking = computed(() => {
  if (!Array.isArray(bookingStore.bookings)) return null;
  // Match by room id and date range (API fields: rooms_id, from, to)
  const roomId = selectedRoom.value?.id;
  return (
    bookingStore.bookings.find((b) => {
      const bid = b?.rooms_id ?? b?.roomId ?? b?.room?.id;
      const bfrom = b?.from ?? b?.fromDate;
      const bto = b?.to ?? b?.toDate;
      return bid === roomId && bfrom === fromDate.value && bto === toDate.value;
    }) ||
    bookingStore.currentBooking ||
    null
  );
});

onMounted(async () => {
  try {
    await bookingStore.fetchBookings();
  } catch (e) {
    // error is handled in store
  }
});
</script>

<template>
  <div class="bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
    <!-- Success Banner -->
    <div
      class="rounded-2xl border-2 border-lime-500 bg-gradient-to-br from-lime-50 to-emerald-50 p-6 sm:p-8 mb-6 sm:mb-8 text-center shadow-sm"
    >
      <div
        class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-lime-400 to-lime-600 rounded-full mb-3 sm:mb-4 shadow-lg"
      >
        <i class="bi bi-check-lg text-white text-3xl sm:text-4xl"></i>
      </div>
      <h2 class="text-2xl sm:text-3xl font-bold text-green-900 mb-2">
        Buchung bestätigt!
      </h2>
      <p class="text-sm sm:text-base text-green-800">
        Ihre Buchung wurde erfolgreich erfasst.
      </p>
    </div>

    <!-- Details Card -->
    <div
      class="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm p-4 sm:p-6"
    >
      <h3
        class="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2"
      >
        <i class="bi bi-receipt text-sky-600 text-xl sm:text-2xl"></i>
        Buchungsdetails
      </h3>
      <div class="space-y-4 sm:space-y-5">
        <div class="pb-3 sm:pb-4 border-b border-gray-300">
          <div class="flex items-center gap-2 mb-1">
            <i class="bi bi-door-open text-sky-700 text-lg sm:text-xl"></i>
            <span class="text-gray-700 font-semibold">Zimmer</span>
          </div>
          <div class="font-medium text-gray-900 text-sm sm:text-base">
            <template v-if="selectedRoom">
              {{ selectedRoom.roomsName }} {{ selectedRoom.roomsNumber }}
            </template>
            <template v-else>—</template>
          </div>
        </div>

        <div class="pb-3 sm:pb-4 border-b border-gray-300">
          <div class="flex items-center gap-2 mb-1">
            <i class="bi bi-calendar-range text-sky-700 text-lg sm:text-xl"></i>
            <span class="text-gray-700 font-semibold">Zeitraum</span>
          </div>
          <div class="font-medium text-gray-900 text-sm sm:text-base">
            {{ formatDate(fromDate) }} – {{ formatDate(toDate) }}
          </div>
        </div>

        <div>
          <div class="flex items-center gap-2 mb-1">
            <i class="bi bi-hash text-sky-700 text-lg sm:text-xl"></i>
            <span class="text-gray-700 font-semibold">Buchungsnummer</span>
          </div>
          <div class="font-medium text-gray-900 text-sm sm:text-base">
            <template v-if="matchingBooking">
              {{ matchingBooking.bookingId || "—" }}
            </template>
            <template v-else>
              <span class="text-gray-500 text-sm">Wird geladen…</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
