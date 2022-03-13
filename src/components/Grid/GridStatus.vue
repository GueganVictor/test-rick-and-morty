<template>
  <fieldset class="flex space-x-4">
    <div class="flex items-center space-x-0.5">
      <input
        id="radio_alive"
        type="checkbox"
        class="w-5 h-5 accent-rick-green dark:outline-black"
        v-model="statusCheckBoxes.alive"
        @change="check('alive')"
      />
      <label for="alive">{{ $t('alive') }}</label>
    </div>
    <div class="flex items-center space-x-0.5">
      <input
        id="radio_dead"
        type="checkbox"
        class="w-5 h-5 accent-rick-green dark:outline-black"
        v-model="statusCheckBoxes.dead"
        @change="check('dead')"
      />
      <label for="dead">{{ $t('dead') }}</label>
    </div>
    <div class="flex items-center space-x-0.5">
      <input
        id="radio_unknown"
        type="checkbox"
        class="w-5 h-5 accent-rick-green dark:outline-black"
        v-model="statusCheckBoxes.unknown"
        @change="check('unknown')"
      />
      <label for="unknown">{{ $t('unknown') }}</label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';

type Status = 'dead' | 'alive' | 'unknown';

const props = defineProps({
  filter: {
    type: String as PropType<Status>,
    default: '',
  },
});

const statusCheckBoxes = ref({
  dead: ref(false),
  alive: ref(false),
  unknown: ref(false),
});

const emit = defineEmits(['update:value']);

statusCheckBoxes.value[props.filter] = true;

const check = (status: Status) => {
  let oneChecked = false;
  Object.keys(statusCheckBoxes.value).forEach((key) => {
    const k = key as Status;
    const v = !statusCheckBoxes.value[k];
    statusCheckBoxes.value[k] = v ? !v : key === status;
    oneChecked = statusCheckBoxes.value[k] || oneChecked;
    if (statusCheckBoxes.value[k]) emit('update:value', key);
  });
  if (!oneChecked) emit('update:value', '');
};
</script>
