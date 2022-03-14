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
import { Status } from '../../types/interfaces';
import { PropType, ref, watch } from 'vue';

const props = defineProps({
  filter: {
    type: String as PropType<Status | 'reset'>,
    default: '',
  },
});

// Watch for reset action, then uncheck everybox
watch(
  () => props.filter,
  (status) => {
    if (status === 'reset') check('');
  }
);

const statusCheckBoxes = ref({
  dead: ref(false),
  alive: ref(false),
  unknown: ref(false),
});

const emit = defineEmits(['update-status']);

if (props.filter !== 'reset') {
  statusCheckBoxes.value[props.filter] = true;
}

const check = (status: Status | '') => {
  console.log('test');
  let oneChecked = false;
  // Loop through each checkbox
  (<Status[]>Object.keys(statusCheckBoxes.value)).forEach((key) => {
    const v = statusCheckBoxes.value[key];

    // If the current checkbox is already we uncheck it. Otherwise if
    // the current checkbox matches the wanted checkbox, it is set to true
    statusCheckBoxes.value[key] = v ? key === status : v;
    oneChecked = statusCheckBoxes.value[key] || oneChecked;

    // Update/Send the new checked box value to the filter
    if (statusCheckBoxes.value[key]) emit('update-status', key);
  });
  // If no checkbox is checked, we update the fitler to be empty
  if (!oneChecked) emit('update-status', '');
};
</script>
