import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadComponent} from '../../upload/upload.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth.service';
import {Book} from '../../../models/book.model';
import {SearchBookComponent} from '../../shared/search-book/search-book.component';
import {BookCondition} from '../../../models/enums/BookCondition.enum';
import { take} from 'rxjs/operators';
import {Util} from '../../shared/Utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {BookAdTO} from '../../../models/BookAdTO.model';
import {BookService} from '../../../services/book.service';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookAdsService} from '../../../services/book-ads.service';
import {CDNService} from '../../../services/cdn.service';
import {flatMap} from 'rxjs/internal/operators';
import {of} from 'rxjs';

@Component({
    selector: 'app-offer-new',
    templateUrl: './offer-new.component.html',
    styleUrls: ['./offer-new.component.scss']
})
export class OfferNewComponent implements OnInit {
    isLinear = false;
    formNewOffer: FormGroup;
    files = [];
    book: Book = new Book();
    bookCondition = BookCondition;
    bookAdTO: BookAdTO;
    filesSend = [];

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        public authService: AuthService,
        public bookAdsService: BookAdsService,
        public router: Router,
        public bookService: BookService,
        public gBookService: GoogleBooksService,
        private translate: TranslateService,
        private route: ActivatedRoute,
        public cdnService: CDNService
    ) {
    }

    ngOnInit(): void {
        this.createForm();
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
                    this.createForm();
                    this.getBook();
                }, error => {
                    Util.stopLoading();
                    console.log('error book id', error);
                });
        }
    }

    getBook(): void {
        Util.loadingScreen();
        if (this.bookAdTO.idBookGoogle) {
            this.gBookService.getById(this.bookAdTO.idBookGoogle).subscribe(b => {
                const book = this.bookService.convertBookToModel(b);
                this.book = book;
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

    private createForm(): void {
        this.formNewOffer = this.formBuilder.group({
            id: new FormControl(this.bookAdTO ? this.bookAdTO.id : null),
            condition: new FormControl(this.bookAdTO ? this.bookAdTO.condition : null, Validators.required),
            description: new FormControl(this.bookAdTO ? this.bookAdTO.description : null, Validators.required),
            userId: new FormControl(this.authService.getUser().id),
            images: this.formBuilder.array([]),
            idBookGoogle: new FormControl(this.bookAdTO ? this.bookAdTO.idBookGoogle : null),
            bookId: new FormControl(this.bookAdTO ? this.bookAdTO.bookId : null)
        });
    }

    openDialogSearchBook(): void {
        const dialogRef = this.dialog.open(SearchBookComponent, {
            height: '600px',
            width: '600px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.book = result;
                if (this.book.api === 'google') {
                    this.formNewOffer.get('idBookGoogle').setValue(this.book.id);
                    this.formNewOffer.get('bookId').setValue(null);
                } else {
                    this.formNewOffer.get('bookId').setValue(this.book.id);
                    this.formNewOffer.get('idBookGoogle').setValue(null);
                }
            }
        });
    }

    openDialogUpload(position: number) {
        const dialogRef = this.dialog.open(UploadComponent, {
            height: '350px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.readFile(position, result);
                // this.formCadastro2.get('image').setValue(result.name);
            }
        });
    }

    readFile(position: number, file: any) {
        this.filesSend[position] = file;
        this.files[position] = file;
        const reader = new FileReader();
        reader.onload = (e) => this.files[position] = e.target.result;
        reader.readAsDataURL(this.files[position]);
        console.log(this.files);
        console.log(this.filesSend);
    }

    saveBookAd(): void {
        Util.loadingScreen();
        this.bookAdsService.create(this.formNewOffer.value)
            .pipe(take(1))
            .subscribe((bookAd) => {
                this.cdnService.uploadFeedApi(
                    {file: this.filesSend[0], type: 'image'},
                    {objectType: 'book_ad_id', bookAdId: bookAd.id}
                )
                    .pipe(
                        take(1),
                        flatMap(() => {
                            if (this.filesSend[1]) {
                                return this.cdnService.uploadFeedApi(
                                    {file: this.filesSend[1], type: 'image'},
                                    {objectType: 'book_ad_id', bookAdId: bookAd.id}
                                    );
                            }
                            return of({});
                        }),
                        flatMap(() => {
                            if (this.filesSend[2]) {
                                return this.cdnService.uploadFeedApi(
                                    {file: this.filesSend[2], type: 'image'},
                                    {objectType: 'book_ad_id', bookAdId: bookAd.id}
                                );
                            }
                            return of({});
                        })
                    )
                    .subscribe(r => {
                            this.router.navigateByUrl('/exchange/my-offers');
                            Util.stopLoading();
                        },
                        error => {
                            Util.stopLoading();
                            this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                                Util.showErrorDialog(message);
                            });
                            console.log('error save images BookAD', error);
                        });
            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error save BookAD', error);
            });
    }

    update(): void {
        Util.loadingScreen();
        this.bookAdsService.update(this.formNewOffer.value)
            .pipe(take(1))
            .subscribe(() => {
                this.cdnService.uploadFeedApi({file: this.filesSend[0], type: 'image'}, {objectType: 'book_ad_id'})
                    .pipe(take(1))
                    .subscribe(r => {
                            console.log('deu bom');
                        },
                        error => {
                            console.log('deu ruim', error);
                        });
                // this.filesSend.forEach(f => {
                //     this.cdnService.uploadFeedApi({file: f, type: 'image'}, {objectType: 'book_ad_id'})
                //         .pipe(take(1))
                //         .subscribe(r => {
                //                 console.log('deu bom');
                //             },
                //             error => {
                //                 console.log('deu ruim', error);
                //             })
                // });
                Util.stopLoading();
                this.router.navigateByUrl('/exchange/my-offers');
            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error update BookAD', error);
            });
    }
}
