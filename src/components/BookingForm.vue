<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useBookingStore } from "@/stores/BookingStore";
import { useRoomStore } from "@/stores/RoomStore";

const bookingStore = useBookingStore();
const roomStore = useRoomStore();

const selectedRoom = computed(() => roomStore.selectedRoom);

const displayFromDate = computed(() => roomStore.selectedFromDate);
const displayToDate = computed(() => roomStore.selectedToDate);

const formatDateAT = (iso) => {
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

const formData = ref({
  firstname: bookingStore.customerDraft?.firstname || "",
  lastname: bookingStore.customerDraft?.lastname || "",
  email: bookingStore.customerDraft?.email || "",
  // Pre-fill confirm to match email so validation passes when returning
  confirmEmail: bookingStore.customerDraft?.email || "",
  birthdate: bookingStore.customerDraft?.birthdate || "",
});

const error = ref(null);
const successMessage = ref(null);
const loading = ref(false);

const handleSubmit = async () => {
  error.value = null;
  successMessage.value = null;

  if (formData.value.email !== formData.value.confirmEmail) {
    error.value = "Emails do not match";
    return;
  }

  // move to check step; booking happens in BookingCheck
  bookingStore.setCustomerDraft({
    firstname: formData.value.firstname,
    lastname: formData.value.lastname,
    email: formData.value.email,
    birthdate: formData.value.birthdate,
  });
  bookingStore.setBookingStep("check");
};

// Keep a live draft in the store for summary display
watch(
  formData,
  (val) => {
    bookingStore.setCustomerDraft({
      firstname: val.firstname,
      lastname: val.lastname,
      email: val.email,
      birthdate: val.birthdate,
    });
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="booking-form-container">
    <h2 class="text-2xl font-bold mb-6">Raum buchen</h2>

    <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900">
        {{ selectedRoom?.roomsName }} {{ selectedRoom?.roomsNumber }}
      </h3>
      <p class="text-sm text-blue-800 mt-2">
        Aufenthalt:
        <span class="font-medium">{{ formatDateAT(displayFromDate) }}</span> bis
        <span class="font-medium">{{ formatDateAT(displayToDate) }}</span>
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="firstname" class="block text-sm font-medium mb-1">
          Vorname
        </label>
        <input
          id="firstname"
          v-model="formData.firstname"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your first name"
        />
      </div>

      <div>
        <label for="lastname" class="block text-sm font-medium mb-1">
          Nachname
        </label>
        <input
          id="lastname"
          v-model="formData.lastname"
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your last name"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium mb-1">
          E-Mail
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label for="confirmEmail" class="block text-sm font-medium mb-1">
          E-Mail bestätigen
        </label>
        <input
          id="confirmEmail"
          v-model="formData.confirmEmail"
          type="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Confirm your email"
        />
      </div>

      <div>
        <label for="birthdate" class="block text-sm font-medium mb-1">
          Geburtsdatum
        </label>
        <input
          id="birthdate"
          v-model="formData.birthdate"
          type="date"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div
        v-if="error"
        class="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
      >
        {{ error }}
      </div>

      <div
        v-if="successMessage"
        class="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
      >
        {{ successMessage }}
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Buchen
      </button>
    </form>
  </div>
</template>

<style scoped>
.booking-form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
