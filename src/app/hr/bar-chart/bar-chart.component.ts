import { Component, OnInit } from '@angular/core';
import { svg } from 'd3';
import { ApiService } from 'src/app/services/api.service';
import { D3ServiceService } from '../hr-services/d3-service.service';
import { DoughnutData } from '../hr-services/doughnut-data';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  //Initial Data
  public data: DoughnutData[] = [
    { name: 'Monday', value: 4, color: '#66c2a5' },
    { name: 'Tuesday', value: 2, color: '#fc8d62' },
    { name: 'Wednesday', value: 1, color: '#8da0cb' },
    { name: 'Thursday', value: 3, color: '#e78ac3' },
    { name: 'Friday', value: 8, color: '#a6d854' },
  ];

  //Variables declared for Bar chart
  public margin = { top: 20, bottom: 10 };
  public height = 250 - this.margin.top - this.margin.bottom;
  public width = 500;
  public lastWeekDays: any[] = [];
  public leaveDetails: any;

  private svg: any;

  constructor(private d3: D3ServiceService, private _api: ApiService) {}

  ngOnInit(): void {
    this.createSvg();
    this.createAxes();
  }
  //Create SVG
  createSvg() {
    
    this.svg = this.d3.d3
      .select('#barchart')
      .append('svg')
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('width', this.width)
      .attr('viewbox', [0, 0, this.width, this.height]);
  }

  //Create Axes
  createAxes() {
    const x = this.d3.d3
      .scaleBand()
      .domain(this.data.map((d: any) => d.name))
      .rangeRound([0, this.width])
      .padding(0.3);

    const y = this.d3.d3.scaleLinear().domain([0, 5]).range([this.height, 0]);

    //Create bars
    this.svg
      .append('g')
      .selectAll('rect')
      .data(this.data)
      .join('rect')
      .attr('x', (d: any) => x(d.name))
      .attr('y', (d: any) => y(d.value))
      .attr('height', (d: any) => y(0) - y(d.value))
      .attr('width', x.bandwidth())
      .attr('fill', (d: any) => d.color)
      .attr('class', 'bars');

    this.svg.node();

    //Attach the labelled x-axis
    this.svg
      .append('g')
      .call(this.d3.d3.axisBottom(x).tickSizeOuter(0))
      .attr('transform', `translate(0,${this.height})`)
      .attr('color', '#fff');

    //Label the values on the bar
    this.svg
      .selectAll('.label')
      .data(this.data)
      .enter()
      .append('text')
      .text((d: any) => d.value)
      .attr('fill', '#fff')
      .attr('x', (d: any) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', (d: any) => y(d.value) - 15)
      .attr('text-anchor', 'middle')
      .classed('label', true);
  }
}
