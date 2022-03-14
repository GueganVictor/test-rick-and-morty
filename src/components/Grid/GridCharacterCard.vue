<template>
  <router-link
    :to="`/characters/${id}`"
    class="flex flex-col justify-center overflow-hidden border-4 text-center text-black cursor-pointer bg-white border-black rounded-xl w-35 
           xs:w-50 sm:w-40 md:w-55 lg:w-62.5 
           card-highlight card-dark card-animation"
  >
    <img
      :src="imageURL"
      class="object-cover w-full h-auto"
      width="250"
      height="250"
      :alt="getName(name)"
    />
    <div class="flex flex-col px-4">
      <div class="flex-grow" />
      <h1
        class="mt-1 text-base font-bold leading-none truncate md:(text-lg leading-normal my-0) lg:text-xl"
      >
        {{ getName(name) }}
      </h1>
      <div class="flex items-center pb-1 mx-auto">
        <icon-mdi-circle class="text-[0.5rem]" :class="getStatusColor()" />
        <p>&nbsp;{{ $t(status) }}</p>
      </div>
    </div>
    <div class="flex-grow" />
    <p class="hidden py-2 text-sm bg-green-400 md:text-base">
      {{ $t('learn-more') }}
    </p>
  </router-link>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { Status } from '../../types/interfaces';

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
    type: String as PropType<Status>,
    default: 'dead',
  },
});

const { t } = useI18n({
  inheritLocale: true,
});

const getName = (name: string) => !name ? t('unknown') : name;

const getStatusColor = () => {
  const colors = {
    alive: 'text-rick-green',
    dead: 'text-red-600',
    unknown: 'text-yellow-600',
  };
  return colors[props.status];
};
</script>

<style scoped>
.card-highlight:focus,
.card-highlight:hover {
  @apply transform scale-110 !border-rick-green;
}

.card-dark {
  @apply dark:(border-beige );
}

.card-animation {
  @apply transition-transform duration-300 ease;
}
</style>
