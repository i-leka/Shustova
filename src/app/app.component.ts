import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  namePlan = '';

  plans: {num: number, name: string, rang: number}[] = [
    {num: 1, name: 'Поднятие корпоративного духа', rang: 3},
    {num: 2, name: 'Покупка нового ПО', rang: 2},
    {num: 3, name: 'Покупка нового оборудования', rang: 1},
    {num: 4, name: 'Расширение сервера', rang: 4},
  ];

  isRangCalc = true;

  addPlan(): void {
    this.plans.push({num: this.plans.length + 1, name: this.namePlan, rang: 0});
    this.namePlan = '';
  }
}
