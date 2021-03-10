import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {startWith, switchMap, take} from 'rxjs/operators';
import {ChatTO} from '../../models/chatTO.model';
import {interval, Subscription} from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('lastChat') lastChat: ElementRef;

    timeInterval: Subscription;
    chatTO: ChatTO;

    constructor(
        private chatService: ChatService
    ) {
    }

    ngOnInit(): void {
        this.getChat();
        this.refresh();

    }

    ngOnDestroy() {
        this.timeInterval.unsubscribe();
    }

    ngAfterViewInit() {
        this.goToDown();
    }

    goToDown() {
        this.lastChat.nativeElement.scrollIntoView({behavior: 'smooth'});
    }


    getChat() {
        this.chatService.getChat('chatId')
            .pipe(take(1))
            .subscribe(result => {
                this.chatTO = result;
            });
    }

    verifyChat() {
        if (!this.chatTO.chatId) {
            this.chatService.createChat('exchangeId')
                .pipe(take(1))
                .subscribe(result => {
                    this.chatTO = result;
                });
        }
    }

    sendMessage() {
        this.chatService.sendMessage(this.chatTO)
            .pipe(take(1))
            .subscribe(() => {
                console.log('Mensagem enviada!');
            });
    }

    refresh() {
        if (this.chatTO) {
            this.timeInterval = interval(500)
                .pipe(
                    startWith(0),
                    switchMap(() => this.chatService.getChat(this.chatTO.chatId))
                ).subscribe(response => {
                    console.log(response);
                    this.chatTO = response;
                }, error => {
                    console.log(error);
                });
        }
    }
}
