<template>
  <div class="mx-auto">
    <div class="mx-auto w-min">
      <form
        class="relative items-center block space-y-2 sm:(flex space-y-0)"
        @keydown.enter.prevent="goToPage(1)"
        @submit.prevent="goToPage(1)"
      >
        <button
          v-if="isFiltering()"
          class="absolute flex items-center left-0 -top-7"
          @click="resetFilter"
        >
          <icon-mdi-close class="text-sm" />Reset filters
        </button>
        <GridSearch :filter="nameFilter" v-model:value="nameFilter"></GridSearch>
        <div class="flex-grow" />
        <GridStatus
          :filter="statusFilter"
          v-model:value="statusFilter"
          @update-status="updateStatus($event)"
        ></GridStatus>
      </form>
      <GridCharacterList :characters="characterList"></GridCharacterList>
    </div>
    <GridNavigation
      :current-page="currentPage"
      @navigate="goToPage($event)"
    ></GridNavigation>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { LocationQueryRaw, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { APIParams } from '../types/interfaces';

// Vue Modules
const store = useStore();
const router = useRouter();

// Data
const characterList = computed(() => store.state.characterStore.characters);

// Filters
const statusFilter = ref('');
const nameFilter = ref('');
const currentPage = ref(1);

/**
 * Retreives page number from page URL, if it isn't a number, send back to the first page
 * @returns The new page number or undefined
 */
const computePageNumber = (): number | undefined => {
  const pageNb = Number(router.currentRoute.value.query.page);
  if (!pageNb) return undefined;
  if (isNaN(pageNb)) {
    goToPage(1);
    return 1;
  }
  return pageNb;
};

/**
 * Makes and API call and fetches data to the store
 * @param params Query parameters (name, status and page number)
 */
const loadData = (params: APIParams) => {
  store.dispatch('fetchCharacters', params);
};

/**
 * Handler for status update from the StatusComponent
 * Sets the status and navigate to first page
 * @param event New status to be set
 */
const updateStatus = (event: string) => {
  statusFilter.value = event;
  goToPage(1);
};

/**
 * Is the list being filtered by the character's status or name
 * @returns filtering status
 */
const isFiltering = () => {
  return statusFilter.value !== '' || nameFilter.value !== '';
};

/**
 * Resets the name and status filter
 * Then navigate to the first page
 */
const resetFilter = () => {
  statusFilter.value = 'reset';
  nameFilter.value = '';
  goToPage(1);
};

/**
 * Updates the URL parameters to match the filters
 * @param pageNb New page number
 */
const goToPage = (pageNb: number) => {
  currentPage.value = pageNb;
  let params: APIParams = {};
  // Check values in order to avoid blank values in query params
  if (nameFilter.value) params.name = nameFilter.value;
  if (statusFilter.value) params.status = statusFilter.value;
  if (currentPage.value) params.page = currentPage.value;
  router.push({
    path: '/characters',
    query: params as LocationQueryRaw,
  });
};

/**
 * Update filter values to match URL parameters
 * @param params Query parameters (name, status and page number)
 */
const updateFilterValues = (params: APIParams) => {
  statusFilter.value = params.status ?? '';
  nameFilter.value = params.name ?? '';
  currentPage.value = computePageNumber() ?? 1;
  loadData(params);
};

// Everytime the URL is changed, we update the data
// Watcher is called on page laod in order to retreive
// filter values from URL parameters
watch(() => router.currentRoute.value.query, updateFilterValues, {
  immediate: true,
});
</script>
