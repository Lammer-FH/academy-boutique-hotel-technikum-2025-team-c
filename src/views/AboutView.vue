<template>
  <main class="min-h-screen bg-white">
    <!-- Hero -->
    <section class="bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-3xl font-extrabold text-gray-900">Über uns</h1>
        <p class="mt-4 text-gray-600 max-w-2xl">
          Das Boutique Hotel Technikum verbindet traditionellen Charme mit
          modernem Komfort. Lernen Sie unser Haus, unser Team und unsere Werte
          kennen.
        </p>
      </div>
    </section>

    <!-- History -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-2xl font-bold text-gray-900">Unsere Geschichte</h2>
      <p class="mt-4 text-gray-600">
        Ursprünglich als Hochschule errichtet, wurde es in ein Boutique-Hotel
        umgewandelt, wobei historische Details wie Stuck und Holzarbeiten
        erhalten wurden.
      </p>

      <div class="mt-6 rounded-lg overflow-hidden shadow-lg">
        <img
          src="../assets/img/technikum-wien-building.png"
          alt="Boutique Hotel Room"
          class="w-full h-80 object-cover"
        />
      </div>

      <p class="mt-8 text-gray-600">
        Seit der Eröffnung legen wir besonderen Wert auf nachhaltige Praktiken,
        regionale Partnerschaften und individuelle Gastfreundschaft.
      </p>
    </section>

    <!-- Team -->
    <section class="bg-gray-50 py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900">Unser Team</h2>
        <p class="mt-2 text-gray-600 max-w-prose">
          Ein kleines, engagiertes Team sorgt dafür, dass Ihr Aufenthalt
          reibungslos und angenehm verläuft.
        </p>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="p-4 bg-white border rounded-lg text-center">
            <h3 class="mt-4 font-semibold">Franz Daniel Valsky</h3>
            <p class="text-sm text-gray-500">Hoteldirektion</p>
          </div>

          <div class="p-4 bg-white border rounded-lg text-center">
            <h3 class="mt-4 font-semibold">Christian Bieler</h3>
            <p class="text-sm text-gray-500">Hoteldirektion</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Amenities -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-2xl font-bold text-gray-900">Ausstattung</h2>
      <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
        <li>Frühstück mit regionalen Produkten</li>
        <li>Kostenloses WLAN</li>
        <li>24/7 Rezeption</li>
        <li>Konferenz- und Veranstaltungsräume</li>
      </ul>
    </section>

    <!-- Contact CTA -->
    <section class="bg-sky-700 py-12">
      <div
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-white text-center"
      >
        <h2 class="text-2xl font-bold">Kontakt & Buchung</h2>
        <p class="mt-2">
          Haben Sie Fragen? Fragen Sie uns nicht. Einfach buchen.
        </p>
        <div class="mt-6 flex justify-center gap-4">
          <router-link
            to="/book"
            class="px-4 py-2 bg-white text-sky-700 rounded-md"
            >Buchen</router-link
          >
        </div>
      </div>
    </section>
  </main>
</template>

<style></style>
