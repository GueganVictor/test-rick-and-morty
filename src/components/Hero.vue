<template>
  <div class="flex justify-center p-10 pt-20 sm:p-20">
    <img src="@images/hero_logo.png" alt="test" />
  </div>
  <div class="absolute right-5 top-5 cursor-pointer text-white text-xl">
    <button
      class="button dark:(text-black) "
      type="button"
      :title="$t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <icon-carbon-moon v-if="isDark" />
      <icon-carbon-sun v-else />
    </button>
    <button
      class="button"
      type="button"
      :title="$t('button.toggle_lang')"
      @click="$i18n.locale = $i18n.locale === 'en' ? 'fr' : 'en'"
    >
      <icon-cif-fr v-if="$i18n.locale === 'fr'"></icon-cif-fr>
      <icon-cif-gb v-if="$i18n.locale === 'en'"></icon-cif-gb>
    </button>
  </div>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '../modules/dark';
</script>

<style scoped>

.button {
  @apply px-3 py-1 text-xl focus:(outline-none)
}

</style>