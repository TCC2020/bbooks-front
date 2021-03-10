import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {startWith, switchMap, take} from 'rxjs/operators';
import {ChatTO} from '../../models/chatTO.model';
import {interval, Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CompetitionMemberTO} from '../../models/competitionMemberTO.model';
import {ExchangeService} from '../../services/exchange.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('lastChat') lastChat: ElementRef;

    timeInterval: Subscription;
    chatTO: ChatTO;
    chatId: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public exchangeId: string,
        private chatService: ChatService,
        public dialogRef: MatDialogRef<ChatComponent>,
        private exchangeService: ExchangeService
    ) {
    }

    ngOnInit(): void {
        this.getChatId();

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


    getChatId() {
        this.exchangeService.getById(this.exchangeId)
            .pipe(take(1))
            .subscribe(response => {
                this.chatId = response.chatId;
                console.log(this.chatId);
                this.verifyChat();
            });
    }

    getChat() {
        if (this.chatId) {
            this.chatService.getChat(this.chatId)
                .pipe(take(1))
                .subscribe(result => {
                    console.log(result);
                    this.chatTO = result;
                });
        }
    }

    verifyChat() {
        if (!this.chatId) {
            this.chatService.createChat(this.exchangeId)
                .pipe(take(1))
                .subscribe(result => {
                    this.chatTO = result;
                    this.getChat();
                });
        } else {
            this.getChat();
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
