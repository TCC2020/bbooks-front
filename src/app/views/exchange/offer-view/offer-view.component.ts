import {Component, OnInit} from '@angular/core';
import {Util} from '../../shared/Utils/util';
import {map, take} from 'rxjs/operators';
import {BookService} from '../../../services/book.service';
import {GoogleBooksService} from '../../../services/google-books.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookAdsService} from '../../../services/book-ads.service';
import {BookAdTO} from '../../../models/BookAdTO.model';
import {Book} from '../../../models/book.model';
import {AuthService} from '../../../services/auth.service';
import Swal from 'sweetalert2';
import {UserService} from '../../../services/user.service';
import {UserTO} from '../../../models/userTO.model';

@Component({
    selector: 'app-offer-view',
    templateUrl: './offer-view.component.html',
    styleUrls: ['./offer-view.component.scss']
})
export class OfferViewComponent implements OnInit {
    slideIndex = 0;
    bookAdTO: BookAdTO;
    book: Book = new Book();
    userOffer: UserTO;
    constructor(
        public bookService: BookService,
        public gBookService: GoogleBooksService,
        private translate: TranslateService,
        private route: ActivatedRoute,
        public bookAdsService: BookAdsService,
        public authService: AuthService,
        public router: Router,
        public userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.showSlides(this.slideIndex);
        this.getOffer();
    }

    getOffer(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            Util.loadingScreen();
            this.bookAdsService.getById(id)
                .pipe(take(1))
                .subscribe(res => {
                    Util.stopLoading();
                    this.bookAdTO = res;
                    this.getBook();
                    this.getUserOffer();
                }, error => {
                    Util.stopLoading();
                    console.log('error book id', error);
                });
        }
    }
    getUserOffer(): void {
        Util.loadingScreen();
        this.userService.getById(this.bookAdTO.userId)
            .pipe(take(1))
            .subscribe(user => {
                Util.stopLoading();
                this.userOffer = user;
            });
    }
    getBook() {
        Util.loadingScreen();
        if (this.bookAdTO.idBookGoogle) {
            this.gBookService.getById(this.bookAdTO.idBookGoogle)
                .pipe(take(1))
                .subscribe(b => {
                const book = this.bookService.convertBookToModel(b);
                this.book = book;
                this.bookAdTO.images.push(this.book.image);
                this.currentSlide(0);
                Util.stopLoading();
            });
        } else {
            // tslint:disable-next-line:radix
            this.bookService.getById(Number.parseInt(this.bookAdTO.bookId))
                .pipe(take(1))
                .subscribe(b => {
                this.book = b;
                Util.stopLoading();
            });
        }
    }

    showSlides(n) {
        let i;
        const slides = document.getElementsByClassName('mySlides');
        const dots = document.getElementsByClassName('demo');
        // const captionText = document.getElementById('caption');
        if (n > slides.length - 1) {
            this.slideIndex = 0;
        }
        if (n < 0) {
            this.slideIndex = slides.length - 1;
        }
        for (i = 0; i < slides.length; i++) {
            /* tslint:disable */
            slides[i]['style'].display = 'none';
            /* tslint:enable */
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace('active', '');
        }
        if (slides?.length > 0) {
            /* tslint:disable */
            slides[this.slideIndex]['style'].display = 'block';
            /* tslint:disable */
        }
        if (dots?.length > 0) {
            dots[this.slideIndex].className += ' active';
        }
//    captionText.innerHTML = dots[this.slideIndex - 1 ]['alt'];
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
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
                    this.bookAdsService.delete(id)
                        .pipe(take(1))
                        .subscribe(() => {
                                Util.stopLoading();
                                this.translate.get('EXCHANGE.OFFER_EXCLUIDA').subscribe(msg => {
                                    Util.showSuccessDialog(msg);
                                });
                                this.router.navigate(['/exchange/my-offers/']);
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
