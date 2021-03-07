<template>
  <select> </select>
</template>

<script>
export default {
  data: () => ({}),

  async mounted() {
    const res = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR"
    );
    const dec = res.text();
    console.log(dec);
  }
};
</script>
