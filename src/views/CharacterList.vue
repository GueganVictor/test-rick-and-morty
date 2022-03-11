<template>
    <div class="mx-auto">
        <div
            class="grid grid-cols-2 gap-8 mx-auto w-max place-items-stretch sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
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