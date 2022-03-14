<template>
  <div class="w-max mx-auto" v-if="char">
    <div class="flex items-center">
      <div>
        <button
          @click="goBack()"
          class="flex items-center space-x-1 border-b border-transparent hover:border-white dark:hover:border-black"
        >
          <icon-mdi-arrow-left />
          <p>{{ $t('return-to-list') }}</p>
        </button>
        <h1 class="mt-1 mb-8 text-3xl sm:text-5xl">
          <span class="char-label">#{{ char.id }}</span>
          {{ char.name }}
        </h1>
      </div>
      <CharacterImage
        class="hidden sm:block lg:hidden w-30 h-30 ml-8"
        :image="char.image"
        :name="char.name"
      />
    </div>
    <div class="block sm:(flex items-center)">
      <CharacterImage
        class="block sm:hidden lg:block rounded-full w-40 h-40 sm:(w-50 h-50)"
        :image="char.image"
        :name="char.name"
      />
      <div
        class="grid max-w-150 grid-cols-1 gap-1 sm:(grid-cols-2 gap-4) lg:(grid-cols-3 ml-8)"
      >
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('species') }}</label>
          <p class="text-xl">{{ formatAttribute(char.species) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('origin') }}</label>
          <p class="text-xl">{{ formatAttribute(char.origin.name) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('location') }}</label>
          <p class="text-xl">{{ formatAttribute(char.location.name) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('gender') }}</label>
          <p class="text-xl">{{ $t(char.gender.toLocaleLowerCase()) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('status') }}</label>
          <p class="text-xl">{{ $t(char.status.toLocaleLowerCase()) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('type') }}</label>
          <p class="text-xl">{{ formatAttribute(char.type) }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('episodes') }}</label>
          <p class="text-xl">{{ char.episode.length }}</p>
        </div>
        <div class="max-w-90vw">
          <label class="text-sm char-label">{{ $t('created') }}</label>
          <p class="text-xl">{{ new Date(char.created).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center px-10">
    <div class="text-center mt-25">
      <h1 class="text-3xl font-bold">{{ $t('error') }}</h1>
      <h1 class="mb-4 text-2xl">{{ $t('character-not-found') }}</h1>
      <router-link to="/">
        <p class="mx-auto text-xl border-b border-black w-max">
          {{ $t('return-to-list') }}
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTitle } from '@vueuse/core';
import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ICharacter } from '../types/character';

// Vue Modules
const store = useStore();
const router = useRouter();
const i18n = useI18n();

const characterId = Number(router.currentRoute.value.params.id);

// Data
const char: ComputedRef<ICharacter | undefined> = computed(() =>
  store.getters.getStoredCharacterById(characterId)
);

/**
 * Returns the attribute or the translation of unknown if it's undefined
 * @param att attribute of the character
 * @returns The attribute or 'Unknown'
 */
const formatAttribute = (att: string) => {
  if (!att || att === 'unknown') return i18n.t('unknown');
  return att;
};

/**
 * Navigate router to previous page in the application
 * If no previous path is available in the router we navigate
 * to the characters list
 */
const goBack = () => {
  if (!router.options.history.state.back) {
    router.push({ path: '/characters' });
    return;
  }
  router.go(-1);
};

store.dispatch('fetchCharacterById', { id: characterId });

const title = computed(() => {
  return char.value?.name + ' - ' + i18n.t('app_name');
});
useTitle(title);
</script>

<style scoped>
.char-label {
  @apply text-white text-opacity-50 dark:(text-black text-opacity-70);
}
</style>
