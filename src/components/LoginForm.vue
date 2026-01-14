<script setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import { useBookingStore } from "@/stores/BookingStore";

const props = defineProps({
	next: {
		type: [String, null],
		default: null,
	},
});

const emit = defineEmits(["goRegister"]);

const router = useRouter();
const userStore = useUserStore();
const bookingStore = useBookingStore();

const form = reactive({
	username: "",
	password: "",
});

const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);

const canSubmit = computed(() => Boolean(form.username && form.password));
const shouldRedirectToBooking = computed(() => props.next === "booking");

const submit = async () => {
	if (!canSubmit.value || loading.value) return;
	try {
		await userStore.login({
			clientId: form.username,
			secret: form.password,
		});

		if (shouldRedirectToBooking.value) {
			bookingStore.setBookingStep("form");
			router.push({ name: "booking" });
		}
	} catch {
		// error already stored
	}
};

const goRegister = () => emit("goRegister");
</script>

<template>
	<div class="max-w-xl mx-auto px-4 py-10">
		<div class="bg-white rounded-2xl shadow-2xl p-6">
			<h1 class="text-2xl font-bold text-gray-900">Login</h1>
			<p class="mt-2 text-gray-600">
				Bitte geben Sie Ihre Zugangsdaten ein.
			</p>

			<form class="mt-6 space-y-4" @submit.prevent="submit">
				<div>
					<label class="block text-sm font-medium text-gray-700"
						>Benutzername</label
					>
					<input
						v-model.trim="form.username"
						type="text"
						autocomplete="username"
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
						required
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700"
						>Passwort</label
					>
					<input
						v-model="form.password"
						type="password"
						autocomplete="current-password"
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
						required
					/>
				</div>

				<div
					v-if="error"
					class="rounded-lg border border-red-200 bg-red-50 p-3 text-red-800"
					role="alert"
				>
					{{ error }}
				</div>

				<button
					type="submit"
					:disabled="loading || !canSubmit"
					class="w-full inline-flex items-center justify-center rounded-lg bg-sky-700 text-white px-4 py-3 text-sm font-semibold hover:bg-sky-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					{{ loading ? "Wird angemeldet..." : "Anmelden" }}
				</button>

				<div class="pt-2 text-center text-sm text-gray-600">
					<span>Noch kein Konto?</span>
					<button
						type="button"
						class="ml-1 font-semibold text-sky-700 hover:text-sky-800"
						@click="goRegister"
					>
						Registrieren
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
