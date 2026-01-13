<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useBookingStore } from "@/stores/BookingStore";
import { useRoomStore } from "@/stores/RoomStore";

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
  hidePrice: {
    type: Boolean,
    default: false,
  },
  hideBookButton: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const roomStore = useRoomStore();
const bookingStore = useBookingStore();

const bookRoom = () => {
  roomStore.setSelectedRoom(props.room);
  // If from/to dates exist on the room card context, set them too
  if (props.room.fromDate && props.room.toDate) {
    roomStore.setSelectedDates(props.room.fromDate, props.room.toDate);
  }
  // Ensure BookingView shows the form first
  bookingStore.setBookingStep("form");
  router.push({ name: "booking" });
};

const getRoomImage = computed(() => {
  return new URL(
    `../assets/img/rooms/Boutique-Hotel-Rooms-${props.room?.id}.jpg`,
    import.meta.url
  ).href;
});

const price = computed(() =>
  new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
  }).format(props.room.pricePerNight)
);

const bedsLabel = computed(() =>
  props.room?.beds
    ? `${props.room.beds} ${props.room.beds === 1 ? "Bett" : "Betten"}`
    : ""
);

const showFooter = computed(() => !props.hidePrice || !props.hideBookButton);

/* VALSKY - props.room.extras is a proxy array with proxy objects -> this function
converts it to a normal array with normal objects */
const normalizedExtrasArray = computed(() => {
  return Array.from(props.room.extras).map((extra) => ({ ...extra }));
});

// Associative extras map { key: boolean }
const mappedExtras = computed(() => {
  return normalizedExtrasArray.value.reduce((acc, extra) => {
    const key = Object.keys(extra)[0];
    const value = Object.values(extra)[0];
    acc[key] = value === 1;
    return acc;
  }, {});
});

const amenities = computed(() => {
  const amenitiesList = [];
  if (mappedExtras.value.bathroom)
    amenitiesList.push({ key: "bathroom", label: "Bad" });
  if (mappedExtras.value.minibar)
    amenitiesList.push({ key: "minibar", label: "Minibar" });
  if (mappedExtras.value.television)
    amenitiesList.push({ key: "television", label: "TV" });
  if (mappedExtras.value.aircondition)
    amenitiesList.push({ key: "aircondition", label: "Klimaanlage" });
  if (mappedExtras.value.breakfast)
    amenitiesList.push({ key: "breakfast", label: "Frühstück" });
  if (mappedExtras.value.handicapped)
    amenitiesList.push({ key: "handicapped", label: "Barriefrei" });
  if (mappedExtras.value.livingroom)
    amenitiesList.push({ key: "livingroom", label: "Wohnzimmer" });
  if (mappedExtras.value.wifi)
    amenitiesList.push({ key: "wifi", label: "WLAN" });
  return amenitiesList;
});
</script>

<template>
  <article
    class="group relative rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <!-- Image Section -->
    <div class="relative h-80 overflow-hidden bg-gray-100">
      <img
        :src="getRoomImage"
        :alt="props.room.roomsName"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <!-- Price Badge -->
      <div
        v-if="price && !props.hidePrice"
        class="absolute top-3 right-3 bg-gradient-to-r from-lime-500 to-lime-600 text-white text-xm font-semibold px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm"
      >
        {{ price }}
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-4 space-y-3">
      <!-- Title -->
      <div>
        <h3 class="text-lg font-bold text-gray-900 leading-tight mb-1">
          {{ props.room.roomsName }} {{ props.room.roomsNumber }}
        </h3>
        <div class="flex items-center gap-1.5 text-gray-600">
          <i class="bi bi-people-fill text-sm"></i>
          <span class="text-xs font-medium">{{ bedsLabel }}</span>
        </div>
      </div>

      <!-- Amenities -->
      <div v-if="amenities.length" class="flex flex-wrap gap-2 pt-1">
        <span
          v-for="amenity in amenities"
          :key="amenity.key"
          class="inline-flex items-center gap-1.5 text-gray-700 text-xs bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-200"
        >
          <!-- bathroom Icon -->
          <i v-if="amenity.key === 'bathroom'" class="bi bi-water text-sm"></i>
          <!-- Minibar Icon -->
          <i
            v-if="amenity.key === 'minibar'"
            class="bi bi-cup-straw text-sm"
          ></i>
          <!-- Television Icon -->
          <i v-if="amenity.key === 'television'" class="bi bi-tv text-sm"></i>
          <!-- Air Condition Icon -->
          <i
            v-if="amenity.key === 'aircondition'"
            class="bi bi-snow text-sm"
          ></i>
          <!-- WiFi Icon -->
          <i v-if="amenity.key === 'wifi'" class="bi bi-wifi text-sm"></i>
          <!-- Breakfast Icon -->
          <i
            v-if="amenity.key === 'breakfast'"
            class="bi bi-cup-hot-fill text-sm"
          ></i>
          <!-- Handicapped Accessible Icon -->
          <i
            v-if="amenity.key === 'handicapped'"
            class="bi bi-person-wheelchair text-sm"
          ></i>
          <!-- Living Room Icon -->
          <i
            v-if="amenity.key === 'livingroom'"
            class="bi bi-house-heart-fill text-sm"
          ></i>
          <span class="font-medium">{{ amenity.label }}</span>
        </span>
      </div>

      <!-- Divider -->
      <div v-if="showFooter" class="border-t border-gray-200 pt-3">
        <div class="flex items-center justify-between">
          <div v-if="!props.hidePrice" class="text-left">
            <p class="text-xs text-gray-500 uppercase tracking-wide">
              Pro Nacht
            </p>
            <p class="text-lg font-bold text-gray-900">
              {{ price }}
            </p>
          </div>
          <button
            v-if="!props.hideBookButton"
            type="button"
            @click="bookRoom"
            class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-700 text-white px-4 py-3 text-xm font-medium"
          >
            <i class="bi bi-calendar-check text-lg"></i>
            Jetzt buchen
          </button>
        </div>
      </div>
    </div>
  </article>
</template>
