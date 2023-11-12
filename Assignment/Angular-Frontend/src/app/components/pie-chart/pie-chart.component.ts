import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataSkeleton } from 'src/app/Entities/data-skeleton';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, OnChanges {
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      if (this.myChart) {
        this.myChart.destroy();
      }
      this.RenderPieChart();
    }
  }

  @Input('data') data!: Map<string, number>;

  filteredData: DataSkeleton[] = [];
  myChart!: Chart;

  ngOnInit(): void {}

  RenderPieChart(): void {
    const canvas = document.getElementById('piechart') as HTMLCanvasElement;

    const data = {
      labels: Array.from(this.data.keys()),
      datasets: [
        {
          label: 'My First Dataset',
          data: Array.from(this.data.values()),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    };

    const options = {
      responsive: true, // Make the chart responsive
      maintainAspectRatio: true, // Allow chart to adjust size while maintaining aspect ratio
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data,
      options: options
    };

    // Create the chart
    this.myChart = new Chart(canvas, config);
  }
}

