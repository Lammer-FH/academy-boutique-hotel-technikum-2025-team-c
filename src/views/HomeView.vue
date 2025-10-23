<script setup></script>

<template>
  <main class="min-h-screen bg-white">
    <!-- Hero -->
    <section class="relative bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-20">
          <div>
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Willkommen im Boutique Hotel Technikum
            </h1>
            <p class="mt-6 text-lg text-gray-600 max-w-prose">
              Entdecken Sie eine ruhige Oase im Herzen der Stadt. Unser
              Boutique-Hotel verbindet historischen Charme mit modernem Komfort
              — perfekt für Erholung, Arbeit und besondere Anlässe.
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <router-link
                to="/rooms"
                class="inline-flex items-center gap-2 px-5 py-3 bg-sky-700 text-white rounded-md hover:bg-sky-800"
              >
                Zimmer ansehen
              </router-link>

              <router-link
                to="/book"
                class="inline-flex items-center gap-2 px-5 py-3 border border-sky-700 text-sky-700 rounded-md hover:bg-sky-50"
              >
                Jetzt buchen
              </router-link>
            </div>
          </div>

          <div class="rounded-lg overflow-hidden shadow-lg">
            <img
              src="../assets/img/boutique-technikum-hotel-room-1.png"
              alt="Boutique Hotel Room"
              class="w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-2xl font-bold text-gray-900">Unsere Highlights</h2>
      <p class="mt-2 text-gray-600 max-w-prose">
        Kleine Details machen den Unterschied. Genießen Sie persönliche
        Betreuung, handverlesene Ausstattung und regionale Spezialitäten.
      </p>

      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="p-6 border rounded-lg">
          <h3 class="text-lg font-semibold">Gemütliche Zimmer</h3>
          <p class="mt-2 text-gray-600 text-sm">
            Komfortable Betten, ruhig gelegene Zimmer und moderne Bäder — ideal
            zum Entspannen.
          </p>
        </div>

        <div class="p-6 border rounded-lg">
          <h3 class="text-lg font-semibold">Zentrale Lage</h3>
          <p class="mt-2 text-gray-600 text-sm">
            Wenige Schritte zu Kultur, Gastronomie und öffentlichen
            Verkehrsmitteln.
          </p>
        </div>

        <div class="p-6 border rounded-lg">
          <h3 class="text-lg font-semibold">Frühstück & Service</h3>
          <p class="mt-2 text-gray-600 text-sm">
            Jeden Morgen frische regionale Produkte und ein aufmerksames Team.
          </p>
        </div>
      </div>
    </section>

    <!-- About / Example text -->
    <section class="bg-gray-50 py-12">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900">Ein Ort mit Geschichte</h2>
        <p class="mt-4 text-gray-600">
          Das Boutique Hotel Technikum befindet sich im Herzen von
          Wien-Brigittenau. Wir legen Wert auf nachhaltige Materialien und
          regionalen Service, damit Ihr Aufenthalt sowohl angenehm als auch
          verantwortungsvoll ist.
        </p>

        <p class="mt-4 text-gray-600">
          Beispieltext: Unsere Gäste schätzen besonders die ruhige Atmosphäre
          und die Nähe zu den wichtigsten Sehenswürdigkeiten. Ob Geschäftsreise
          oder Wochenendtrip — bei uns finden Sie Ruhe, Komfort und eine
          herzliche Gastfreundschaft.
        </p>
      </div>
    </section>
  </main>
</template>
