import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Plan} from '../../app.component';
import { jsPDF } from "jspdf";

@Component({
    selector: 'app-finish-page',
    templateUrl: './finish-page.component.html',
    styleUrls: ['./finish-page.component.css']
})
export class FinishPageComponent implements OnInit {
    @Input() plans: Plan[] = [];

    @Input() experts: string[] = [];

    @Output()
    changePage = new EventEmitter<number>();

    ngOnInit(): void {
        this.plans.map((plan) => plan.rang = (plan.ex1 + plan.ex2 + plan.ex3) / 3);
        this.plans.map((plan) => plan.medrang = this.median([plan.ex1, plan.ex2, plan.ex3]));
        this.plans.sort((plan1, plan2) => plan1.rang - plan2.rang);
    }

    median(values: number[]): number {
        values.sort(function (a, b) {
            return a - b;
        });
        const half = Math.floor(values.length / 2);
        if (values.length % 2)
            return values[half];
        return (values[half - 1] + values[half]) / 2;
    }

    toStart() {
        this.changePage.next(0);
    }

    about() {
        this.changePage.next(3);
    }

    toPDF() {
        const doc = new jsPDF();
        doc.text("Hello", 1, 1)
        // doc.lines(this.plans, 10, 10, [1, 1]);
        doc.save("otchet.pdf");
    }
}
