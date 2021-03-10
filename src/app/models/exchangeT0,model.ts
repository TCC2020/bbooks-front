import {BookAdTO} from './BookAdTO.model';
import {BookExchangeStatus} from './enums/BookExchangeStatus.enum';
import {UserTO} from './userTO.model';

export class ExchangeT0 {
    id: string;
    status: BookExchangeStatus;
    exchangeDate: Date;
    creationDate: Date;
    requesterId: string;
    receiverId: string;
    receiver: UserTO;
    requester: UserTO;
    requesterAds: BookAdTO[];
    receiverAds: BookAdTO[];
    chatId: string;
}
