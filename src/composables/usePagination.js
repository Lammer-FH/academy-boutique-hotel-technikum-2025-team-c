import { ref, computed, watch } from "vue";

// usePagination(itemsRef, { pageSize?: number, initialPage?: number })
export function usePagination(itemsRef, options = {}) {
  const pageSize = ref(Number(options.pageSize ?? 5) || 5);
  const currentPage = ref(Number(options.initialPage ?? 1) || 1);

  const totalPages = computed(() => {
    const length = Array.isArray(itemsRef?.value) ? itemsRef.value.length : 0;
    return Math.max(1, Math.ceil(length / pageSize.value));
  });

  const paginatedItems = computed(() => {
    const items = Array.isArray(itemsRef?.value) ? itemsRef.value : [];
    const start = (currentPage.value - 1) * pageSize.value;
    return items.slice(start, start + pageSize.value);
  });

  function goToPage(n) {
    const p = Math.min(Math.max(1, Number(n) || 1), totalPages.value);
    currentPage.value = p;
  }

  function prevPage() {
    goToPage((Number(currentPage.value) || 1) - 1);
  }

  function nextPage() {
    goToPage((Number(currentPage.value) || 1) + 1);
  }

  // Clamp current page when total pages change (e.g., items updated)
  watch(totalPages, (tp) => {
    if (currentPage.value > tp) currentPage.value = tp;
    if (currentPage.value < 1) currentPage.value = 1;
  });

  return {
    // state
    pageSize,
    currentPage,
    // derived
    totalPages,
    paginatedItems,
    // actions
    goToPage,
    prevPage,
    nextPage,
  };
}
