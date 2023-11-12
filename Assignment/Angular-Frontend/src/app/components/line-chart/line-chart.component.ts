import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { DataSkeleton } from 'src/app/Entities/data-skeleton';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      if (this.myChart) {
        this.myChart.destroy();
      }
      if (this.filteredData && this.filteredData.length > 0) {
        this.filteredData.sort(
          (data1, data2) => parseInt(data1.end_year) - parseInt(data2.end_year)
        );
      }
      this.renderLineChart();
    }
  }

  @Input('filteredData') filteredData!: DataSkeleton[];
  @Input('data') data!: Map<string, number>;

  myChart: Chart | undefined;

  ngOnInit(): void {}

  renderLineChart(): void {
    const labels = this.generateLast7MonthsLabels();
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Relevence',
          data: this.filteredData.map((values) => values.relevance),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: true, // Allow chart to adjust size
      },
    };

    const canvas = document.getElementById('linechart') as HTMLCanvasElement;
    this.myChart = new Chart(canvas, config);
  }

  generateLast7MonthsLabels(): string[] {
    const labels: Set<string> = new Set<string>();

    this.filteredData.map((data) => {
      if (data.end_year != '') {
        labels.add(data.end_year);
      }
    });

    return Array.from(labels);
  }
}
