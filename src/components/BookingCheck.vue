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
  <div class="mt-6">
    <div class="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Zusammenfassung</h3>

      <div class="space-y-3 text-sm text-gray-800">
        <div class="flex items-start justify-between">
          <span class="text-gray-600">Gast</span>
          <span class="font-medium text-right">
            {{ customer.firstname || "—" }} {{ customer.lastname || "" }}
            <template v-if="customer.email">
              <span class="block text-gray-500 text-xs">{{
                customer.email
              }}</span>
            </template>
            <template v-if="customer.birthdate">
              <span class="block text-gray-500 text-xs"
                >Geburtstag: {{ formatDate(customer.birthdate) }}</span
              >
            </template>
          </span>
        </div>

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
          <span class="font-medium">
            {{ formatDate(fromDate) }} – {{ formatDate(toDate) }}
            <span v-if="nights" class="text-gray-500 font-normal">
              ({{ nights }} Nacht<span v-if="nights !== 1">e</span>)</span
            >
          </span>
        </div>
      </div>
      <div v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</div>

      <div class="mt-4 flex items-center gap-3">
        <button
          class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-700 text-white px-4 py-2 text-sm font-medium disabled:bg-gray-400"
          :disabled="loading || !selectedRoom || !fromDate || !toDate"
          @click="confirmBooking"
        >
          <i class="bi bi-check2-circle"></i>
          Buchung bestätigen
        </button>
        <button
          class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gray-100 text-gray-700 px-4 py-2 text-sm font-medium border border-gray-300"
          @click="bookingStore.setBookingStep('form')"
        >
          Ändern
        </button>
      </div>
    </div>
  </div>
</template>
