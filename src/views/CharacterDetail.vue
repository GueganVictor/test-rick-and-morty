<template>
  <div class="mx-auto" v-if="char">
    <button
      @click="goBack()"
      class="flex items-center space-x-1 border-b border-transparent hover:border-white dark:hover:border-black"
    >
      <icon-mdi-arrow-left />
      <p>{{ $t('return-to-list') }}</p>
    </button>
    <h1 class="mt-1 mb-8 text-3xl sm:text-5xl">
      <span class="char-label">#{{ formatAttribute(char.id) }}</span>
      {{ char.name }}
    </h1>
    <div class="block sm:(flex space-x-8 items-center)">
      <div class="overflow-hidden rounded-full w-40 h-40 sm:(w-50 h-50)">
        <img
          :src="char.image"
          :alt="$t('picture_of') + char.name"
          width="200"
          height="200"
        />
      </div>
      <div class="grid grid-cols-1 gap-1 sm:(grid-cols-2 gap-4) md:grid-cols-3 w-max">
        <div>
          <label class="text-sm char-label">{{ $t('species') }}</label>
          <p class="text-xl">{{ formatAttribute(char.species) }}</p>
        </div>
        <div>
          <label class="text-sm char-label">{{ $t('origin') }}</label>
          <p class="text-xl">{{ formatAttribute(char.origin.name) }}</p>
        </div>
        <div>
          <label class="text-sm char-label">{{ $t('location') }}</label>
          <p class="text-xl">{{ formatAttribute(char.location.name) }}</p>
        </div>
        <div>
          <label class="text-sm char-label">{{ $t('gender') }}</label>
          <p class="text-xl">{{ formatAttribute(char.gender) }}</p>
        </div>
        <div>
          <label class="text-sm char-label">{{ $t('status') }}</label>
          <p class="text-xl">{{ formatAttribute(char.status) }}</p>
        </div>
        <div>
          <label class="text-sm char-label">{{ $t('type') }}</label>
          <p class="text-xl">{{ formatAttribute(char.type) }}</p>
        </div>
        <div>
          <label class="text-sm char-label">{{ $t('episodes') }}</label>
          <p class="text-xl">{{ char.episode.length }}</p>
        </div>
        <div>
          <label class="text-sm char-label">Created</label>
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
import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ICharacter } from '../types/character';

const store = useStore();
const router = useRouter();
const i18n = useI18n();

const characterId = Number(router.currentRoute.value.params.id as string);

const char: ComputedRef<ICharacter | undefined> = computed(() =>
  store.getters.getStoredCharacterById(characterId)
);

const formatAttribute = (att: string) => {
  if (!att || att === 'unknown') return i18n.t('unknown');
  return att;
};

const goBack = () => {
  router.push({ path: '/characters' });
};

store.dispatch('fetchCharacterById', { id: characterId });
</script>

<style scoped>
.char-label {
  @apply text-white text-opacity-50 dark:(text-black text-opacity-70);
}
</style>
