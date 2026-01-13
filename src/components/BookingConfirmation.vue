<script setup>
import { onMounted, computed, ref } from "vue";
import { useBookingStore } from "@/stores/BookingStore";
import { useRoomStore } from "@/stores/RoomStore";
import RoomCard from "./RoomCard.vue";
import Maps from "@/components/Maps.vue";

const bookingStore = useBookingStore();
const roomStore = useRoomStore();

const fetchError = ref(null);

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
    }) || null
  );
});

onMounted(async () => {
  try {
    await bookingStore.fetchBookings();
  } catch (e) {
    fetchError.value =
      "Buchungen konnten nicht geladen werden. Bitte versuchen Sie es später erneut.";
  }
});
</script>

<template>
  <div class="booking-confirmation bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
    <div
      v-if="fetchError"
      role="alert"
      class="mb-6 rounded-xl border-2 border-red-200 bg-red-50 p-4 text-red-800"
    >
      <div class="font-semibold">Fehler</div>
      <div class="text-sm">{{ fetchError }}</div>
    </div>
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
        Ihre Buchung wurde erfolgreich erfasst. Es sind keine weiteren Schritte mehr notwendig.
      </p>
    </div>

    <!-- Details Card -->
    <div
      class="details-card rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm p-4 sm:p-6"
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
            <i class="bi bi-hash text-sky-700 text-lg sm:text-xl"></i>
            <span class="text-gray-700 font-semibold">Buchungsnummer</span>
          </div>
          <div class="font-medium text-gray-900 text-sm sm:text-base">
            <template v-if="fetchError">
              <span class="text-gray-500 text-sm">—</span>
            </template>
            <template v-else-if="matchingBooking">
              {{ matchingBooking.bookingId || "—" }}
            </template>
            <template v-else>
              <span class="text-gray-500 text-sm">Wird geladen…</span>
            </template>
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

        <div class="pb-3 sm:pb-4 border-b border-gray-300">
          <div class="flex items-center gap-2 mb-1">
            <i class="bi bi-person-circle text-sky-700 text-lg sm:text-xl"></i>
            <span class="text-gray-700 font-semibold">Gast</span>
          </div>
          <div>
            <div class="font-medium text-gray-900 text-sm sm:text-base">
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

        <div class="room-card-print">
          <div class="flex items-center gap-2 mb-1">
            <i class="bi bi-door-open text-sky-700 text-lg sm:text-xl"></i>
            <span class="text-gray-700 font-semibold">Zimmer</span>
          </div>
          <div class="mt-3">
            <template v-if="selectedRoom">
              <RoomCard
                :room="selectedRoom"
                :hide-price="true"
                :hide-book-button="true"
              />
            </template>
            <template v-else>
              <div class="font-medium text-gray-900 text-sm sm:text-base">—</div>
            </template>
          </div>
        </div>
      </div>

      <div class="map-section mt-6 border-t border-gray-300 pt-6">
        <div class="flex items-center gap-2 mb-1">
            <i class="bi bi-car-front-fill text-sky-700 text-lg sm:text-xl"></i>
            <span class="text-gray-700 font-semibold">Anfahrt</span>
          </div>
        <Maps
          address="Höchstädtplatz 6, 1200 Wien"
          hotelName="Boutique Hotel Technikum Wien"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  @page {
    size: A4 portrait;
    margin: 10mm;
  }

  /* Compact overall layout */
  .booking-confirmation {
    padding: 0 !important;
    box-shadow: none !important;
    background: #fff !important;
    font-size: 10.5pt;
    line-height: 1.2;
  }

  .booking-confirmation * {
    box-shadow: none !important;
  }

  /* Remove gradients to save ink */
  .booking-confirmation :deep(.bg-gradient-to-br) {
    background: #fff !important;
  }

  /* Reduce big banner padding and hide decorative icon */
  .booking-confirmation :deep(.rounded-2xl) {
    border-radius: 10px !important;
  }

  .booking-confirmation :deep(.shadow-2xl),
  .booking-confirmation :deep(.shadow-lg),
  .booking-confirmation :deep(.shadow-md),
  .booking-confirmation :deep(.shadow-sm) {
    box-shadow: none !important;
  }

  .booking-confirmation :deep(.p-6) {
    padding: 10px !important;
  }

  .booking-confirmation :deep(.p-8) {
    padding: 12px !important;
  }

  .booking-confirmation :deep(.mb-6),
  .booking-confirmation :deep(.sm\:mb-8) {
    margin-bottom: 10px !important;
  }

  .booking-confirmation :deep(.w-16),
  .booking-confirmation :deep(.h-16),
  .booking-confirmation :deep(.sm\:w-20),
  .booking-confirmation :deep(.sm\:h-20) {
    display: none !important;
  }

  .booking-confirmation :deep(h2) {
    font-size: 15pt !important;
    margin-bottom: 4px !important;
  }

  .booking-confirmation :deep(h3) {
    font-size: 12pt !important;
    margin-bottom: 8px !important;
  }

  /* Reduce Tailwind space-y gaps */
  .booking-confirmation :deep(.space-y-4 > * + *),
  .booking-confirmation :deep(.space-y-5 > * + *) {
    margin-top: 6px !important;
  }

  .booking-confirmation :deep(.pb-3),
  .booking-confirmation :deep(.sm\:pb-4) {
    padding-bottom: 6px !important;
  }

  /* Avoid page breaks inside key blocks */
  .booking-confirmation,
  .booking-confirmation .details-card,
  .booking-confirmation .room-card-print,
  .booking-confirmation .map-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  /* RoomCard is tall; hide its large image in print */
  .booking-confirmation :deep(.room-card-print .h-80) {
    display: none !important;
  }

  .booking-confirmation :deep(.room-card-print article) {
    transform: none !important;
    border: 1px solid #e5e7eb !important;
  }

  .booking-confirmation :deep(.room-card-print .p-4) {
    padding: 10px !important;
  }

  /* Map: shrink height for print */
  .booking-confirmation .map-section {
    display: none !important;
  }
}
</style>
