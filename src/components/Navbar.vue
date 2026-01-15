<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/UserStore";

const open = ref(false);

const userStore = useUserStore();
const router = useRouter();
const accountLabel = computed(() => userStore.user?.username || "KONTO");
const isLoggedIn = computed(() => Boolean(userStore.token));

onMounted(async () => {
  if (userStore.token && !userStore.user) {
    try {
      await userStore.fetchCurrentUser();
    } catch {
      // error already stored; keep fallback label
    }
  }
});

const links = [
  { text: "ZIMMER", to: "/rooms", icon: "rooms" },
  { text: "ÜBER UNS", to: "/about", icon: "about" },
];

const logout = async () => {
  userStore.logout();
  open.value = false;
  await router.push({ name: "home" });
};
</script>

<template>
  <nav class="bg-white shadow">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center">
        <!-- Brand -->
        <div class="flex items-center shrink-0">
          <router-link
            to="/"
            class="flex items-center space-x-3 relative z-50 pointer-events-auto"
          >
            <img
              src="../assets/img/FH_Technikum_Wien_logo.png"
              alt="Logo"
              class="w-15 h-12"
              draggable="false"
            />
            <span class="text-xl font-thin text-gray-800 select-none"
              >BOUTIQUE-HOTEL</span
            >
          </router-link>
        </div>

        <!-- Desktop links -->
        <div
          class="hidden [@media(min-width:940px)]:flex [@media(min-width:940px)]:flex-1 [@media(min-width:940px)]:items-center [@media(min-width:940px)]:justify-center [@media(min-width:940px)]:space-x-8"
        >
          <router-link
            v-for="link in links"
            :key="link.text"
            :to="link.to"
            class="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-indigo-500"
          >
            <span>{{ link.text }}</span>
          </router-link>
        </div>

        <!-- Actions (desktop) -->
        <div
          class="hidden [@media(min-width:940px)]:flex [@media(min-width:940px)]:items-center [@media(min-width:940px)]:space-x-4 shrink-0"
        >
          <router-link
            to="/user"
            class="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
          >
            <i
              aria-hidden="true"
              :class="[
                isLoggedIn ? 'bi bi-person-fill' : 'bi bi-person',
                'text-lg leading-none',
              ]"
            ></i>
            <span>{{ accountLabel }}</span>
          </router-link>

      <button
        v-if="isLoggedIn"
        type="button"
        @click="logout"
        class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      >
        <svg
          aria-hidden="true"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
        </svg>
        <span>Logout</span>
      </button>

          <router-link
            to="/rooms"
            class="inline-flex items-center gap-2 px-4 py-2 bg-sky-700 text-white text-sm font-medium rounded-md hover:bg-sky-800"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" ry="2" />
              <path d="M8 3v4M16 3v4M3 11h18" />
            </svg>
            <span>BUCHEN</span>
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div
          class="mobile-menu-toggle [@media(min-width:940px)]:hidden ml-auto flex items-center gap-2"
        >
          <router-link
            v-if="!open"
            to="/user"
            aria-label="Konto"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <i
              aria-hidden="true"
              :class="[
                isLoggedIn ? 'bi bi-person-fill' : 'bi bi-person',
                'text-xl leading-none',
              ]"
            ></i>
          </router-link>

          <button
            @click="open = !open"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            :aria-expanded="open.toString()"
            aria-label="Toggle menu"
          >
            <svg
              v-if="!open"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="fade">
      <div
        v-show="open"
        class="[@media(min-width:940px)]:hidden border-t border-gray-200"
      >
        <div class="pt-2 pb-3 space-y-1 px-2">
          <router-link
            v-for="link in links"
            :key="link.text"
            :to="link.to"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            @click="open = false"
          >
            <svg
              v-if="link.icon === 'rooms'"
              aria-hidden="true"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 10l9-7 9 7" />
              <rect x="5" y="10" width="14" height="10" rx="1.5" ry="1.5" />
            </svg>
            <svg
              v-else-if="link.icon === 'about'"
              aria-hidden="true"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10v6" />
              <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span>{{ link.text }}</span>
          </router-link>
        </div>

        <div class="pt-4 pb-4 px-4 border-t border-gray-100">
          <router-link
            to="/user"
            class="flex items-center gap-2 text-base font-medium text-gray-700 hover:text-gray-900"
            @click="open = false"
          >
            <i
              aria-hidden="true"
              :class="[
                isLoggedIn ? 'bi bi-person-fill' : 'bi bi-person',
                'text-lg leading-none',
              ]"
            ></i>
            <span>{{ accountLabel }}</span>
          </router-link>

      <button
        v-if="isLoggedIn"
        type="button"
        class="mt-3 inline-flex items-center gap-2 w-full justify-center px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-50"
        @click="logout"
      >
        <svg
          aria-hidden="true"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
        </svg>
        <span>Logout</span>
      </button>
        </div>
        <div class="pt-4 pb-4 px-4 border-t border-gray-100">
          <router-link
            to="/rooms"
            class="mt-3 inline-flex items-center gap-2 w-full justify-center px-4 py-2 bg-sky-700 text-white font-medium rounded-md hover:bg-sky-800"
            @click="open = false"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" ry="2" />
              <path d="M8 3v4M16 3v4M3 11h18" />
            </svg>
            <span>BUCHEN</span>
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
@media print {
  .mobile-menu-toggle {
    display: none !important;
  }
}
</style>
