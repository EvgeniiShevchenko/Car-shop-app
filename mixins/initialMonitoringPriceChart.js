export default {
  methods: {
    initialMonitoringPriceChart(chartData) {
      let labels = [];
      let firstLine = [];
      let secondLine = [];

      for (let item of chartData) {
        labels = [...labels, item.date];
        firstLine = [...firstLine, item.maxPrice];
        secondLine = [...secondLine, item.minPrice];
      }

      this.chart.labels = labels;
      this.chart.data = { firstLine, secondLine };
    },
  },
};
