import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { Chart } from './shared/chart.model';


@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit{
    Chart: Chart[];
    url: string = 'https://localhost:44311/api/charts/';
    data: any;

   constructor(public service: DashService) { }

   Highcharts = Highcharts;

    spline = {
    chart: {
   type: 'spline',
    },
    title: {
    text: 'Active Users'
    },
    credits: {
    enabled: false
    },
    yAxis: {
      title: {
         text: 'Users'
         }
    },
    series: []
    }
    ngOnInit() {

    this.getApiResponse(this.url).then(
    data => {
    const values = [];
    data.forEach(row => {
    const temp_row = [row.data,];    
    values.push(temp_row);
    });
    var dataSeries = [];

    dataSeries.push({
    name:'Users Present',
    data: values,
    });

    this.spline.series = dataSeries;
    },
    error => {
    console.log('Something went wrong.');
    })
    }
    getApiResponse(url) {
    return this.service.Get(this.url)
    .toPromise().then(res => {
    return res;
    });
    }
    }