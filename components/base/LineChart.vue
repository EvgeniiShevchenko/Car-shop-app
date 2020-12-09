<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  data() {
    return {
      options: {
        elements: {
          line: {
            borderWidth: 2,
            tension: 0,
            borderColor: '#1768AC',
            fill: false,
          },
          point: {
            radius: 6,
            borderWidth: 2,
            borderColor: '#1768AC',
            backgroundColor: '#ffffff',
            hoverRadius: 6,
            hoverBorderWidth: 2,
            hoverBackgroundColor: '#1768AC',
          },
        },
        tooltips: {
          backgroundColor: '#70848E',
          titleFontFamily: 'Rubik',
          titleFontStyle: 'normal',
          titleFontSize: 13,
          cornerRadius: 4,
          xPadding: 16,
          yPadding: 8,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontFamily: 'Rubik',
                fontColor: '#4A4D5C',
                callback: function (value, index, values) {
                  return '$' + value + ' —';
                },
              },
              gridLines: {
                display: true,
                color: '#D6E1E7',
                drawOnChartArea: true,
                drawBorder: false,
                borderDash: [2.5, 2.5],
                drawTicks: false,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontFamily: 'Rubik',
                fontColor: '#4A4D5C',
                callback: function (value, index, values) {
                  return value;
                },
              },
              gridLines: {
                display: true,
                color: '#D6E1E7',
                drawBorder: false,
                borderDash: [2.5, 2.5],
                pointBorderColor: '#D6E1E7',
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
          {
            label: '$',
            data: typeof this.chartData === 'object' ? this.chartData.firstLine : this.chartData,
          },
          {
            label: '$',
            borderColor: '#4CAD33',
            data: typeof this.chartData === 'object' ? this.chartData.secondLine : undefined,
            pointHoverBackgroundColor: '#4CAD33',
          },
        ],
      },
      this.options
    );
  },
  props: {
    chartData: {
      type: [Array, Object],
      required: false,
    },
    chartLabels: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-wrapper {
  position: relative;
  flex: 1;
  min-height: 0;
}
</style>
