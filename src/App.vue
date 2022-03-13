<template>
  <div
    class="flex flex-col w-full min-h-screen text-white bg-black dark:(bg-amber-200 text-black)"
  >
    <Header></Header>
    <Hero></Hero>
    <router-view class="flex-grow"></router-view>

    <Footer></Footer>
  </div>
</template>

<script setup lang="ts"></script>
