import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { DataSkeleton } from 'src/app/Entities/data-skeleton';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      if (this.myChart) {
        this.myChart.destroy();
      }
      this.RenderBarChart();
    }
  }

  @Input('data') data!: Map<string, number>;
  @Input('filteredData') filteredData!: DataSkeleton[];

  myChart!: Chart;

  ngOnInit(): void {}

  RenderBarChart(): void {
    // Generate labels for the last 7 months
    const labels = this.generateLast7MonthsLabels();

    const data = {
      labels: labels,
      datasets: [
        {
          axis: 'y',
          label: 'Intensity',
          data: this.filteredData
          .filter(item => parseInt(item.end_year) > 0)
          .map(item => parseInt(item.end_year)), // Map items with value > 0
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const config: ChartConfiguration = {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        responsive: true, // Make the chart responsive
        maintainAspectRatio: true, // Allow chart to adjust size
      },
    };

    // Create the chart
    const canvas = document.getElementById('barchart') as HTMLCanvasElement;
    this.myChart = new Chart(canvas, config);
  }

  generateLast7MonthsLabels(): string[] {
    const labels: Set<string> = new Set<string>();

    this.filteredData.map(
      (data) => {
        if(data.end_year != ""){
          labels.add(data.end_year);
        }
      }
    );

    return Array.from(labels);
  }
}
