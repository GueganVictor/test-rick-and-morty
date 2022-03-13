<template>
  <router-link
    :to="`/characters/${id}`"
    class="flex flex-col justify-center overflow-hidden rainbow-border text-center text-black cursor-pointer bg-white text-white ) group rounded-xl w-35 xs:w-50 sm:w-40 md:w-55 lg:w-62.5 transition-transform duration-200 ease"
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
        class="text-base font-bold truncate leading-none mt-1 md:(text-lg leading-normal my-0) lg:text-xl"
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n({
  inheritLocale: true,
});

const getName = (name: string) => {
  return !name ? t('unknown') : name;
};

const getStatusColor = () => {
  const colors = {
    alive: 'text-rick-green',
    dead: 'text-red-600',
    unknown: 'text-yellow-600',
  };
  return colors[props.status as 'dead' | 'alive' | 'unknown'];
};

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
    default: 'dead',
  },
});
</script>

<style scoped>
@-webkit-keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.rainbow-border:hover,
.rainbow-border:focus {
  transform: scale(1.05);
  border: double 4px transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(
      270deg,
      rgb(0, 209, 176) 0px,
      rgb(0, 233, 79) 33.33%,
      rgb(0, 147, 255) 66.66%,
      rgb(224, 138, 244) 100%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
