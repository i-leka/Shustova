import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Plan} from '../../app.component';

@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
    @Input() plans: Plan[] = [];

    @Input() experts: string[] = [];

    @Output()
    calculate = new EventEmitter<{ experts: string[], plans: Plan[], num: number }>();

    namePlan = '';

    ex1 = 0;
    ex2 = 0;
    ex3 = 0;

    ngOnInit() {
        if (this.experts.length === 0) {
            this.experts = ['Эксперт 1', 'Эксперт 2', 'Эксперт 3'];
        }
    }

    addPlan(): void {
        this.plans.push({
            num: this.plans.length + 1,
            name: this.namePlan,
            rang: 0,
            ex1: this.ex1,
            ex2: this.ex2,
            ex3: this.ex3,
            medrang: 0,
        });
        this.namePlan = '';
    }

    deletePlan(planNum: number) {
        this.plans = this.plans.filter((plan) => plan.num !== planNum);
    }

    removePlans() {
        this.plans = [];
    }

    calc() {
        this.calculate.next({experts: this.experts, plans: this.plans, num: 2});
    }
}
