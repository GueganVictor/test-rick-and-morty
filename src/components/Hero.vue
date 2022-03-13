<template>
  <div class="flex justify-center p-10 pt-20 sm:p-20">
    <img src="@images/hero_logo.png" alt="test" />
  </div>
  <div class="absolute flex space-x-2 text-xl text-white right-5 top-5">
    <div>
      <button
        class="button dark:(text-black)"
        type="button"
        :title="$t('button.toggle_dark')"
        @click="toggleDark()"
      >
        <icon-carbon-moon v-if="isDark" />
        <icon-carbon-sun v-else />
      </button>
    </div>
    <div>
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
  </div>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '../modules/dark';
</script>

<style scoped>
.button {
  @apply p-1 text-2xl border border-transparent leading-none;
}
</style>
