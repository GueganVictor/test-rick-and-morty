<template>
  <fieldset class="flex space-x-4">
    <div class="flex items-center space-x-1">
      <input
        id="radio_alive"
        type="checkbox"
        class="w-5 h-5 accent-rick-green dark:outline-black"
        v-model="statusCheckBoxes.alive"
        @change="check('alive')"
      />
      <label for="radio_alive">{{ $t('alive') }}</label>
    </div>
    <div class="flex items-center space-x-1">
      <input
        id="radio_dead"
        type="checkbox"
        class="w-5 h-5 accent-rick-green dark:outline-black"
        v-model="statusCheckBoxes.dead"
        @change="check('dead')"
      />
      <label for="radio_dead">{{ $t('dead') }}</label>
    </div>
    <div class="flex items-center space-x-1">
      <input
        id="radio_unknown"
        type="checkbox"
        class="w-5 h-5 accent-rick-green dark:outline-black"
        v-model="statusCheckBoxes.unknown"
        @change="check('unknown')"
      />
      <label for="radio_unknown">{{ $t('unknown') }}</label>
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
const emit = defineEmits(['update-status']);

const statusCheckBoxes = ref({
  dead: ref(false),
  alive: ref(false),
  unknown: ref(false),
});

if (props.filter !== 'reset') {
  statusCheckBoxes.value[props.filter] = true;
}

/**
 * Loops through checkboxes, uncheck undesired ones and
 * emits an event with the new value
 * @param status New desired status
 */
const check = (status: Status | '') => {
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

// Watch for reset action, then uncheck every box
watch(
  () => props.filter,
  (status) => {
    if (status === 'reset') check('');
  }
);
</script>
