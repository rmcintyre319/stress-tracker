import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';
let stress_data = [];
let calorie_data = [];
let date_data = [];
let stress_values = ["None","Low","Average","High","Very High"];
let stress_equivalent = [1000, 1500, 2000, 2500, 3000];
let general_type = "No trend.";
let general_desc = "Based on the data inputted, there appears to be no trend between stress and eating habits.";
let slight_p_type = "Slight positive trend.";
let slight_p_desc = "Based on the data inputted, you tend to eat slightly more when under stress.";
let heavy_p_type = "Significant positive trend.";
let heavy_p_desc = "Based on the data inputted, you tend to eat considerably more when under stress.";
let slight_n_type = "Slight negative trend.";
let slight_n_desc = "Based on the data inputted, you tend to eat slightly less when under stress.";
let heavy_n_type = "Significant negative trend.";
let heavy_n_desc = "Based on the data inputted, you tend to eat significantly less when under stress.";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'stress-tracker';
  s_type = general_type;
  s_desc = general_desc;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = date_data;
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: calorie_data, label: 'Caloric Intake'},
    {data: stress_data, label: 'Stress Level'}
  ];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  userEntryForm = new FormGroup({
    date: new FormControl('', [
      Validators.required
    ]),
    stress: new FormControl('', [
      Validators.required
    ]),
    intake: new FormControl('', [
      Validators.required
    ])
  });


  ngOnInit() {
  }

  find_trend(x_vals, y_vals) {
    var trend = 0;
    var val_count = 0;
    var x_total = 0;
    var y_total = 0;
    var xy = 0;
    var xx = 0;

    for (var i = 0; i < x_vals.length; i++) {
      var x = x_vals[i];
      var y = y_vals[i];
      x_total += x;
      y_total += y;
      xx += x*x;
      xy += x*y;
      val_count++;
    }

    trend = (val_count*xy - (x_total * y_total)) / (val_count*xx - x_total*x_total);
    return trend;
  }

  update_trend(trend) {
    if (trend < 0.1 && trend > -0.1 || isNaN(trend)) { //no trend
      this.s_type = general_type;
      this.s_desc = general_desc;
    }
    else if (trend >= 0.1 && trend < 0.5) { //slight positive
      this.s_type = slight_p_type;
      this.s_desc = slight_p_desc;
    }
    else if (trend >= 0.5) { //considerable positive
      this.s_type = heavy_p_type;
      this.s_desc = heavy_p_desc;
    }
    else if (trend <= -0.1 && trend > -1) { //slight negative
      this.s_type = slight_n_type;
      this.s_desc = slight_n_desc;
    }
    else { //considerable negative
      this.s_type = heavy_n_type;
      this.s_desc = heavy_n_desc;
    }
  }

  user_submit() {
    calorie_data.push(this.userEntryForm.value.intake);
    //console.log(stress_equivalent[stress_values.indexOf(this.userEntryForm.value.stress)]);
    stress_data.push(stress_equivalent[stress_values.indexOf(this.userEntryForm.value.stress)]);
    const format = 'MM/dd';
    const locale = 'en-us';
    date_data.push(formatDate(this.userEntryForm.value.date, format, locale));
    var trend = this.find_trend(stress_data, calorie_data);
    //console.log(trend);
    this.update_trend(trend);

  }



}
