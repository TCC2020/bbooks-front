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

@Component({
    selector: 'app-offer-view',
    templateUrl: './offer-view.component.html',
    styleUrls: ['./offer-view.component.scss']
})
export class OfferViewComponent implements OnInit {
    slideIndex = 0;
    bookAdTO: BookAdTO;
    book: Book = new Book();

    constructor(
        public bookService: BookService,
        public gBookService: GoogleBooksService,
        private translate: TranslateService,
        private route: ActivatedRoute,
        public bookAdsService: BookAdsService,
        public authService: AuthService,
        public router: Router
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
                }, error => {
                    Util.stopLoading();
                    console.log('error book id', error);
                });
        }
    }
    getBook() {
        Util.loadingScreen();
        if (this.bookAdTO.idBookGoogle) {
            this.gBookService.getById(this.bookAdTO.idBookGoogle).subscribe(b => {
                const book = this.bookService.convertBookToModel(b);
                this.book = book;
                this.bookAdTO.images.push(this.book.image);
                this.bookAdTO.images.push('https://a-static.mlcdn.com.br/618x463/livro-a-ultima-carta-de-amor-capa-nova/magazineluiza/222756700/b6d0f7fc07d8eb8c82070cc46c38df92.jpg');
                this.bookAdTO.images.push('data:image/jpeg;base64,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');
                this.currentSlide(0);
                Util.stopLoading();
            });
        } else {
            // tslint:disable-next-line:radix
            this.bookService.getById(Number.parseInt(this.bookAdTO.bookId)).subscribe(b => {
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
