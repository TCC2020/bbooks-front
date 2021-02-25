import {Component, OnInit} from '@angular/core';
import {ExchangeService} from '../../../services/exchange.service';
import {Observable} from 'rxjs';
import {ExchangeT0} from '../../../models/exchangeT0,model';
import {AuthService} from '../../../services/auth.service';
import {Util} from '../../shared/Utils/util';
import {map, take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {BookExchangeStatus} from '../../../models/enums/BookExchangeStatus.enum';

@Component({
    selector: 'app-exchange-received',
    templateUrl: './exchange-received.component.html',
    styleUrls: ['./exchange-received.component.scss']
})
export class ExchangeReceivedComponent implements OnInit {
    public exchanges$: Observable<ExchangeT0[]>;
    exchangeStatus = BookExchangeStatus;

    constructor(
        public exchangeService: ExchangeService,
        public authService: AuthService,
        public translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.exchanges$ = this.exchangeService.getByUserReceived(this.authService.getUser().id);
    }

    accept(id: string): void {
        Util.loadingScreen();
        this.exchangeService.accept(id)
            .pipe(take(1))
            .subscribe(r => {
                Util.stopLoading();
                this.updateStatus(r.id, BookExchangeStatus.accepted);
            }, error => {
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error accpet offer', error);
            });
    }

    refuse(id: string): void {
        Util.loadingScreen();
        this.exchangeService.refuse(id)
            .pipe(take(1))
            .subscribe(r => {
                Util.stopLoading();
                this.updateStatus(r.id, BookExchangeStatus.refused);
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
