<template>
  <div
    id="skeleton"
    class="rounded-xl h-76.5 w-35 xs:w-50 sm:w-40 md:w-55 lg:w-62.5 bg-white bg-opacity-25"
  ></div>
</template>

<script setup lang="ts"></script>

<style scoped>
#skeleton {
  animation: fade 1s infinite forwards;
  background-color: rgba(255, 255, 255, 0);
}

@keyframes fade {
  0% {
    background-color: rgba(255, 255, 255, 0.5);
  }
  50% {
    background-color: rgba(255, 255, 255, 0);
  }
  100% {
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
