import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'stress-tracker';

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['3/1', '3/2', '3/3', '3/4', '3/5', '3/6', '3/7'];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: [2000, 2111, 1951, 1352, 2701, 2051, 2031], label: 'Caloric Intake'},
    {data: [2000, 2000, 2000, 3000, 2000, 2000, 2750], label: 'Stress Levels'}
  ];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  ngOnInit() {
  }
}
