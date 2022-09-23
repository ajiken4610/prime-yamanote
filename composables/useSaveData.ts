const data = ref(
  ((localStorage.getItem("saveData") &&
    JSON.parse(localStorage.getItem("saveData"))) || {
    primes: ["2"],
  }) as {
    primes: string[];
  }
);
export default () => data;
watchEffect(() => {
  localStorage.setItem("saveData", JSON.stringify(data.value));
});
