<script setup>
import { computed, reactive } from "vue";
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();

const form = reactive({
	firstname: "",
	lastname: "",
	email: "",
	emailRepeat: "",
	username: "",
	password: "",
	passwordRepeat: "",
});

const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);
const registeredUser = computed(() => userStore.registeredUser);

const emailsMatch = computed(
	() => form.email && form.emailRepeat && form.email === form.emailRepeat
);

const passwordsMatch = computed(
	() =>
		form.password &&
		form.passwordRepeat &&
		form.password === form.passwordRepeat
);

const canSubmit = computed(() =>
	Boolean(
		form.firstname &&
			form.lastname &&
			form.email &&
			form.emailRepeat &&
			form.username &&
			form.password &&
			form.passwordRepeat &&
			emailsMatch.value &&
			passwordsMatch.value
	)
);

const submit = async () => {
	if (!canSubmit.value || loading.value) return;
	try {
		await userStore.register({ ...form });
	} catch {
		// error already stored
	}
};

const reset = () => {
	userStore.reset();
	form.firstname = "";
	form.lastname = "";
	form.email = "";
	form.emailRepeat = "";
	form.username = "";
	form.password = "";
	form.passwordRepeat = "";
};
</script>

<template>
	<div class="max-w-xl mx-auto px-4 py-10">
		<div class="bg-white rounded-2xl shadow-2xl p-6">
			<h1 class="text-2xl font-bold text-gray-900">Registrieren</h1>
			<p class="mt-2 text-gray-600">
				Bitte geben Sie Ihre Daten ein, um ein Konto zu erstellen.
			</p>

			<div
				v-if="registeredUser"
				class="mt-6 rounded-xl border-2 border-lime-200 bg-lime-50 p-4 text-lime-900"
				role="status"
			>
				<div class="font-semibold">Registrierung erfolgreich</div>
				<div class="text-sm mt-1">
					Ihr Konto wurde erstellt.
				</div>
				<button
					type="button"
					class="mt-4 inline-flex items-center justify-center rounded-lg bg-sky-700 text-white px-4 py-2 text-sm font-medium hover:bg-sky-800"
					@click="reset"
				>
					Neues Konto anlegen
				</button>
			</div>

			<form v-else class="mt-6 space-y-4" @submit.prevent="submit">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label class="block text-sm font-medium text-gray-700"
							>Vorname</label
						>
						<input
							v-model.trim="form.firstname"
							type="text"
							autocomplete="given-name"
							class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
							required
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700"
							>Nachname</label
						>
						<input
							v-model.trim="form.lastname"
							type="text"
							autocomplete="family-name"
							class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
							required
						/>
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700">E-Mail</label>
					<input
						v-model.trim="form.email"
						type="email"
						autocomplete="email"
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
						required
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700"
						>E-Mail wiederholen</label
					>
					<input
						v-model.trim="form.emailRepeat"
						type="email"
						autocomplete="email"
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
						required
					/>
					<div
						v-if="form.emailRepeat && !emailsMatch"
						class="mt-1 text-xs text-red-700"
					>
						Die E-Mail-Adressen stimmen nicht überein.
					</div>
				</div>

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
					<label class="block text-sm font-medium text-gray-700">Passwort</label>
					<input
						v-model="form.password"
						type="password"
						autocomplete="new-password"
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
						required
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700"
						>Passwort wiederholen</label
					>
					<input
						v-model="form.passwordRepeat"
						type="password"
						autocomplete="new-password"
						class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
						required
					/>
					<div
						v-if="form.passwordRepeat && !passwordsMatch"
						class="mt-1 text-xs text-red-700"
					>
						Die Passwörter stimmen nicht überein.
					</div>
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
					{{ loading ? "Wird registriert..." : "Registrieren" }}
				</button>
			</form>
		</div>
	</div>
</template>
