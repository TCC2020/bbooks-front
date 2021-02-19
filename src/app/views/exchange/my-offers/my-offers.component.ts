import {Component, OnInit} from '@angular/core';
import {ExchangeService} from '../../../services/exchange.service';
import {BookAdTO} from '../../../models/BookAdTO.model';
import {Observable, of, Subject} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';
import {map, take} from 'rxjs/operators';
import {Util} from '../../shared/Utils/util';

@Component({
    selector: 'app-my-offers',
    templateUrl: './my-offers.component.html',
    styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {
    booksAdsTo: Observable<BookAdTO[]>;

    constructor(
        public exchangeService: ExchangeService,
        public authService: AuthService,
        public router: Router,
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void {
        this.booksAdsTo =
            this.exchangeService.getAllByUser(this.authService.getUser().id);
    }

    edit(id: string): void {
        this.router.navigate(['/exchange/my-offers/edit/', id]);
    }

    delete(id: string): void {
        this.translate.get('EXCHANGE.EXLUIR_OFFER').subscribe(message => {
            // @ts-ignore
            Swal.fire({
                icon: 'warning',
                text: message,
                showConfirmButton: true,
                confirmButtonText: 'Yes',
                showCancelButton: true,
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.value) {
                    Util.loadingScreen();
                    this.exchangeService.delete(id)
                        .pipe(take(1))
                        .subscribe(() => {
                                Util.stopLoading();
                                this.translate.get('EXCHANGE.OFFER_EXCLUIDA').subscribe(msg => {
                                    Util.showSuccessDialog(msg);
                                });
                                this.booksAdsTo = this.booksAdsTo.pipe(
                                    map(ba => ba.filter(i => i.id !== id))
                                );
                            },
                            error => {
                                Util.stopLoading();
                                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(msg => {
                                    Util.showErrorDialog(msg);
                                });
                                console.log('error delete offer', error);
                            });
                }
            });
        });

    }

}
