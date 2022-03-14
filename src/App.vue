<template>
  <div
    class="relative flex flex-col w-full min-h-screen text-white bg-black dark:(bg-beige text-black)"
  >
    <Header></Header>
    <Hero></Hero>
    <div class="flex-grow"><router-view></router-view></div>

    <Footer></Footer>
  </div>
</template>

<script setup lang="ts"></script>
