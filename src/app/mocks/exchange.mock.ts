import {ExchangeT0} from '../models/exchangeT0,model';
import {userMock} from './user.model.mock';
import {bookAdsMock} from './book-ad.mock';
import {BookExchangeStatus} from '../models/enums/BookExchangeStatus.enum';

export const exchangeMock = new ExchangeT0();
exchangeMock.id = 'sdfjaseofjasoijefa';
exchangeMock.requester = userMock;
exchangeMock.receiver = userMock;
exchangeMock.receiverAds = bookAdsMock;
exchangeMock.status = BookExchangeStatus.accepted;
exchangeMock.receiverAds = bookAdsMock;

export const exchangesMock = [];
exchangesMock.push(exchangeMock);
exchangesMock.push(exchangeMock);
exchangesMock.push(exchangeMock);
exchangesMock.push(exchangeMock);
exchangesMock.push(exchangeMock);