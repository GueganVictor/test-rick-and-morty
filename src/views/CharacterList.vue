<template>
  <div class="mx-auto">
    <form class="m-20" @submit.prevent="filterData">
      <input v-model="nameFilter" type="text" class="text-black" />
      <button type="submit">{{ $t('search') }}</button>

      <fieldset>
        <input id="radio_none" v-model="statusFilter" type="radio" name="status" v-bind:value="''" />
        <label for="none">{{ $t('none') }}</label>
        <input id="radio_alive" v-model="statusFilter" type="radio" name="status" value="alive" />
        <label for="alive">{{ $t('alive') }}</label>
        <input id="radio_dead" v-model="statusFilter" type="radio" name="status" value="dead" />
        <label for="dead">{{ $t('dead') }}</label>
        <input id="radio_unknown" v-model="statusFilter" type="radio" name="status" value="unknown" />
        <label for="unknown">{{ $t('unknown') }}</label>
      </fieldset>
    </form>
    <div
      v-if="store.state.characterStore.info.pages > 1"
      class="flex items-center text-2xl space-x-2"
    >
      <div class="flex items-center space-x-2">
        <button class="bg-white bg-opacity-10 rounded-full" @click="navigate(-1)">
          <icon-mdi-chevron-left />
        </button>
      </div>
      <span>{{ currentPage }}</span>
      <div class="flex items-center space-x-2">
        <span>&nbsp;/ {{ store.state.characterStore.info.pages }}</span>
        <button class="bg-white bg-opacity-10 rounded-full" @click="navigate(1)">
          <icon-mdi-chevron-right />
        </button>
      </div>
    </div>
    <div
      v-if="characterList.length > 0"
      class="grid grid-cols-2 gap-8 mx-auto w-max place-items-stretch sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
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
    <div v-else>{{ $t('no-result') }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { LocationQueryValue, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { APIParams } from '../types/interfaces';

const store = useStore();
const router = useRouter();

const computePageNumber = () => {
  const pageNb = Number(router.currentRoute.value.query.page);
  if (!pageNb) return null;
  if (isNaN(pageNb)) {
    goToPage(1);
    return 1;
  }
  return pageNb;
};

const computePageStatusName = (queryParam: LocationQueryValue | LocationQueryValue[]): string | undefined => {
  console.log(queryParam)
  if (!queryParam) {
    return undefined;
  }
  return String(queryParam);
}

const statusFilter = ref(computePageStatusName(router.currentRoute.value.query.status) ?? '');
const nameFilter = ref(computePageStatusName(router.currentRoute.value.query.name) ?? '');
const currentPage = ref(computePageNumber() ?? 1);

const characterList = computed(() => store.state.characterStore.characters);

const loadData = () => {
  const params: APIParams = {
    status: statusFilter.value,
    name: nameFilter.value,
    page: currentPage.value,
  };
  console.log(params);
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
    query: Object.assign({ ...router.currentRoute.value.query }, params),
  });
};
</script>
