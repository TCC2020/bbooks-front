import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CompetitionTO} from '../models/competitionTO.model';
import {Observable} from 'rxjs';
import {CompetitionMemberTO} from '../models/competitionMemberTO.model';
import {CompetitionMemberSaveTO} from '../models/competitionMemberSaveTO.model';
import {CompetitionPagination} from '../models/pagination/competition.pagination';
import {CompetitionMemberPagination} from '../models/pagination/competition-member.pagination';
import {Role} from '../models/enums/Role.enum';
import {LiteraryMemberStatus} from '../models/enums/LiteraryMemberStatus.enum';

@Injectable({
  providedIn: 'root'
})
export class CompetitionMemberService {

  api: string = environment.competitionApi + 'competitions/member/';

  constructor(private http: HttpClient) { }

  getMember(id: string): Observable<CompetitionMemberTO> {
    return this.http.get<CompetitionMemberTO>(this.api + id);
  }

  exitMember(id: string): Observable<void> {
    return this.http.delete<void>(this.api + id);
  }

  saveMember(memberTO: CompetitionMemberSaveTO): Observable<CompetitionMemberTO> {
    return this.http.post<CompetitionMemberTO>(this.api, memberTO);
  }
  updateMember(memberTO: CompetitionMemberSaveTO, id: string): Observable<CompetitionMemberTO> {
    return this.http.put<CompetitionMemberTO>(this.api + memberTO.memberId, memberTO);
  }
  getMembers(id: string, page: number, size: number): Observable<CompetitionMemberPagination> {
    const params = new HttpParams()
        .set('id', id)
        .set('page', page.toString())
        .set('size', size.toString());
    return this.http.get<CompetitionMemberPagination>(this.api + 'competitors/' + id, {params});
  }
  getCompetitionByProfile(id: number, page: number, size: number): Observable<CompetitionPagination> {
    const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    return this.http.get<CompetitionPagination>(this.api + 'profile/' + id, {params});
  }

  getMembersByRoleAndStatus(id: string, role: string, status: LiteraryMemberStatus): Observable<CompetitionMemberTO[]> {
    const params = new HttpParams()
        .set('role', role.toString())
        .set('status', status.toString());
    return this.http.get<CompetitionMemberTO[]>(this.api + 'role/' + id, {params});
  }

}
