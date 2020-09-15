import { Component, OnInit, ViewChild } from '@angular/core';

import { StatistiqueService } from '../statistique.service';
import * as Chart from 'chart.js';
import CanvasJS from 'canvasjs';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ChartComponent,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { dataSeries } from "./data-series";
import { CountMsgDate, CountTr } from '../count-msg-date.model';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
 // @ViewChild("chart") chart2: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public chartOptions2: Partial<ChartOptions>;

  


  nb : number; 
  nbb : number;
  nbbb : number;
  results: CountMsgDate [];

  results2: CountTr [];

  

  nbMsg : number[] = [];
  dateMsg: string[] = [];

  nbMsg2 : number[] = [];
  dateMsg2: string[] = [];
  constructor(public service : StatistiqueService) { }

  ngOnInit(): void {
    this.service.refreshList();
  
    this.service.statistisque().subscribe(n => this.nb = n);
    this.service.statistisque2().subscribe(n => this.nbb = n);
    this.service.statistisque3().subscribe(n => this.nbbb = n);
    
    this.service.count()
    .subscribe((res : CountMsgDate[]) => {
      res.forEach(x => {  
        this.nbMsg.push(x.nb);  
        this.dateMsg.push(x.date);  
      });
     // console.log("nb push",this.nbMsg)  

      this.chartOptions = {
        series: [
          {
            name: "Messages",
            data: this.nbMsg
          }
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Send Messages Per Day",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.dateMsg
        }
      };
      
    })  




    ////

    this.service.count2()
    .subscribe((res : CountTr[]) => {
      res.forEach(x => {  
        this.nbMsg2.push(x.nb);  
        this.dateMsg2.push(x.date);  
        
      });
    })
    
    this.chartOptions2 = {
      series: [
        {
          name: "Messages",
          data: this.nbMsg2
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Received Messages Per Day"
      },
      xaxis: {
        categories: this.dateMsg2
      }
    };
 
      
  }

}
