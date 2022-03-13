<template>
  <div>
    <h1 class="">{{ char?.name }}</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ICharacter } from '../types/character';

const store = useStore();
const router = useRouter();

const characterId = parseInt(router.currentRoute.value.params.id as string);

const char: ComputedRef<ICharacter | undefined> = computed(() =>
  store.getters.getStoredCharacterById(characterId)
);

console.log(char.value);

store.dispatch('fetchCharacterById', { id: characterId });
</script>
