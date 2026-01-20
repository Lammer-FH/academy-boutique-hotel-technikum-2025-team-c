<script setup>
import { computed, onMounted } from "vue";
import { useRoomStore } from "../stores/RoomStore";

const roomStore = useRoomStore();

const props = defineProps({
	bookings: {
		type: Array,
		default: () => [],
	},
});

const normalizedBookings = computed(() =>
	Array.isArray(props.bookings) ? props.bookings : []
);

onMounted(() => {
	// Ensure we have room metadata available to display names.
	if (!roomStore.rooms?.length) roomStore.fetchRooms();
});

const roomsById = computed(() => {
	const map = new Map();
	for (const room of roomStore.rooms || []) {
		map.set(room.id, room);
	}
	return map;
});

const getRoomNameFromStore = (booking) => {
	if (!booking.roomId) return "—";
	return roomsById.value.get(booking.roomId)?.roomsName ?? "—";
};

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
</script>

<template>
	<section class="mt-8">
		<h2 class="text-lg font-bold text-gray-900 inline-flex items-center gap-2">
			<i class="bi bi-journal-check" aria-hidden="true"></i>
			<span>Meine Buchungen</span>
		</h2>

		<div
			v-if="!normalizedBookings.length"
			class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-700"
			role="status"
		>
			Keine Buchungen vorhanden.
		</div>

		<div v-else class="mt-4 grid grid-cols-1 gap-4">
			<div
				v-for="booking in normalizedBookings"
				:key="booking.id"
				class="rounded-xl border border-gray-200 bg-white p-4"
			>
				<div class="flex items-start justify-between gap-4">
					<div>
						<div class="text-sm font-semibold text-gray-900">
							{{ getRoomNameFromStore(booking) }}
						</div>
						<div class="mt-1 text-sm text-gray-700 inline-flex items-center gap-2">
							<i class="bi bi-calendar-event" aria-hidden="true"></i>
							<span>{{ formatDateAT(booking.startDate) }}</span>
							<span class="text-gray-400">→</span>
							<span>{{ formatDateAT(booking.endDate) }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
