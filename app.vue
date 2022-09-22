<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
import Rabin from "miller-rabin";
import bn from "bn.js";
const tester = new Rabin();
console.log(tester);
console.log(tester.getDivisor(new bn(4)).toString());
</script>
