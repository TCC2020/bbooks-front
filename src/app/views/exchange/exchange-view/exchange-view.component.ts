import {Component, OnInit} from '@angular/core';
import {ExchangeService} from '../../../services/exchange.service';
import {AuthService} from '../../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, take} from 'rxjs/operators';
import {Util} from '../../shared/Utils/util';
import {ExchangeT0} from '../../../models/exchangeT0,model';
import {BookExchangeStatus} from '../../../models/enums/BookExchangeStatus.enum';
import {BarCodeScannerComponent} from '../../shared/bar-code-scanner/bar-code-scanner.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-exchange-view',
    templateUrl: './exchange-view.component.html',
    styleUrls: ['./exchange-view.component.scss']
})
export class ExchangeViewComponent implements OnInit {
    exchange: ExchangeT0;
    exchangeStatus = BookExchangeStatus;
    urlLinkToken = '';
    timeLeft = 59;
    hour = 4;
    interval;

    constructor(
        public exchangeService: ExchangeService,
        public authService: AuthService,
        public translate: TranslateService,
        public router: Router,
        public route: ActivatedRoute,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.route.params.pipe(
            map(p => p.id)
        ).subscribe(result => {
            this.getById(result);
        });
    }

    getById(id: string): void {
        Util.loadingScreen();
        this.exchangeService.getById(id)
            .pipe(take(1))
            .subscribe(r => {
                Util.stopLoading();
                this.exchange = r;
            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error get book ad', error);
            });
    }

    cancel(id: string): void {
        Util.loadingScreen();
        this.exchangeService.cancel(id)
            .pipe(take(1))
            .subscribe(r => {
                Util.stopLoading();
                this.exchange.status = BookExchangeStatus.canceled;
            }, error => {
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error accpet offer', error);
            });
    }

    accept(id: string): void {
        Util.loadingScreen();
        this.exchangeService.accept(id)
            .pipe(take(1))
            .subscribe(r => {
                Util.stopLoading();
                this.exchange.status = BookExchangeStatus.accepted;
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
                this.exchange.status = BookExchangeStatus.refused;
            }, error => {
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error accpet offer', error);
            });
    }

    generateQRCode(): void {
        Util.loadingScreen();
        this.exchangeService.generateToken(this.exchange.id)
            .pipe(take(1))
            .subscribe(r => {
                Util.stopLoading();
                this.urlLinkToken = r.token;
                this.startTimer();
            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error gerar token', error);
            });
    }


    startTimer() {
        this.interval = setInterval(() => {
            if (this.hour === 0) {
                this.pauseTimer();
                this.urlLinkToken = '';
            }
            if (this.timeLeft > 0) {
                this.timeLeft--;
            } else {
                this.hour--;
                this.timeLeft = 59;
            }
            this.exchangeService.getById(this.exchange.id)
                .pipe(take(1))
                .subscribe(r => {
                    if (r.status === this.exchangeStatus.exchanged) {
                        this.exchange.status = this.exchangeStatus.exchanged;
                        this.translate.get('EXCHANGE.TROCA_EFETUADA').subscribe(message => {
                            Util.showSuccessDialog(message);
                        });
                        this.pauseTimer();
                    }
                }, error => {
                    Util.stopLoading();
                    this.pauseTimer();
                    this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                    console.log('error get book ad', error);
                });
        }, 1000);
    }

    pauseTimer() {
        clearInterval(this.interval);
    }

    readCodeBar(): void {
        const dialogRef = this.dialog.open(BarCodeScannerComponent, {
            height: '600px',
            width: '900px',
            data: {
                isExchange: true
            }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.exchangeService.exchangeByToken(result)
                    .pipe(take(1))
                    .subscribe(() => {
                        this.exchange.status = this.exchangeStatus.exchanged;
                        this.translate.get('EXCHANGE.TROCA_EFETUADA').subscribe(message => {
                            Util.showSuccessDialog(message);
                        });
                    }, error => {
                        this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                            Util.showErrorDialog(message);
                        });
                        console.log('error token exchange', error);
                    });
            }
        });
    }

    isReceiver(): boolean {
        return this.exchange.receiverId === this.authService.getUser().id ? true : false;
    }
}
