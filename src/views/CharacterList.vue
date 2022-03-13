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
      <div
        v-if="characterList.length > 0"
        class="grid grid-cols-2 gap-8 mx-auto mt-4 w-max place-items-stretch sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
      >
        <CharacterCard
          :id="c.id"
          :name="c.name"
          :status="c.status.toLowerCase()"
          :imageURL="c.image"
          v-for="c in characterList"
          :key="c.id"
        ></CharacterCard>
      </div>
      <div class="mx-auto min-w-75vw" v-else>{{ $t('no-result') }}</div>
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

const computePageNumber = (): number | undefined => {
  const pageNb = Number(router.currentRoute.value.query.page);
  if (!pageNb) return undefined;
  if (isNaN(pageNb)) {
    goToPage(1);
    return 1;
  }
  return pageNb;
};

const computeStatusName = (key: 'status' | 'name'): string | undefined => {
  const charName = router.currentRoute.value.query[key];
  if (!charName) return undefined;
  return String(charName);
};

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

const navigate = (newPage: number) => {
  currentPage.value = newPage;
  goToPage(currentPage.value);
  loadData();
};

const filterData = () => {
  goToPage(1);
  loadData();
};

watch(statusFilter, () => {
  filterData();
});

const goToPage = (pageNb: number) => {
  currentPage.value = pageNb;
  let params: APIParams = {};
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
