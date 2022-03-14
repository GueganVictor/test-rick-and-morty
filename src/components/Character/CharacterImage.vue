<template>
  <div>
    <img
      :src="props.image"
      :alt="$t('picture_of') + props.name"
      class="rounded-full"
      width="200"
      height="200"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>
