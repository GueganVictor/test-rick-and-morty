<template>
  <div
    class="relative flex flex-col w-full min-h-screen text-white bg-black dark:(bg-beige text-black)"
  >
    <Header></Header>
    <Hero></Hero>
    <router-view class="flex-grow"></router-view>

    <Footer></Footer>
  </div>
</template>

<script setup lang="ts"></script>
