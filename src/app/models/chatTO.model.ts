import {MessageChat} from './MessageChat.model';

export class ChatTO {
    chatId: string;
    exchangedId: string;
    messages: MessageChat[];
}
