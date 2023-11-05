import { animate } from '@angular/animations';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Chart from 'chart.js';
import * as d3 from 'd3';
import { DataSkeleton } from 'src/app/Entities/data-skeleton';
import { DataPublisherService } from 'src/app/services/data-publisher.service';

@Component({
  selector: 'app-chart-area',
  templateUrl: './chart-area.component.html',
  styleUrls: ['./chart-area.component.css'],
})
export class ChartAreaComponent implements OnInit {
  constructor(private dataService: DataPublisherService) {}

  @Input() filters!: any;

  sectorMap!: Map<string, number>;

  filteredData: DataSkeleton[] = [];

  fetchBasedOnSectors() {
    this.dataService.fetchAllByFilters(this.filters).subscribe((data) => {
      this.filteredData = data.result;

      // Clear the sectorMap before populating it
      this.sectorMap = new Map<string, number>();

      this.filteredData.forEach((data) => {
        const sector = data.sector;
        if (this.sectorMap.has(sector)) {
          this.sectorMap.set(
            sector,
            (this.sectorMap.get(sector) as number) + 1
          );
        } else {
          this.sectorMap.set(sector, 1);
        }
      });

      // After populating sectorMap, create the charts
      this.clearChartElements('#svg1');
      this.clearChartElements('#svg2');
      this.createPieChart();
      this.createBarChart();
    });
  }

  clearChartElements(chartId: string) {
    // Remove the existing chart elements in the specified chart SVG
    const svg = d3.select(chartId);
    svg.selectAll('*').remove();
  }

  ngOnInit() {
    this.fetchBasedOnSectors();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters']) {
      // filters input has changed, so call your function
      this.fetchBasedOnSectors();
    }
  }

  createPieChart() {
    // Step 3
    var svg = d3.select('#svg1'),
      width: any = svg.attr('width'),
      height: any = svg.attr('height'),
      radius = 200;

    var g = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Step 4
    var ordScale = d3
      .scaleOrdinal()
      .domain(Array.from(this.sectorMap.keys()))
      .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);

    // Step 5
    var pie = d3.pie().value((d): any => {
      return d.toString();
    });

    var arc = g
      .selectAll('arc')
      .data(pie(Array.from(this.sectorMap.values())))
      .enter();

    // Step 6
    var path = d3.arc().outerRadius(radius).innerRadius(0);

    arc
      .append('path')
      .attr('d', (d: any) => path(d) as string) // Use the arc generator to create path data
      .attr('fill', (d: any) => ordScale(d.data.name as string) as string);

    // Step 7
    var label = d3.arc().outerRadius(radius).innerRadius(0);

    arc
      .append('text')
      .attr('transform', (d: any) => `translate(${label.centroid(d)})`)
      .text((d: any, i: number) => Array.from(this.sectorMap.keys())[i])
      .style('font-family', 'arial')
      .style('font-size', 15);
  }

  createBarChart() {
    const svg = d3.select('#svg2');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Use your sectorMap data for the bar chart
    const sectorData = Array.from(this.sectorMap);

    // Step 4: Create scales
    const xScale: any = d3
      .scaleBand()
      .domain(sectorData.map((d) => d[0])) // Assuming the sector names are in the first element of each pair
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sectorData, (d) => d[1] as number) || 0]) // Specify the type as number
      .nice()
      .range([innerHeight, 0]);

    // Step 5: Create bars
    g.selectAll('.bar')
      .data(sectorData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d[0]))
      .attr('y', (d) => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d[1]));

    // Step 6: Create axes
    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

    g.selectAll('.bar-label')
      .data(sectorData)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => xScale(d[0]) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d[1] as number) - 5) // Use optional chaining to handle possible undefined values
      .attr('text-anchor', 'middle')
      .text((d) => d[1]);

    // Optionally, you can add labels and titles for axes and the chart itself.

    // You can also customize the appearance and styling of your bar chart using CSS.

    // Step 8: Provide axis labels and chart title (optional)
    g.append('text')
      .attr('class', 'x-axis-label')
      .attr('x', innerWidth / 2)
      .attr('y', innerHeight + margin.top)
      .attr('text-anchor', 'middle')
      .text('Categories');

    g.append('text')
      .attr('class', 'y-axis-label')
      .attr('x', -innerHeight / 2)
      .attr('y', -margin.left)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Values');

    // Chart title (optional)
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('class', 'chart-title')
      .text('Bar Chart Example');
  }


}
