<template lang="pug">
.number-wrapper
  input(
    v-if="editable",
    @input="onInput",
    @keydown.enter="$emit('enter')",
    :value="number?.toString()",
    type="number"
  )
  template(v-else) {{ number.toString(10) }}
</template>

<script setup lang="ts">
import bn from "bn.js";
defineProps<{ number: bn; editable?: boolean }>();
const emit = defineEmits<{
  (e: "update:number", val: bn): void;
  (e: "enter"): void;
}>();
const onInput = (event: Event) => {
  emit("update:number", new bn((event.target as HTMLInputElement).value));
};
</script>

<style scoped lang="scss">
.number-wrapper,
.number-wrapper > input {
  font-size: calc(1rem + 3vw);
  border-radius: 1rem;
}
.number-wrapper > input {
  width: calc(100vw - 4rem);
  text-align: end;
}
.number-wrapper {
  padding: 1rem;
  margin: 0.2rem;
  display: inline-block;
  box-shadow: 0 0 0.1rem 0 black;
  transition: all 0.3s;
  background-color: rgb(0, 38, 255);
  color: white;
}
</style>
