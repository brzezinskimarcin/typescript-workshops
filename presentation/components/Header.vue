<script setup lang="ts">

const props = defineProps({
  title: {
    default: '',
  },
});
</script>

<template>
  <div class="absolute h-full w-full" style="z-index: -10">
    <div class="relative h-full w-full">
      <div class="bubble-wrap -top-40 -right-10">
        <bubble/>
      </div>
      <div class="bubble-wrap --bottom-left">
        <bubble/>
      </div>
      <div class="bubble-wrap --bottom-right">
        <bubble/>
      </div>
    </div>
  </div>
  <h2 class="text-primary flex content-center text-xl font-semibold pb-3"> {{ title }}</h2>
</template>