<script setup>
const stand = new Date().toLocaleDateString("de-AT", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
</script>

<template>
  <main class="min-h-screen bg-white">
    <section class="bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-3xl font-extrabold text-gray-900">Impressum</h1>
        <p class="mt-2 text-gray-600">
          Rechtliche Informationen gemäß § 5 ECG und § 14 UGB
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Betreiber -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900">
            Medieninhaber & Betreiber
          </h2>
          <div class="mt-3 text-gray-700">
            <p class="font-medium">Boutique Hotel Technikum Wien GmbH</p>
            <p>Höchstädtplatz 6</p>
            <p>1200 Wien, Österreich</p>
            <p class="mt-2">
              Telefon:
              <a href="tel:+43123456789" class="text-sky-700 hover:underline"
                >+43 1 234 56 789</a
              >
            </p>
            <p>
              E-Mail:
              <a
                href="mailto:info@boutique-hotel.example"
                class="text-sky-700 hover:underline"
                >info@boutique-hotel.example</a
              >
            </p>
          </div>
        </div>

        <!-- Unternehmensdaten -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Unternehmensdaten</h2>
          <dl class="mt-3 text-gray-700 space-y-1">
            <div class="flex gap-2">
              <dt class="w-48 text-gray-500">Unternehmensgegenstand</dt>
              <dd>Hotellerie</dd>
            </div>
            <div class="flex gap-2">
              <dt class="w-48 text-gray-500">UID-Nummer</dt>
              <dd>ATU12345678</dd>
            </div>
            <div class="flex gap-2">
              <dt class="w-48 text-gray-500">Firmenbuchnummer</dt>
              <dd>FN 123456 a</dd>
            </div>
            <div class="flex gap-2">
              <dt class="w-48 text-gray-500">Firmenbuchgericht</dt>
              <dd>Handelsgericht Wien</dd>
            </div>
            <div class="flex gap-2">
              <dt class="w-48 text-gray-500">Sitz</dt>
              <dd>Wien</dd>
            </div>
            <div class="flex gap-2">
              <dt class="w-48 text-gray-500">Mitgliedschaften</dt>
              <dd>Wirtschaftskammer Wien</dd>
            </div>
            <div class="flex gap-2">
              <dt class="w-48 text-gray-500">Aufsichtsbehörde</dt>
              <dd>Magistratisches Bezirksamt der Stadt Wien</dd>
            </div>
            <div class="flex gap-2">
              <dt class="w-48 text-gray-500">Vertretungsbefugte Personen</dt>
              <dd>Geschäftsführung: Franz Daniel Valsky, Christian Bieler</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Haftungsausschluss -->
        <div class="lg:col-span-2">
          <h2 class="text-xl font-semibold text-gray-900">
            Haftungsausschluss
          </h2>
          <p class="mt-3 text-gray-700">
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
            Haftung für die Richtigkeit, Vollständigkeit und Aktualität der
            Inhalte. Für den Inhalt verlinkter Seiten sind ausschließlich deren
            Betreiber verantwortlich.
          </p>

          <h3 class="mt-6 font-semibold text-gray-900">Urheberrecht</h3>
          <p class="mt-2 text-gray-700">
            Inhalte, Bilder und Layout dieser Website sind urheberrechtlich
            geschützt. Jede Nutzung außerhalb der gesetzlich zulässigen Grenzen
            bedarf der vorherigen schriftlichen Zustimmung.
          </p>

          <h3 class="mt-6 font-semibold text-gray-900">Bildnachweise</h3>
          <p class="mt-2 text-gray-700">
            Eigene Bilder sowie lizenzfreie Bilder (z. B. Unsplash, Pexels).
            Sofern nicht anders angegeben, liegen alle Rechte beim Betreiber.
          </p>
        </div>

        <!-- Streitbeilegung / Kontakt -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Streitbeilegung</h2>
          <p class="mt-3 text-gray-700">
            Verbraucher haben die Möglichkeit, Beschwerden an die
            Online-Streitbeilegungsplattform der EU zu richten:
            <a
              href="https://ec.europa.eu/odr"
              target="_blank"
              rel="noopener"
              class="text-sky-700 hover:underline"
              >ec.europa.eu/odr</a
            >.
          </p>

          <h2 class="mt-6 text-xl font-semibold text-gray-900">
            Verantwortlich für den Inhalt
          </h2>
          <p class="mt-3 text-gray-700">
            Boutique Hotel Technikum GmbH, Geschäftsführung: Franz Daniel
            Valsky, Christian Bieler
          </p>

          <h2 class="mt-6 text-xl font-semibold text-gray-900">Datenschutz</h2>
          <p class="mt-3 text-gray-700">
            Wir behandeln Ihre Daten vertraulich und entsprechend der
            gesetzlichen Vorschriften. Details entnehmen Sie bitte unseren
            Datenschutzhinweisen.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <p class="text-sm text-gray-500">Stand: {{ stand }}</p>
    </section>
  </main>
</template>
