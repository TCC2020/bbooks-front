import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ExchangeT0} from '../../../models/exchangeT0,model';
import {ExchangeService} from '../../../services/exchange.service';
import {AuthService} from '../../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {BookExchangeStatus} from '../../../models/enums/BookExchangeStatus.enum';
import {Util} from '../../shared/Utils/util';
import {map, take} from 'rxjs/operators';

@Component({
    selector: 'app-exchange-sent',
    templateUrl: './exchange-sent.component.html',
    styleUrls: ['./exchange-sent.component.scss']
})
export class ExchangeSentComponent implements OnInit {
    public exchanges$: Observable<ExchangeT0[]>;
    exchangeStatus = BookExchangeStatus;


    constructor(
        public exchangeService: ExchangeService,
        public authService: AuthService,
        public translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.exchanges$ = this.exchangeService.getByUserSent(this.authService.getUser().id);
    }
    cancel(id: string): void {
        Util.loadingScreen();
        this.exchangeService.cancel(id)
            .pipe(take(1))
            .subscribe(r => {
                Util.stopLoading();
                this.updateStatus(r.id, BookExchangeStatus.canceled);
            }, error => {
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error accpet offer', error);
            });
    }

    updateStatus(id: string, status: BookExchangeStatus): void {
        this.exchanges$ = this.exchanges$.pipe(
            map(exchanges => {
                return exchanges.map( e => {
                    if (e.id === id) {
                        e.status = status;
                    }
                    return e;
                });
            })
        );
    }

}
