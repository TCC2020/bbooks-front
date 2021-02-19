import {Component, OnInit} from '@angular/core';
import {ExchangeService} from '../../../services/exchange.service';
import {BookAdTO} from '../../../models/BookAdTO.model';
import {Observable} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

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
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.booksAdsTo = this.exchangeService.getAllByUser(this.authService.getUser().id);
    }
    edit(id: string): void {
        this.router.navigate(['/exchange/my-offers/edit/', id]);
    }

}
