<template>
  <div class="mx-auto">
    <div class="mx-auto w-min">
      <form
        class="items-center block space-y-2 sm:(flex space-y-0)"
        @submit.prevent="filterData"
      >
        <GridSearch :filter="nameFilter" v-model:value="nameFilter"></GridSearch>
        <div class="flex-grow" />
        <GridStatus :filter="statusFilter" v-model:value="statusFilter"></GridStatus>
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

// Retreives status or name from page URL
const computeStatusName = (key: 'status' | 'name'): string | undefined => {
  const charName = router.currentRoute.value.query[key];
  if (!charName) return undefined;
  return String(charName);
};

// Filters
const statusFilter = ref(computeStatusName('status') ?? '');
const nameFilter = ref(computeStatusName('name') ?? '');
const currentPage = ref(computePageNumber() ?? 1);

const characterList = computed(() => store.state.characterStore.characters);

const loadData = () => {
  const params: APIParams = {
    status: statusFilter.value,
    name: nameFilter.value,
    page: currentPage.value,
  };
  store.dispatch('fetchCharacters', params);
};
loadData();

// Update URL params and load new data
const navigate = (newPage: number) => {
  currentPage.value = newPage;
  goToPage(currentPage.value);
  loadData();
};

// On filter update, navigate page to the first page and load data
const filterData = () => {
  goToPage(1);
  loadData();
};

// Whenever we change the status
watch(statusFilter, () => {
  filterData();
});

// Navigate to given page number with current filters
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
</script>

<style scoped>
.navigation-chevron {
  @apply leading-none bg-white rounded-full bg-opacity-20 disabled:(bg-opacity-5 cursor-default) dark:(bg-black bg-opacity-20 hover:bg-opacity-40 disabled:bg-opacity-10);
}
</style>
