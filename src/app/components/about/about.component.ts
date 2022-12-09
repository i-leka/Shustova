import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Output()
  changePage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  toStart() {
    this.changePage.next(0);
  }
}
