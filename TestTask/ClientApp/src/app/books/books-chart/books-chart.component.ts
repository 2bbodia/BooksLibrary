import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from "chart.js";
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {Book} from "../book";

@Component({
  selector: 'app-books-chart',
  templateUrl: './books-chart.component.html',
  styleUrls: ['./books-chart.component.css']
})
export class BooksChartComponent implements OnChanges {

  @Input() books:Book[] = [];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {datasets: [], labels: []} ;

  ngOnChanges(changes: SimpleChanges): void  {
    const books :Book[] = changes['books'].currentValue;
    const booksPublishingYears = books.map(b => new Date(b.publishingDate).getFullYear()).sort();
    let mappedYears = new Map<number, number>();
    for (const num of booksPublishingYears) {
      if (mappedYears.has(num)) {
        mappedYears.set(num, mappedYears.get(num)! + 1);
      } else {
        mappedYears.set(num, 1);
      }
    }
    this.barChartData = {
      labels : Array.from(mappedYears.keys()),
      datasets: [
        {data : Array.from(mappedYears.values()), label:"К-сть книг на рік"}
      ]
    }
  }
}
