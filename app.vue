<template lang="pug">
.numbers
  button(v-if="data.primes[0] === 'x'", @click="data.primes = ['2']") reset
  TransitionGroup
    CardNumber(
      editable,
      v-model:number="inputNumber",
      @enter="onEnter",
      :key="0"
    )
    CardNumber(
      :number="number",
      v-for="(number, index) of data.primes",
      :key="data.primes.length - index"
    )
</template>

<script setup lang="ts">
import Rabin from "miller-rabin";
import bn from "bn.js";
const tester = new Rabin();
const data = useSaveData();
const inputNumber = ref<bn>();
const bn1 = new bn(1);
const bn2 = new bn(2);
const bn3 = new bn(3);
const getDivisor = (bn: any) => {
  if (bn.eq(bn1)) {
    return bn1;
  } else if (bn.eq(bn2)) {
    return false;
  } else if (bn.eq(bn3)) {
    return false;
  } else {
    return tester.getDivisor(bn, 100);
  }
};
const onEnter = () => {
  if (inputNumber.value) {
    if (
      inputNumber.value.gt(new bn(data.value.primes[0])) &&
      inputNumber.value.lt(new bn(data.value.primes[0]).mul(bn2))
    ) {
      const divisor = getDivisor(inputNumber.value);
      data.value.primes.unshift(inputNumber.value.toString());
      if (divisor !== false) {
        data.value.primes.unshift("/" + divisor.toString());
        data.value.primes.unshift("x");
      }
      inputNumber.value = null;
    }
  }
};
</script>

<style scoped lang="scss">
.numbers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
