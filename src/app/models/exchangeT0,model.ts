import {BookAdTO} from './BookAdTO.model';
import {BookExchangeStatus} from './enums/BookExchangeStatus.enum';

export class ExchangeT0 {
    id: string;
    status: BookExchangeStatus;
    exchangeDate: Date;
    creationDate: Date;
    requesterId: string;
    receiverId: string;
    requesterAds: BookAdTO[];
    receiverAds: BookAdTO[];
}
