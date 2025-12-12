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
  <div class="mt-8">
    <div class="rounded-xl border border-green-200 bg-green-50 p-5">
      <h3 class="text-lg font-bold text-green-900 mb-2">Buchung bestätigt</h3>
      <p class="text-sm text-green-800">
        Ihre Buchung wurde erfolgreich erfasst. Nachstehend die Details.
      </p>
    </div>

    <div class="mt-4 rounded-xl border border-gray-200 bg-white shadow-sm p-4">
      <div class="space-y-3 text-sm">
        <div class="flex items-center justify-between">
          <span class="text-gray-600">Zimmer</span>
          <span class="font-medium">
            <template v-if="selectedRoom">
              {{ selectedRoom.roomsName }} {{ selectedRoom.roomsNumber }}
            </template>
            <template v-else>—</template>
          </span>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-gray-600">Zeitraum</span>
          <span class="font-medium"
            >{{ formatDate(fromDate) }} – {{ formatDate(toDate) }}</span
          >
        </div>

        <div class="flex items-center justify-between">
          <span class="text-gray-600">Bestätigung</span>
          <span class="font-medium">
            <template v-if="matchingBooking">
              #{{ matchingBooking.bookingId || "—" }}
            </template>
            <template v-else>Wird geladen…</template>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
