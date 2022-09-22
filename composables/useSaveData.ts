const data = ref(
  ((localStorage.getItem("saveData") &&
    JSON.parse(localStorage.getItem("saveData"))) || { primes: [] }) as {
    primes: number[];
  }
);
export default () => data;
watchEffect(() => {
  localStorage.setItem("saveData", JSON.stringify(data.value));
});
