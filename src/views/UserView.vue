<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import BookedRooms from "@/components/BookedRooms.vue";
import { useUserStore } from "@/stores/UserStore";

const route = useRoute();
const next = computed(() => route.query?.next);

const userStore = useUserStore();
const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);
const token = computed(() => userStore.token);
const user = computed(() => userStore.user);

const showRegister = ref(false);

onMounted(async () => {
	if (token.value && !user.value) {
			await userStore.fetchCurrentUser();
	}
});
</script>

<template>
	<div v-if="token && user" class="max-w-3xl mx-auto px-4 py-10">
		<div class="bg-white rounded-2xl shadow-2xl p-6">
			<h1 class="text-2xl font-bold text-gray-900 inline-flex items-center gap-2 text-sky-700">
				<i class="bi bi-person-circle text-2xl text-sky-700" aria-hidden="true"></i>
				<span>Mein Konto</span>
			</h1>

			<div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
				<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
					<div class="text-xs text-gray-500">Benutzername</div>
					<div class="mt-1 font-semibold text-gray-900">{{ user.username }}</div>
				</div>
				<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
					<div class="text-xs text-gray-500">E-Mail</div>
					<div class="mt-1 font-semibold text-gray-900">{{ user.email }}</div>
				</div>
				<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
					<div class="text-xs text-gray-500">Vorname</div>
					<div class="mt-1 font-semibold text-gray-900">{{ user.firstname }}</div>
				</div>
				<div class="rounded-xl border border-gray-200 bg-gray-50 p-4">
					<div class="text-xs text-gray-500">Nachname</div>
					<div class="mt-1 font-semibold text-gray-900">{{ user.lastname }}</div>
				</div>
			</div>

			<BookedRooms :bookings="user.bookings" />
		</div>
	</div>

	<div v-else>
		<div v-if="error" class="max-w-xl mx-auto px-4 pt-6">
			<div
				class="rounded-lg border border-red-200 bg-red-50 p-3 text-red-800"
				role="alert"
			>
				{{ error }}
			</div>
		</div>
		<LoginForm v-if="!showRegister" :next="next" @goRegister="showRegister = true" />
		<RegisterForm v-else :next="next" />
		<div v-if="loading" class="max-w-xl mx-auto px-4 pb-6">
			<div class="flex items-center justify-center" role="status" aria-label="Laden">
				<div
					class="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-sky-700"
				></div>
				<span class="sr-only">Lade...</span>
			</div>
		</div>
	</div>
</template>