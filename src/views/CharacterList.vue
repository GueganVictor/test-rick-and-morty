<template>
  <div class="mx-auto">
    <form class="m-20" @submit.prevent="filterData">
      <input v-model="nameFilter" type="text" class="text-black" />
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
    <div v-else>No result</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { APIParams } from '../types/interfaces';

const store = useStore();

const characterList = computed(() => store.state.characterStore.characters)

const nameFilter = ref("");

const loadData = (params: APIParams = {}) => {
  store.dispatch('fetchCharacters', params)
}
loadData();

const filterData = () => {
  loadData({ name: nameFilter.value });
  console.log(nameFilter.value)
}

</script>