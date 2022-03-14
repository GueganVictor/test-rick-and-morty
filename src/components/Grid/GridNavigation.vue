<template>
  <div
    v-if="store.state.characterStore.info.pages > 1"
    class="flex items-center justify-center my-4 space-x-2 text-2xl"
  >
    <div class="flex items-center space-x-2">
      <button
        class="navigation-chevron"
        :disabled="canNavigate(-1)"
        @click="navigate(-1)"
      >
        <icon-mdi-chevron-left />
      </button>
    </div>
    <span>{{ currentPage }}</span>
    <div class="flex items-center space-x-2">
      <span>&nbsp;/ {{ store.state.characterStore.info.pages }}</span>
      <button class="navigation-chevron" :disabled="canNavigate(1)" @click="navigate(1)">
        <icon-mdi-chevron-right />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['navigate']);

const store = useStore();

const canNavigate = (pageOffset: number) => {
  const n = props.currentPage + pageOffset;
  return n < 1 || n > store.state.characterStore.info.pages;
};

const navigate = (pageOffset: number) => {
  if (canNavigate(pageOffset)) return;
  emit('navigate', props.currentPage + pageOffset);
};
</script>

<style scoped>
.navigation-chevron {
  @apply leading-none bg-white rounded-full bg-opacity-20 disabled:(bg-opacity-5 cursor-default) dark:(bg-black bg-opacity-20 hover:bg-opacity-40 disabled:bg-opacity-10);
}
</style>
