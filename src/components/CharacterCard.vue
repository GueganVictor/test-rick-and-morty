<template>
  <div
    class="flex flex-col justify-center overflow-hidden text-center text-black cursor-pointer bg-white group rounded-xl w-62.5 transition-transform hover:(transform scale-110)"
  >
    <img
      :src="imageURL"
      class="object-cover w-62.5 h-62.5"
      width="250"
      height="250"
      :alt="getName(name)"
    />
    <div class="flex flex-col px-4">
      <div class="flex-grow" />
      <h1 class="text-xl font-bold truncate">{{ getName(name) }}</h1>
      <div class="flex items-center pb-1 mx-auto">
        <icon-mdi-circle
          class="text-[0.5rem]"
          :class="status === 'Alive' ? 'text-green-600' : 'text-red-600'"
        />
        <p>&nbsp;{{ $t(status) }}</p>
      </div>
    </div>
    <div class="flex-grow" />
    <p class="py-2 bg-green-400">En savoir plus..</p>
  </div>
</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  inheritLocale: true
})

const getName = (name: string) => {
  return !name ? t('unknown') : name;
}

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    default: null,
  },
  imageURL: {
    type: String,
    default: 'http://via.placeholder.com/200x200',
  },
  status: {
    type: String,
    default: 'Dead',
  },
})

</script>