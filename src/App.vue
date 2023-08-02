<script setup>
import { start } from '@popperjs/core';
import { RouterView } from 'vue-router'
import Navi from './components/Navi.vue';

</script>

<template>
  <header>
      <Navi />
  </header>
  <main>
    <RouterView />
  </main>
</template>
