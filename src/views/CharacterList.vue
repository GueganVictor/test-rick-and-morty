<template>
  <div class="mx-auto">
    <div class="mx-auto w-min">
      <form class="flex items-center" @submit.prevent="filterData">
        <div class="flex items-center space-x-2">
          <div class="flex items-center overflow-hidden rounded">
            <input
              v-model="nameFilter"
              class="relative flex-auto block w-full h-10 min-w-0 px-3 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
              type="text"
            />
            <button
              class="flex items-center inline-block h-10 px-6 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out bg-green-600 shadow-md btn hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
              type="submit"
            >
              {{ $t('search') }}
            </button>
          </div>
          <p
            v-if="(router.currentRoute.value.query.name ?? '') !== nameFilter"
            class="text-sm text-green-600"
          >
            {{ $t('refresh-alert') }}
          </p>
        </div>
        <div class="flex-grow" />
        <fieldset class="flex space-x-4">
          <div class="flex items-center space-x-0.5">
            <input
              id="radio_alive"
              type="checkbox"
              class="w-5 h-5 accent-green-600 form-checkbox"
              v-model="statusCheckBoxes.alive"
              @change="check('alive')"
            />
            <label for="alive">{{ $t('alive') }}</label>
          </div>
          <div class="flex items-center space-x-0.5">
            <input
              id="radio_dead"
              type="checkbox"
              class="w-5 h-5 accent-green-600 form-checkbox"
              v-model="statusCheckBoxes.dead"
              @change="check('dead')"
            />
            <label for="dead">{{ $t('dead') }}</label>
          </div>
          <div class="flex items-center space-x-0.5">
            <input
              id="radio_unknown"
              type="checkbox"
              class="w-5 h-5 accent-green-600 form-checkbox"
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
    <div
      v-if="store.state.characterStore.info.pages > 1"
      class="flex items-center justify-center my-8 space-x-2 text-2xl"
    >
      <div class="flex items-center space-x-2">
        <button class="bg-white rounded-full bg-opacity-10" @click="navigate(-1)">
          <icon-mdi-chevron-left />
        </button>
      </div>
      <span>{{ currentPage }}</span>
      <div class="flex items-center space-x-2">
        <span>&nbsp;/ {{ store.state.characterStore.info.pages }}</span>
        <button class="bg-white rounded-full bg-opacity-10" @click="navigate(1)">
          <icon-mdi-chevron-right />
        </button>
      </div>
    </div>
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

const navigate = (pageOffset: number) => {
  const newPageIndex = currentPage.value + pageOffset;
  if (newPageIndex < 1 || newPageIndex > store.state.characterStore.info.pages) return;
  currentPage.value = newPageIndex;
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
