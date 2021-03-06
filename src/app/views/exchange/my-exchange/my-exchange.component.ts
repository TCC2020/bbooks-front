import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-my-exchange',
    templateUrl: './my-exchange.component.html',
    styleUrls: ['./my-exchange.component.scss']
})
export class MyExchangeComponent implements OnInit {
    links = ['received', 'sent'];

    constructor() {
    }

    ngOnInit(): void {
    }

}
