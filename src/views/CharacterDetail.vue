<template>
  <div>
    <h1 class="">{{ char.name }}</h1>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ICharacter } from '../types/character';

const store = useStore();
const router = useRouter();

const char: ICharacter = store.getters.getStoredCharacterById(
  parseInt(router.currentRoute.value.params.id as string)
);
</script>
