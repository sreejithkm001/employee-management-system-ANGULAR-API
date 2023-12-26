import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { D3ServiceService } from '../hr-services/d3-service.service';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements OnInit {

  public leaveDetails!:any;
  public totalLeaveDays:number=0;

  public width = 300;
  public height = 250;
  public svg: any;
  public productivity = 0;

  constructor(private d3: D3ServiceService, private _api:ApiService) { }

  ngOnInit(): void {
    this.getAllLeaveDetails();
  }

  drawGauge() {
    //Set the configuration variable
    let config = ({
      //Basic graph information
      panel: {
        startAngle: -90,
        endAngle: 90,
        width: 40
      },
      //Information of each sections
      sections: [
        { from: 0, to: 30, color: '#e8e2ca' },
        { from: 30, to: 60, color: '#dbd798' },
        { from: 60, to: 90, color: '#ccd360' },
        { from: 90, to: 120, color: '#aaca2a' },
        { from: 120, to: 150, color: '#3e6c0a' },
      ]
    });

    //Create SVG
    this.svg = this.d3.d3.select('#power-gauge')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)

    //Setting the min and max angle values
    const minValue = Math.min(...config.sections.map((d: any) => d.from))
    const maxValue = Math.max(...config.sections.map((d: any) => d.to));

    //Setting the scale for each sections
    const scale = this.d3.d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([
        config.panel.startAngle,
        config.panel.endAngle
      ]);

    //Finding the radius
    const radius = Math.floor(Math.min(this.width, this.height) / 2);

    //Arc generator
    const arc = this.d3.d3.arc()
      .outerRadius(radius)
      .innerRadius(radius - config.panel.width);

    //Translate the SVG
    const inner = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height * 0.75})`);

    //Set the needle
    const needle = inner
      .append('g')
      .attr('class', 'needle')
      .attr('fill', '#fff')
      //Needle base circle
      .call((s: any) => s
        .append('circle')
        .attr('r', 9)
      )
      //Needle 
      .call((s: any) => s
        .append('rect')
        .attr('x', -2)
        .attr('y', -this.height * .35)
        .attr('width', 4)
        .attr('height', this.height * .45)
      )
      .transition()
      .ease(this.d3.d3.easeElastic.amplitude(2).period(0.2))
      .duration(3000)
      .attr('transform', `rotate(${scale(this.productivity * maxValue)})`);

    //Inner arc
    inner
      .selectAll('path.arc')
      .data(config.sections)
      .join('path')
      .attr('class', 'arc')
      .attr('d', (d: any) => arc(
        {
          innerRadius: radius,
          outerRadius: radius - config.panel.width,
          startAngle: this.convertAngle(scale(d.from)),
          endAngle: this.convertAngle(scale(d.to))
        }
      ))
      .attr('fill', (d: any) => d.color)

  }

  //Function to convert degree to radius
  convertAngle(deg: any) { 
    return Math.PI / 180 * deg; 
  }

  //Get the leave details from db
  getAllLeaveDetails(){
    //get today's date
    const date = new Date();
    let today:any;
    if(date.getMonth()+1 <10){
      today = date.getFullYear().toString()+ '-0' +(date.getMonth()+1).toString()+ '-' +date.getDate().toString()
    }
    else{
      today = date.getFullYear().toString()+ '-' +(date.getMonth()+1).toString()+ '-' +date.getDate().toString()
    }

    //Get the leave details from db
    this._api.getApprovedLeaveDetails().subscribe((response)=>{
      this.leaveDetails=response;
      //Filtering the no. of days
      for(let leavedetail of this.leaveDetails){
        if(leavedetail.noofdays==1){
          this.totalLeaveDays+=1;
        }
        else{
          if(leavedetail.to<=today){
            this.totalLeaveDays+=leavedetail.noofdays;
          }
          else if(leavedetail.from<=today){
            let from=new Date(leavedetail.from)
            let nod=Math.ceil((date.getTime()-from.getTime()) / (1000 * 60 * 60 * 24));
            this.totalLeaveDays+=nod;
          }
        }
      }

      //Calculate productivity
      let totalWorkingDays = 132;     //22 days per month, for 6 months
      this.productivity=((totalWorkingDays-this.totalLeaveDays)) / (totalWorkingDays);
      
      //Calling gauge chart function
      this.drawGauge();
    })
  }
}
