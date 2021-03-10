import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChatTO} from '../models/chatTO.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  api: string = environment.node + 'chat/';

  constructor(
      private http: HttpClient
  ) { }

  getChat(chatId: string): Observable<ChatTO> {
    return this.http.get<ChatTO>(this.api + chatId);
  }

  createChat(exchandedId: string): Observable<ChatTO> {
    return this.http.post<ChatTO>(this.api, exchandedId);
  }

  sendMessage(chatTO: ChatTO): Observable<ChatTO> {
    return this.http.put<ChatTO>(this.api + chatTO.chatId, chatTO);
  }
}
