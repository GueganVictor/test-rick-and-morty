<template>
  <div class="mx-auto">
    <div class="mx-auto w-min">
      <form
        class="items-center block space-y-2 sm:(flex space-y-0)"
        @submit.prevent="filterData"
      >
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
      @navigate="navigate($event)"
    ></GridNavigation>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { LocationQueryRaw, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { APIParams } from '../types/interfaces';

const store = useStore();
const router = useRouter();

// Retreives page number from page URL, if it isn't a number, send back to the first page
const computePageNumber = (): number | undefined => {
  const pageNb = Number(router.currentRoute.value.query.page);
  if (!pageNb) return undefined;
  if (isNaN(pageNb)) {
    goToPage(1);
    return 1;
  }
  return pageNb;
};

// Filters
const statusFilter = ref('');
const nameFilter = ref('');
const currentPage = ref();

const characterList = computed(() => store.state.characterStore.characters);

const loadData = (params: APIParams) => {
  store.dispatch('fetchCharacters', params);
};

const filterData = () => {
  goToPage(1);
};

// Update URL params
const navigate = (newPage: number) => {
  currentPage.value = newPage;
  goToPage(currentPage.value);
};

// When status is updated, go back to first page
const updateStatus = (event: string) => {
  goToPage(1);
};

// Update the URL to match the filters
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

// Everytime the URL is changed, we update the data
watch(
  () => router.currentRoute.value.query,
  (params: APIParams) => {
    statusFilter.value = params.status ?? '';
    nameFilter.value = params.name ?? '';
    currentPage.value = computePageNumber();
    loadData(params);
  },
  { immediate: true }
);
</script>

<style scoped>
.navigation-chevron {
  @apply leading-none bg-white rounded-full bg-opacity-20 disabled:(bg-opacity-5 cursor-default) dark:(bg-black bg-opacity-20 hover:bg-opacity-40 disabled:bg-opacity-10);
}
</style>
