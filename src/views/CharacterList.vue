<template>
  <div class="mx-auto">
    <form class="m-20" @submit.prevent="filterData">
      <input v-model="nameFilter" type="text" class="text-black" />

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
      v-if="characterList.length > 0"
      class="grid grid-cols-2 gap-8 mx-auto w-max place-items-stretch sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
    >
      <CharacterCard
        :id="c.id"
        :name="c.name"
        :status="c.status"
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
import { useStore } from 'vuex';
import { APIParams } from '../types/interfaces';

const store = useStore();

const statusFilter = ref("");
const nameFilter = ref("");

const characterList = computed(() => store.state.characterStore.characters)

const loadData = () => {
  const params: APIParams = { status: statusFilter.value, name: nameFilter.value }
  store.dispatch('fetchCharacters', params)
}

loadData();

watch(statusFilter, () => {
  loadData();
})

const filterData = () => {
  loadData();
}

</script>