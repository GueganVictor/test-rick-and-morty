<template>
    <div class="container mx-auto">
        <div
            class="flex justify-center gap-8 flex-wrap md:(grid) place-items-center md:(my-8 gap-8 grid-cols-3) xl:grid-cols-4 2xl:grid-cols-5"
        >
            <CharacterCard
                :id="c.id"
                :name="c.name"
                :status="c.status"
                :imageURL="c.image"
                v-for="c in chars"
                :key="c.id"
            ></CharacterCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import characters from '../../api'

const chars = characters.results;
</script>