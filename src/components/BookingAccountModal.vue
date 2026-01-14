<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close", "selectGuestType"]);

const handleGuestType = (type) => {
	emit("selectGuestType", type);
	emit("close");
};

const handleClose = () => {
	emit("close");
};
</script>

<template>
	<!-- Modal Overlay -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
		@click.self="handleClose"
	>
		<!-- Modal Content -->
		<div
			class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
			@click.stop
		>
			<!-- Close Button -->
			<button
				type="button"
				@click="handleClose"
				class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
				aria-label="Schließen"
			>
				<i class="bi bi-x-lg text-2xl"></i>
			</button>

			<!-- Modal Header -->
			<div class="bg-sky-700 text-white px-6 py-8 text-center">
				<i class="bi bi-calendar-check text-5xl mb-3"></i>
				<h2 class="text-2xl font-bold">Buchung starten</h2>
				<p class="mt-2 text-sky-100 text-sm">
					Wie möchten Sie fortfahren?
				</p>
			</div>

			<!-- Modal Body -->
			<div class="p-6 space-y-4">
				<!-- Registered User Option -->
				<button
					type="button"
					@click="handleGuestType('registered')"
					class="w-full group relative overflow-hidden rounded-xl border-2 border-sky-200 bg-sky-50 hover:bg-sky-100 hover:border-sky-400 transition-all duration-300 p-6 text-left"
				>
					<div class="flex items-start gap-4">
						<div
							class="flex-shrink-0 w-12 h-12 rounded-full bg-sky-700 flex items-center justify-center text-white group-hover:scale-110 transition-transform"
						>
							<i class="bi bi-person-check-fill text-xl"></i>
						</div>
						<div class="flex-1">
							<h3 class="text-lg font-bold text-gray-900 mb-1">
								Als registrierter Benutzer
							</h3>
							<p class="text-sm text-gray-600">
								Nutzen Sie Ihr Konto für eine schnellere Buchung
							</p>
						</div>
						<div
							class="flex-shrink-0 text-sky-700 group-hover:translate-x-1 transition-transform"
						>
							<i class="bi bi-chevron-right text-xl"></i>
						</div>
					</div>
				</button>

				<!-- Guest User Option -->
				<button
					type="button"
					@click="handleGuestType('guest')"
					class="w-full group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 p-6 text-left"
				>
					<div class="flex items-start gap-4">
						<div
							class="flex-shrink-0 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white group-hover:scale-110 transition-transform"
						>
							<i class="bi bi-person-fill text-xl"></i>
						</div>
						<div class="flex-1">
							<h3 class="text-lg font-bold text-gray-900 mb-1">
								Als Gast fortfahren
							</h3>
							<p class="text-sm text-gray-600">
								Buchen Sie ohne Konto - keine Registrierung erforderlich
							</p>
						</div>
						<div
							class="flex-shrink-0 text-gray-700 group-hover:translate-x-1 transition-transform"
						>
							<i class="bi bi-chevron-right text-xl"></i>
						</div>
					</div>
				</button>
			</div>
		</div>
	</div>
</template>
