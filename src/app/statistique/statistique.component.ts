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
  public chartOptions: Partial<ChartOptions>;

  nb : number; 

  nbMsg : [];
  dateMsg:[];
  constructor(public service : StatistiqueService) {
   // this.initChartData();
    this.lineChart();
   }

  ngOnInit(): void {
    this.service.refreshList();
  
    this.service.statistisque().subscribe(n => this.nb = n);
    
    this.service.count()
    .subscribe(res => {
      console.log("count msg",res)
    })  
  }
  
  lineChart(){

    this.service.count()
      .subscribe(res => {
       // let liste = JSON.stringify(res);
      //console.log(liste);
      console.log("date", res[0].date);
      
      this.chartOptions = {
        series: [
          {
            name: "Messages",
            data: [res[0].nb, res[1].nb]
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
          text: "Messages per day",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [res[0].date,res[1].date]
        }
      };
    })
  }

}
