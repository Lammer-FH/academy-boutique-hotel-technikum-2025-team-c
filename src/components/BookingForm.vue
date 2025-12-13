<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useBookingStore } from "@/stores/BookingStore";
import { useRoomStore } from "@/stores/RoomStore";

const bookingStore = useBookingStore();
const roomStore = useRoomStore();

const selectedRoom = computed(() => roomStore.selectedRoom);

const displayFromDate = computed(() => roomStore.selectedFromDate);
const displayToDate = computed(() => roomStore.selectedToDate);

const getRoomImage = computed(() => {
  return selectedRoom.value?.id
    ? new URL(
        `../assets/img/rooms/Boutique-Hotel-Rooms-${selectedRoom.value.id}.jpg`,
        import.meta.url
      ).href
    : null;
});

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
  breakfast: false,
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
  <div class="bg-white rounded-2xl shadow-2xl p-6 pt-0">
    <div class="mb-4">
      <div
        class="group relative h-78 overflow-hidden bg-gray-100 -mx-6 rounded-t-2xl"
      >
        <img
          v-if="getRoomImage"
          :src="getRoomImage"
          :alt="selectedRoom?.roomsName"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-x-0 top-0 md:top-auto md:bottom-0">
          <div
            class="m-3 rounded-xl px-4 py-3 bg-white/85 backdrop-blur-sm border border-white/60 shadow-sm"
          >
            <h3 class="text-base font-bold text-gray-900">
              {{ selectedRoom?.roomsName }} {{ selectedRoom?.roomsNumber }}
            </h3>
            <p class="text-xs text-gray-700 mt-1 flex items-center gap-2">
              <i class="bi bi-calendar-event"></i>
              <span class="font-medium">{{
                formatDateAT(displayFromDate)
              }}</span>
              <span class="text-gray-400">→</span>
              <span class="font-medium">{{ formatDateAT(displayToDate) }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-5">
      <div>
        <label
          for="firstname"
          class="block text-sm font-semibold mb-2 text-gray-700"
        >
          Vorname
        </label>
        <input
          id="firstname"
          v-model="formData.firstname"
          type="text"
          required
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          placeholder="Vorname"
        />
      </div>

      <div>
        <label
          for="lastname"
          class="block text-sm font-semibold mb-2 text-gray-700"
        >
          Nachname
        </label>
        <input
          id="lastname"
          v-model="formData.lastname"
          type="text"
          required
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          placeholder="Nachname"
        />
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-semibold mb-2 text-gray-700"
        >
          E-Mail
        </label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          required
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          placeholder="E-Mail"
        />
      </div>

      <div>
        <label
          for="confirmEmail"
          class="block text-sm font-semibold mb-2 text-gray-700"
        >
          E-Mail bestätigen
        </label>
        <input
          id="confirmEmail"
          v-model="formData.confirmEmail"
          type="email"
          required
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
          placeholder="E-Mail bestätigen"
        />
      </div>

      <div>
        <label
          for="birthdate"
          class="block text-sm font-semibold mb-2 text-gray-700"
        >
          Geburtsdatum
        </label>
        <input
          id="birthdate"
          v-model="formData.birthdate"
          type="date"
          required
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
        />
      </div>
      <div>
        <span class="block text-sm font-semibold mb-2 text-gray-700"
          >Frühstück</span
        >
        <div class="grid grid-cols-2 gap-3">
          <label class="cursor-pointer">
            <input
              type="radio"
              name="breakfast"
              :value="false"
              v-model="formData.breakfast"
              class="peer sr-only"
            />
            <div
              class="p-3 border-2 border-gray-300 rounded-lg text-center hover:bg-gray-50 peer-checked:border-sky-600 peer-checked:bg-sky-50 peer-checked:text-sky-700 transition-colors"
            >
              <i class="bi bi-ban text-lg mr-2"></i>
              <span class="font-medium">ohne Verpflegung</span>
            </div>
          </label>
          <label class="cursor-pointer">
            <input
              type="radio"
              name="breakfast"
              :value="true"
              v-model="formData.breakfast"
              class="peer sr-only"
            />
            <div
              class="p-3 border-2 border-gray-300 rounded-lg text-center hover:bg-gray-50 peer-checked:border-sky-600 peer-checked:bg-sky-50 peer-checked:text-sky-700 transition-colors"
            >
              <i class="bi bi-cup-hot text-lg mr-2"></i>
              <span class="font-medium">inkl. Frühstück</span>
            </div>
          </label>
        </div>
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
        class="w-full py-3 px-4 bg-sky-700 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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
