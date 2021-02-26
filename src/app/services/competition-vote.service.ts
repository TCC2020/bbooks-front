import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CompetitionTO} from '../models/competitionTO.model';
import {Observable} from 'rxjs';
import {CompetitionVoteReturnTO} from '../models/competitionVoteReturnTO.model';
import {CompetitionVotesSaveTO} from '../models/competitionVotesSaveTO.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionVoteService {

  api: string = environment.api + 'competitions/votes/';

  constructor(private http: HttpClient) { }

  getVotesByMember(memberId: string): Observable<CompetitionVoteReturnTO[]> {
    return this.http.get<CompetitionVoteReturnTO[]>(this.api + memberId);
  }
  vote(vote: CompetitionVotesSaveTO): Observable<CompetitionVoteReturnTO> {
    return this.http.post<CompetitionVoteReturnTO>(this.api, vote);
  }
  updateVote(voteId: string, vote: CompetitionVotesSaveTO): Observable<CompetitionVoteReturnTO> {
    return this.http.put<CompetitionVoteReturnTO>(this.api + voteId, vote);
  }
  deleteVote(id: string): Observable<void> {
    return this.http.delete<void>(this.api + id);
  }
}
