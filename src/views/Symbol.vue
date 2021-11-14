<template>
  <div>
    <v-row align="center" justify="space-around" class="mt-5 mb-5">
      {{ `${$route.params.symbol.toUpperCase()}` }}
    </v-row>
    <div id="chart">
      <apexchart
        type="candlestick"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <v-row align="center" justify="space-around" class="mt-5">
      <v-btn depressed color="primary" @click="daily">Daily</v-btn>
      <v-btn depressed color="primary" @click="weekly">Weekly</v-btn>
      <v-btn depressed color="primary" @click="monthly">Monthly</v-btn>
    </v-row>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Vue from "vue";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

export default {
  data: () => ({
    chartOptions: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
        datetimeFormatter: {
          year: "yyyy",
          mouth: "MMM 'yy",
          day: "dd MMM",
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  }),
  computed: {
    series() {
      return [{ data: this.$store.state.chartData }];
    },
  },
  mounted() {
    this.$store.dispatch("getDaily", this.$route.params.symbol);
  },
  methods: {
    daily() {
      this.$store.dispatch("getDaily", this.$route.params.symbol);
    },
    weekly() {
      this.$store.dispatch("getWeekly", this.$route.params.symbol);
    },
    monthly() {
      this.$store.dispatch("getMonthly", this.$route.params.symbol);
    },
  },
};
</script>

<style></style>
