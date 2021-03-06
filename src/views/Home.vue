<template>
  <div>
    <div class="page-title">
      <h3>{{ "Home_home" | localize }}</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click="refreshPage()"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";

export default {
  name: "home",
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill,
    HomeCurrency
  },

  methods: {
    async refreshPage() {
      this.loading = true;
      this.currency = await this.$store.dispatch("fetchCurrency");
      this.loading = false;
    }
  },

  async mounted() {
    // Получить данные о валютах с https://fixer.io/
    this.currency = await this.$store.dispatch("fetchCurrency");
    this.loading = false;
  }
};
</script>
