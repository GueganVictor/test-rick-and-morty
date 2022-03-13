<template>
  <div class="mx-auto">
    <div class="mx-auto w-min">
      <form
        class="items-center block space-y-2 sm:(flex space-y-0)"
        @submit.prevent="filterData"
      >
        <GridSearch :current-filter="nameFilter" v-model:value="nameFilter"></GridSearch>
        <div class="flex-grow" />
        <fieldset class="flex space-x-4">
          <div class="flex items-center space-x-0.5">
            <input
              id="radio_alive"
              type="checkbox"
              class="w-5 h-5 accent-rick-green dark:outline-black"
              v-model="statusCheckBoxes.alive"
              @change="check('alive')"
            />
            <label for="alive">{{ $t('alive') }}</label>
          </div>
          <div class="flex items-center space-x-0.5">
            <input
              id="radio_dead"
              type="checkbox"
              class="w-5 h-5 accent-rick-green dark:outline-black"
              v-model="statusCheckBoxes.dead"
              @change="check('dead')"
            />
            <label for="dead">{{ $t('dead') }}</label>
          </div>
          <div class="flex items-center space-x-0.5">
            <input
              id="radio_unknown"
              type="checkbox"
              class="w-5 h-5 accent-rick-green dark:outline-black"
              v-model="statusCheckBoxes.unknown"
              @change="check('unknown')"
            />
            <label for="unknown">{{ $t('unknown') }}</label>
          </div>
        </fieldset>
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

const statusCheckBoxes = ref({
  dead: ref(false),
  alive: ref(false),
  unknown: ref(false),
});

const computePageNumber = (): number | undefined => {
  const pageNb = Number(router.currentRoute.value.query.page);
  if (!pageNb) return undefined;
  if (isNaN(pageNb)) {
    goToPage(1);
    return 1;
  }
  return pageNb;
};

const computePageName = (): string | undefined => {
  const charName = router.currentRoute.value.query.name;
  if (!charName) return undefined;
  return String(charName);
};

const computePageStatus = (): string | undefined => {
  const charStatus = router.currentRoute.value.query.status;
  if (!charStatus) return undefined;
  const stringParam = String(charStatus) as 'dead' | 'alive' | 'unknown';
  statusCheckBoxes.value[stringParam] = true;
  return stringParam;
};

const statusFilter = ref(computePageStatus() ?? '');
const nameFilter = ref(computePageName() ?? '');
const currentPage = ref(computePageNumber() ?? 1);

const check = (status: 'dead' | 'alive' | 'unknown') => {
  let oneChecked = false;
  Object.keys(statusCheckBoxes.value).forEach((key) => {
    const k = key as 'dead' | 'alive' | 'unknown';
    const v = !statusCheckBoxes.value[k];
    statusCheckBoxes.value[k] = v ? !v : key === status;
    oneChecked = statusCheckBoxes.value[k] || oneChecked;
    if (statusCheckBoxes.value[k]) statusFilter.value = key;
  });
  if (!oneChecked) statusFilter.value = '';
};

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
