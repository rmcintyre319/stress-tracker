import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators, FormGroup, NgForm } from '@angular/forms';

let stress_data = [];
let calorie_data = [];
let date_data = [];
let stress_values = ["None","Low","Average","High","Very High"];
let stress_equivalent = [0, 250, 500, 750, 1000];


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
  public barChartLabels = date_data;
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: calorie_data, label: 'Caloric Intake'},
    {data: stress_data, label: 'Stress Levels'}
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
    event: new FormControl('',[]),
    intake: new FormControl('', [
      Validators.required
    ])
  });


  ngOnInit() {
  }

  user_submit() {
    calorie_data.push(this.userEntryForm.value.intake);
    console.log(stress_equivalent[stress_values.indexOf(this.userEntryForm.value.stress)]);
    stress_data.push(stress_equivalent[stress_values.indexOf(this.userEntryForm.value.stress)]);
    date_data.push(this.userEntryForm.value.date);
  }

}
