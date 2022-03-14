<template>
  <div
    v-if="!store.state.characterStore.error"
    class="grid grid-cols-2 gap-8 mx-auto mt-4 w-max place-items-stretch sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
  >
    <GridCharacterCard
      v-if="characters.length > 0"
      :id="c.id"
      :name="c.name"
      :status="c.status.toLowerCase()"
      :imageURL="c.image"
      v-for="c in characters"
      :key="c.id"
    ></GridCharacterCard>
    <GridSkeletonCard
      v-else-if="store.state.characterStore.loading"
      v-for="i in 20"
      :key="i"
    ></GridSkeletonCard>
  </div>
  <div class="items-center flex-grow mx-auto my-20 text-center min-w-75vw" v-else>
    <p class="text-xl font-bold">{{ $t('no-result') }}</p>
    <p class="text-lg">{{ $t('try-different-query') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

// Vue Modules
const store = useStore();

const props = defineProps({
  characters: {
    type: Object,
    required: true,
  },
});
</script>
