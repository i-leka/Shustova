import {Component} from '@angular/core';
import * as XLSX from 'xlsx';

export interface Plan {
    num: number,
    name: string,
    rang: number,
    ex1: number,
    ex2: number,
    ex3: number;
    medrang: number,
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    stepNum = 0;

    arrayBuffer: any;

    plans: Plan[] = [];

    experts: string[] = [];

    openForm() {
        this.stepNum = 1;
    }

    calculate(e: { experts: string[], plans: Plan[], num: number }) {
        this.plans = e.plans;
        this.experts = e.experts;
        this.stepNum = e.num;
    }

    changePage(e: number) {
        this.stepNum = e;
    }

    fileChosen(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files?.length) {
            const file: File = target.files[0];
            let fileReader = new FileReader();
            fileReader.onload = (e) => {
                this.arrayBuffer = fileReader.result;
                const data = new Uint8Array(this.arrayBuffer);
                const arr = [];
                for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                const bstr = arr.join('');
                const workbook = XLSX.read(bstr, {type: 'binary'});
                const first_sheet_name = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[first_sheet_name];
                const plans: Object[] = XLSX.utils.sheet_to_json(worksheet, {raw: true});
                this.plans = plans.map((plan, index) => {
                    let p: Plan = {
                        num: 0,
                        name: '',
                        rang: 0,
                        ex1: 0,
                        ex2: 0,
                        ex3: 0,
                        medrang: 0,
                    };
                    Object.entries(plan).forEach(([key, value], i) => {
                        if (index === 0 && i > 1) {
                            this.experts.push(key);
                        }
                        switch (i) {
                            case 0:
                                p.num = value;
                                break;
                            case 1:
                                p.name = value;
                                break;
                            case 2:
                                p.ex1 = value;
                                break;
                            case 3:
                                p.ex2 = value;
                                break;
                            case 4:
                                p.ex3 = value;
                                break;
                        }
                    });
                    return p;
                });
            }
            fileReader.readAsArrayBuffer(file);
        }
        this.stepNum = 1;
    }
}
