import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {take} from 'rxjs/operators';
import {ChatTO} from '../../models/chatTO.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    @ViewChild('lastChat') lastChat: ElementRef;

    chatTO: ChatTO;

    constructor(
        private chatService: ChatService
    ) {
    }

    ngOnInit(): void {

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
        if (!this.chatTO) {
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
}
