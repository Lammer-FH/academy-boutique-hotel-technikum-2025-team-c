<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import RegisterForm from "@/components/RegisterForm.vue";

const route = useRoute();
const next = computed(() => route.query?.next);
</script>

<template>
	<RegisterForm :next="next" />
</template>