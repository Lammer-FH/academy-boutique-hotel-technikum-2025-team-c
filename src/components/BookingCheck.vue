<script setup>
import { computed } from "vue";
import { useRoomStore } from "@/stores/RoomStore";
import { useBookingStore } from "@/stores/BookingStore";

const roomStore = useRoomStore();
const bookingStore = useBookingStore();

const selectedRoom = computed(() => roomStore.selectedRoom);
const fromDate = computed(() => roomStore.selectedFromDate);
const toDate = computed(() => roomStore.selectedToDate);
const customer = computed(() => bookingStore.customerDraft);

const getRoomImage = computed(() => {
  return selectedRoom.value?.id
    ? new URL(
        `../assets/img/rooms/Boutique-Hotel-Rooms-${selectedRoom.value.id}.jpg`,
        import.meta.url
      ).href
    : null;
});

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

const nights = computed(() => {
  if (!fromDate.value || !toDate.value) return null;
  const start = new Date(fromDate.value);
  const end = new Date(toDate.value);
  const ms = end.setHours(12, 0, 0, 0) - start.setHours(12, 0, 0, 0);
  const d = Math.round(ms / (1000 * 60 * 60 * 24));
  return d > 0 ? d : null;
});
const loading = computed(() => bookingStore.loading);
const error = computed(() => bookingStore.error);

const confirmBooking = async () => {
  if (!selectedRoom.value || !fromDate.value || !toDate.value) return;
  try {
    await bookingStore.bookRoom(
      selectedRoom.value.id,
      fromDate.value,
      toDate.value,
      customer.value
    );
    bookingStore.setBookingStep("confirmation");
  } catch (e) {
    // error is already in store
  }
};
</script>

<template>
  <div class="bg-white rounded-2xl shadow-2xl p-6 pt-0">
    <!-- Room Image -->
    <div class="mb-8">
      <div
        class="relative h-78 overflow-hidden bg-gray-100 -mx-6 rounded-t-2xl"
      >
        <img
          v-if="getRoomImage"
          :src="getRoomImage"
          :alt="selectedRoom?.roomsName"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Booking Summary -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold mb-2 text-gray-900">Zusammenfassung</h2>
      <p class="text-gray-600 mb-6">
        Bitte überprüfen Sie Ihre Buchungsdetails.
      </p>

      <div
        class="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm p-6"
      >
        <div class="space-y-5">
          <div class="pb-4 border-b border-gray-300">
            <div class="flex items-center gap-2 mb-1">
              <i class="bi bi-person-circle text-sky-700 text-xl"></i>
              <span class="text-gray-700 font-semibold">Gast</span>
            </div>
            <div>
              <div class="font-bold text-gray-900">
                {{ customer.firstname || "—" }} {{ customer.lastname || "" }}
              </div>
              <div v-if="customer.email" class="text-gray-600 text-sm mt-1">
                {{ customer.email }}
              </div>
              <div v-if="customer.birthdate" class="text-gray-500 text-xs mt-1">
                Geboren: {{ formatDate(customer.birthdate) }}
              </div>
            </div>
          </div>

          <div class="pb-4 border-b border-gray-300">
            <div class="flex items-center gap-2 mb-1">
              <i class="bi bi-door-open text-sky-700 text-xl"></i>
              <span class="text-gray-700 font-semibold">Zimmer</span>
            </div>
            <div class="font-bold text-gray-900">
              <template v-if="selectedRoom">
                {{ selectedRoom.roomsName }} {{ selectedRoom.roomsNumber }}
              </template>
              <template v-else>—</template>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-2 mb-1">
              <i class="bi bi-calendar-range text-sky-700 text-xl"></i>
              <span class="text-gray-700 font-semibold">Zeitraum</span>
            </div>
            <div>
              <div class="font-bold text-gray-900">
                {{ formatDate(fromDate) }} – {{ formatDate(toDate) }}
              </div>
              <div v-if="nights" class="text-gray-600 text-sm mt-1">
                {{ nights }} Übernachtung<span v-if="nights !== 1">en</span>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="error"
          class="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          {{ error }}
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row items-stretch gap-4">
      <button
        class="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-sky-700 text-white px-6 py-4 text-base font-semibold shadow-md hover:bg-sky-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        :disabled="loading || !selectedRoom || !fromDate || !toDate"
        @click="confirmBooking"
      >
        <i class="bi bi-check2-circle text-xl"></i>
        <span>{{ loading ? "Wird gebucht..." : "Buchung bestätigen" }}</span>
      </button>
      <button
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-gray-700 px-6 py-4 text-base font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-colors"
        @click="bookingStore.setBookingStep('form')"
      >
        <i class="bi bi-pencil text-lg"></i>
        <span>Ändern</span>
      </button>
    </div>
  </div>
</template>
