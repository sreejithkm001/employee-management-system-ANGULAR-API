import { Component, OnInit } from '@angular/core';
import { D3ServiceService } from '../hr-services/d3-service.service';
import { DoughnutData } from '../hr-services/doughnut-data'
import { entries } from "d3-collection";
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-d3-doughnut',
  templateUrl: './d3-doughnut.component.html',
  styleUrls: ['./d3-doughnut.component.scss']
})
export class D3DoughnutComponent implements OnInit {
  private allUsers: any

  //Initial Data
  private data: DoughnutData[] = [
    { name: "Active Employees", value: 0, color: "#FB8500" },
    { name: "Inactive Employees", value: 0, color: "#219EBC" }
  ];

  //Variables declared for doughnut charts
  private width = 360;
  private height = 250;
  private svg: any;
  private colors: any;
  constructor(private d3: D3ServiceService, private _api: ApiService) {
  }

  ngOnInit(): void {
    this.getCount();
  }

  getCount() {
    //Get active users details from db
    this._api.getAllUsers().subscribe((response) => {
      this.allUsers = response;
      for (let user of this.allUsers) {
        if (user.active == 1) {
          this.data[0].value += 1;
        }
        else if (user.active == 0) {
          this.data[1].value += 1;
        }
      }
      this.createSvg();
      this.drawChart();
    })

  }

  //Create SVG
  createSvg() {
    this.svg = this.d3.d3.select('#donut')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
  }

  //Draw the doughnut chart
  drawChart() {
    //Set colors
    this.colors = this.d3.d3
      .scaleOrdinal()
      .domain(this.data.map((d: any) => d.value.toString()))
      .range(this.data.map((d: any) => d.color))

    //Pie generator
    var pie = this.d3.d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d: any) => {
        return d.value;
      });
    var data_ready = pie(this.data.map((d: any) => { return d }));

    //Arc generator
    var segments = this.d3.d3.arc()
      .innerRadius(70)
      .outerRadius(100)
      .padAngle(0.05)
      .padRadius(50);

    var sections = this.svg.append('g')
      .attr('transform', 'translate(150,105)')
      .selectAll('path')
      .data(data_ready);

    sections
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d:any)=>this.colors(d.data.value))
      
    //Text content
    this.d3.d3.select('g')
      .selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .attr('text-anchor','middle')
      .attr('fill','#fff')
      .attr('transform', (d:any)=>{return 'translate('+ segments.centroid(d) +')'})
      .text((d:any)=>{return d.value})

    //Legends
    var legends = this.svg.append('g')
      .attr('transform', 'translate(190,170)')
      .selectAll('.legends')
      .data(data_ready);

    var legend = legends.enter()
      .append('g')
      .classed('lengends', true)
      .attr('transform', (d:any, i:any)=>{return "translate(0,"+ (i+1)*30 +")"});

    legend.append('rect')
      .attr('width',20)
      .attr('height',20)
      .attr('fill', (d:any)=>this.colors(d.data.value));

    legend.append('text')
      .text((d:any)=>{return d.data.name})
      .attr('fill', (d:any)=>this.colors(d.data.value))
      .attr('x', 30)
      .attr('y', 15);
  }
}
