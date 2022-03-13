<template>
  <div class="mx-auto" v-if="char">
    <button
      @click="goBack()"
      class="flex items-center space-x-1 border-b border-transparent hover:border-white dark:hover:border-black"
    >
      <icon-mdi-arrow-left />
      <p>Go back to the list</p>
    </button>
    <h1 class="mt-1 mb-8 text-3xl sm:text-5xl">
      <span class="char-label">#{{ char.id }} </span>
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
          <label class="text-sm char-label">Species</label>
          <p class="text-xl">{{ char.species || 'N/A' }}</p>
        </div>
        <div>
          <label class="text-sm char-label">Origin</label>
          <p class="text-xl">{{ char.origin.name || 'N/A' }}</p>
        </div>
        <div>
          <label class="text-sm char-label">Location</label>
          <p class="text-xl">{{ char.location.name || 'N/A' }}</p>
        </div>
        <div>
          <label class="text-sm char-label">Gender</label>
          <p class="text-xl">{{ char.gender || 'N/A' }}</p>
        </div>
        <div>
          <label class="text-sm char-label">Status</label>
          <p class="text-xl">{{ char.status || 'N/A' }}</p>
        </div>
        <div>
          <label class="text-sm char-label">Type</label>
          <p class="text-xl">{{ char.type || 'N/A' }}</p>
        </div>
        <div>
          <label class="text-sm char-label">Episode</label>
          <p class="text-xl">{{ char.episode.length || 'N/A' }}</p>
        </div>
        <div>
          <label class="text-sm char-label">Created</label>
          <p class="text-xl">{{ new Date(char.created).toLocaleDateString() }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center h-full px-10">
    <div class="text-center mt-25">
      <h1 class="text-3xl font-bold">Error !</h1>
      <h1 class="text-2xl">Impossible de charger le personnage</h1>
    </div>
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
