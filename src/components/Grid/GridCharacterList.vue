<template>
  <div
    v-if="characters.length > 0"
    class="grid grid-cols-2 gap-8 mx-auto mt-4 w-max place-items-stretch 
           sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
  >
    <GridCharacterCard
      :id="c.id"
      :name="c.name"
      :status="c.status.toLowerCase()"
      :imageURL="c.image"
      v-for="c in characters"
      :key="c.id"
    ></GridCharacterCard>
  </div>
  <div class="mx-auto min-w-75vw" v-else>{{ $t('no-result') }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
  characters: {
    type: Object,
    required: true,
  },
});
</script>
