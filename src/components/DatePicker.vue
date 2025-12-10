<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ start: null, end: null }),
  },
});

const startDate = ref(
  props.modelValue.start ? new Date(props.modelValue.start) : null
);
const endDate = ref(
  props.modelValue.end ? new Date(props.modelValue.end) : null
);
const showStartCalendar = ref(false);
const showEndCalendar = ref(false);
const currentMonth = ref(new Date());
const hoveredDate = ref(null);

const startCalendarRef = ref(null);
const endCalendarRef = ref(null);

// Update local state if props change
watch(
  () => props.modelValue,
  (newValue) => {
    startDate.value = newValue.start ? new Date(newValue.start) : null;
    endDate.value = newValue.end ? new Date(newValue.end) : null;
  },
  { deep: true }
);

// Format date for display
const formatDate = (date) => {
  if (!date) return "Datum wählen";
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

// Get days in month
const daysInMonth = computed(() => {
  const year = currentMonth.value.getFullYear();
  const month = currentMonth.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < (startDayOfWeek === 0 ? 6 : startDayOfWeek - 1); i++) {
    days.push(null);
  }

  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    date.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
    days.push(date);
  }

  return days;
});

// Month navigation
const prevMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() - 1
  );
};

const nextMonth = () => {
  currentMonth.value = new Date(
    currentMonth.value.getFullYear(),
    currentMonth.value.getMonth() + 1
  );
};

const monthYearLabel = computed(() => {
  return new Intl.DateTimeFormat("de-DE", {
    month: "long",
    year: "numeric",
  }).format(currentMonth.value);
});

// Check if date is disabled
const isDateDisabled = (date, isEndCalendar = false) => {
  if (!date) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date < today) return true;

  if (isEndCalendar && startDate.value) {
    return date <= startDate.value;
  }

  return false;
};

// Check if date is selected
const isDateSelected = (date) => {
  if (!date) return false;

  if (startDate.value && isSameDay(date, startDate.value)) return true;
  if (endDate.value && isSameDay(date, endDate.value)) return true;

  return false;
};

// Check if date is in range
const isDateInRange = (date) => {
  if (!date || !startDate.value || !endDate.value) return false;
  return date > startDate.value && date < endDate.value;
};

// Check if date is in hover range
const isDateInHoverRange = (date) => {
  if (!date || !startDate.value || !hoveredDate.value || endDate.value)
    return false;
  const minDate =
    startDate.value < hoveredDate.value ? startDate.value : hoveredDate.value;
  const maxDate =
    startDate.value > hoveredDate.value ? startDate.value : hoveredDate.value;
  return date > minDate && date < maxDate;
};

const isSameDay = (date1, date2) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Select date
const selectDate = (date, isEndCalendar = false) => {
  if (isDateDisabled(date, isEndCalendar)) return;

  if (isEndCalendar) {
    endDate.value = date;
    showEndCalendar.value = false;
  } else {
    startDate.value = date;
    endDate.value = null;
    showStartCalendar.value = false;

    // Auto-open end calendar
    setTimeout(() => {
      showEndCalendar.value = true;
    }, 200);
  }

  emitUpdate();
};

const emitUpdate = () => {
  const formatDateString = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  emit("update:modelValue", {
    start: formatDateString(startDate.value),
    end: formatDateString(endDate.value),
  });
};

// Close calendar when clicking outside
const handleClickOutside = (event) => {
  if (
    startCalendarRef.value &&
    !startCalendarRef.value.contains(event.target)
  ) {
    showStartCalendar.value = false;
  }
  if (endCalendarRef.value && !endCalendarRef.value.contains(event.target)) {
    showEndCalendar.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
</script>

<template>
  <div class="w-full max-w-4xl mx-auto">
    <div
      class="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex flex-col sm:flex-row items-center gap-2 transition-shadow hover:shadow-xl"
    >
      <!-- Start Date -->
      <div class="relative flex-1 w-full" ref="startCalendarRef">
        <div
          @click="
            showStartCalendar = !showStartCalendar;
            showEndCalendar = false;
          "
          class="flex items-center pl-4 pr-4 py-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent"
          :class="{ 'bg-gray-50 border-sky-100': showStartCalendar }"
        >
          <i class="bi bi-calendar-event text-sky-700 text-lg mr-3"></i>
          <div class="flex flex-col flex-1">
            <label
              class="text-xs font-bold text-gray-500 uppercase tracking-wider select-none"
            >
              Anreise
            </label>
            <span class="text-gray-900 font-medium">{{
              formatDate(startDate)
            }}</span>
          </div>
        </div>

        <!-- Start Calendar Dropdown -->
        <div
          v-if="showStartCalendar"
          class="absolute top-full mt-2 left-0 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-80"
        >
          <!-- Month Navigation -->
          <div class="flex items-center justify-between mb-4">
            <button
              @click="prevMonth"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i class="bi bi-chevron-left text-gray-600"></i>
            </button>
            <span class="text-sm font-bold text-gray-900 capitalize">{{
              monthYearLabel
            }}</span>
            <button
              @click="nextMonth"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i class="bi bi-chevron-right text-gray-600"></i>
            </button>
          </div>

          <!-- Week Days -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div
              v-for="day in weekDays"
              :key="day"
              class="text-center text-xs font-semibold text-gray-500 py-1"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar Days -->
          <div class="grid grid-cols-7 gap-1">
            <button
              v-for="(date, index) in daysInMonth"
              :key="index"
              @click="selectDate(date, false)"
              @mouseenter="hoveredDate = date"
              @mouseleave="hoveredDate = null"
              :disabled="isDateDisabled(date, false)"
              class="aspect-square p-2 text-sm rounded-lg transition-all relative"
              :class="{
                invisible: !date,
                'hover:bg-sky-50': date && !isDateDisabled(date, false),
                'bg-sky-600 text-white font-bold hover:bg-sky-700':
                  isDateSelected(date),
                'bg-sky-100': isDateInRange(date) || isDateInHoverRange(date),
                'text-gray-300 cursor-not-allowed': isDateDisabled(date, false),
                'text-gray-900':
                  date && !isDateDisabled(date, false) && !isDateSelected(date),
              }"
            >
              <span v-if="date">{{ date.getDate() }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Divider (visible on desktop) -->
      <div class="hidden sm:block w-px h-10 bg-gray-200"></div>

      <!-- End Date -->
      <div class="relative flex-1 w-full" ref="endCalendarRef">
        <div
          @click="
            if (startDate) {
              showEndCalendar = !showEndCalendar;
              showStartCalendar = false;
            }
          "
          class="flex items-center pl-4 pr-4 py-3 rounded-xl transition-colors cursor-pointer border border-transparent"
          :class="{
            'hover:bg-gray-50': startDate,
            'bg-gray-50 border-sky-100': showEndCalendar,
            'opacity-50 cursor-not-allowed': !startDate,
          }"
        >
          <i
            class="bi bi-calendar-check text-sky-700 text-lg mr-3"
            :class="{ 'text-gray-300': !startDate }"
          ></i>
          <div class="flex flex-col flex-1">
            <label
              class="text-xs font-bold text-gray-500 uppercase tracking-wider select-none"
            >
              Abreise
            </label>
            <span
              class="text-gray-900 font-medium"
              :class="{ 'text-gray-400': !startDate }"
            >
              {{ formatDate(endDate) }}
            </span>
          </div>
        </div>

        <!-- End Calendar Dropdown -->
        <div
          v-if="showEndCalendar && startDate"
          class="absolute top-full mt-2 left-0 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-80"
        >
          <!-- Month Navigation -->
          <div class="flex items-center justify-between mb-4">
            <button
              @click="prevMonth"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i class="bi bi-chevron-left text-gray-600"></i>
            </button>
            <span class="text-sm font-bold text-gray-900 capitalize">{{
              monthYearLabel
            }}</span>
            <button
              @click="nextMonth"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i class="bi bi-chevron-right text-gray-600"></i>
            </button>
          </div>

          <!-- Week Days -->
          <div class="grid grid-cols-7 gap-1 mb-2">
            <div
              v-for="day in weekDays"
              :key="day"
              class="text-center text-xs font-semibold text-gray-500 py-1"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar Days -->
          <div class="grid grid-cols-7 gap-1">
            <button
              v-for="(date, index) in daysInMonth"
              :key="index"
              @click="selectDate(date, true)"
              @mouseenter="hoveredDate = date"
              @mouseleave="hoveredDate = null"
              :disabled="isDateDisabled(date, true)"
              class="aspect-square p-2 text-sm rounded-lg transition-all relative"
              :class="{
                invisible: !date,
                'hover:bg-sky-50': date && !isDateDisabled(date, true),
                'bg-sky-600 text-white font-bold hover:bg-sky-700':
                  isDateSelected(date),
                'bg-sky-100': isDateInRange(date) || isDateInHoverRange(date),
                'text-gray-300 cursor-not-allowed': isDateDisabled(date, true),
                'text-gray-900':
                  date && !isDateDisabled(date, true) && !isDateSelected(date),
              }"
            >
              <span v-if="date">{{ date.getDate() }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
