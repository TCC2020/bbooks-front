import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    @ViewChild('lastChat') lastChat: ElementRef;

    constructor() {
    }

    ngOnInit(): void {

    }

    goToDown() {
        this.lastChat.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
}
