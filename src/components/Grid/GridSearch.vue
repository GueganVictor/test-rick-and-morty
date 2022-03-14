<template>
  <div class="flex items-center space-x-2">
    <div class="flex items-center overflow-hidden rounded">
      <input
        :value="filter"
        @input="emitUpdate($event)"
        class="relative block w-full h-10 min-w-0 px-3 m-0 text-base font-normal text-gray-700 bg-white border-2 border-white border-solid bg-clip-padding transition ease-in-out
               focus:(text-gray-700 bg-white border-rick-green outline-none)"
        type="text"
      />
      <button
        class="flex bg-rick-green items-center inline-block h-10 px-6 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out shadow-md 
               hover:(bg-rick-green-darken shadow-lg) focus:(bg-rick-green-darken shadow-lg ring-0) 
               active:(shadow-lg bg-blue-800) dark:(text-black)"
        type="submit"
      >
        {{ $t('search') }}
      </button>
    </div>
    <p
      v-if="(route.query.name ?? '') !== filter"
      class="hidden text-sm text-rick-green dark:text-black lg:block"
    >
      {{ $t('refresh-alert') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const props = defineProps({
  filter: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:value']);

// Vue Modules
const route = useRoute();

/**
 * Emits value update event to parent component
 * @param event Search input HTML Event
 */
const emitUpdate = (event: Event) => {
  emit('update:value', (<HTMLInputElement>event.target).value);
};
</script>
