import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadComponent} from '../../upload/upload.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth.service';
import {Book} from '../../../models/book.model';
import {SearchBookComponent} from '../../shared/search-book/search-book.component';
import {BookCondition} from '../../../models/enums/BookCondition.enum';
import {map, startWith, take} from 'rxjs/operators';
import {Util} from '../../shared/Utils/util';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {BookAdTO} from '../../../models/BookAdTO.model';
import {BookService} from '../../../services/book.service';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookAdsService} from '../../../services/book-ads.service';
import {CDNService} from '../../../services/cdn.service';
import {flatMap} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs';
import {ConsultaCepService} from '../../../services/consulta-cep.service';
import {City} from '../../../models/city.model';
import {Country} from '../../../models/country.model';
import {State} from '../../../models/state.model';

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

    public citys: City[];
    public countrys: Country[];
    public states: State[];
    filteredOptionsCity: Observable<City[]>;


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
        public cdnService: CDNService,
        private consultaCepService: ConsultaCepService,
    ) {
    }

    ngOnInit(): void {
        this.createForm();
        this.getOffer();
        this.consultaCepService.getCountry()
            .pipe(take(1))
            .subscribe(result => {
                this.countrys = result;
                const country = this.countrys.find(c => c.name.includes(this.formNewOffer.get('country').value));
                this.getStates(country);
            });

    }

    getStates(country: Country) {
        Util.loadingScreen();
        if (country.id.toString().includes('3469034')) {
            this.consultaCepService.getStatesBr().subscribe(
                res => {
                    this.states = res;
                    Util.stopLoading();
                },
                error => console.log('error states', error)
            );
        } else {
            this.consultaCepService.getStates(country.id).subscribe(
                res => {
                    this.states = res;
                    Util.stopLoading();
                },
                error => console.log('error states', error)
            );
        }
    }

    getCitys(state: State) {
        Util.loadingScreen();
        if (state.sigla) {
            this.consultaCepService.getCitysBr(state.id).subscribe(
                res => {
                    this.citys = res;
                    this.filteredOptionsCity = this.formNewOffer.get('city').valueChanges.pipe(
                        startWith(''),
                        map(value => this._filterCity(value))
                    );
                    Util.stopLoading();
                },
                error => console.log('error get citys', error)
            );

        } else {
            this.consultaCepService.getCitys(state.id).subscribe(
                res => {
                    this.citys = res;
                    this.filteredOptionsCity = this.formNewOffer.get('city').valueChanges.pipe(
                        startWith(''),
                        map(value => this._filterCity(value))
                    );
                    Util.stopLoading();
                },
                error => console.log('error get citys', error)
            );
        }

    }

    private _filterCity(value: string): City[] {
        const filterValue = value.toLowerCase();
        return this.citys.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

    verificaValidToTouched(campo: string) {
        return this.formNewOffer.get(campo).invalid || this.formNewOffer.get(campo).touched;
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
            title: new FormControl(this.bookAdTO ? this.bookAdTO.title : null, Validators.required),
            condition: new FormControl(this.bookAdTO ? this.bookAdTO.condition : BookCondition.not_used, Validators.required),
            description: new FormControl(this.bookAdTO ? this.bookAdTO.description : null, Validators.required),
            userId: new FormControl(this.authService.getUser().id),
            address: new FormControl(this.bookAdTO ? this.bookAdTO.address : null),
            contact: new FormControl(this.bookAdTO ? this.bookAdTO.contact : null, Validators.required),
            images: new FormControl(null),
            country: new FormControl(this.bookAdTO ? this.bookAdTO.address.split(';')[0] : '', Validators.required),
            city: new FormControl(this.bookAdTO ? this.bookAdTO.address.split(';')[2] : '', Validators.required),
            state: new FormControl(this.bookAdTO ? this.bookAdTO.address.split(';')[1] : '', Validators.required),
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
    }

    saveBookAd(): void {
        Util.loadingScreen();
        this.setAddress();
        this.bookAdsService.create(this.formNewOffer.value)
            .pipe(take(1))
            .subscribe((bookAd) => {
                this.uploadImages(bookAd);
            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error save BookAD', error);
            });
    }

    setAddress(): void {
        const country = this.formNewOffer.get('country').value;
        const state = this.formNewOffer.get('state').value;
        const city = this.formNewOffer.get('city').value;
        const address = country + ';' + state + ';' + city;
        this.formNewOffer.get('address').setValue(address);
    }

    update(): void {
        Util.loadingScreen();
        this.setAddress();
        this.getImagesChanges();
        this.formNewOffer.get('images').setValue(this.bookAdTO.images);

        this.bookAdsService.update(this.formNewOffer.value)
            .pipe(take(1))
            .subscribe(bookAdTo => {
                this.uploadImages(bookAdTo);
            }, error => {
                Util.stopLoading();
                this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                    Util.showErrorDialog(message);
                });
                console.log('error update BookAD', error);
            });
    }

    uploadImagesUpdate(bookAd: BookAdTO): Observable<any> {
        let observableUpload;
        if (this.filesSend[0]) {
            observableUpload = this.uploadFile(0, bookAd.id);
        }
        if (this.filesSend[1]) {
            if (observableUpload) {
                observableUpload = observableUpload.pipe(
                    flatMap(() => this.uploadFile(1, bookAd.id))
                );
            } else {
                observableUpload = this.uploadFile(1, bookAd.id);
            }
        }
        if (this.filesSend[2]) {
            if (observableUpload) {
                observableUpload = observableUpload.pipe(
                    flatMap(() => this.uploadFile(2, bookAd.id))
                );
            } else {
                observableUpload = this.uploadFile(2, bookAd.id);
            }
        }
        return observableUpload;
    }

    getImagesChanges(): void {
        if (this.filesSend[0]) {
            this.bookAdTO.images[0] = null;
            this.bookAdTO.images.splice(0, 0);
        }
        if (this.filesSend[1]) {
            this.bookAdTO.images[1] = null;
            this.bookAdTO.images.splice(1, 1);
        }
        if (this.filesSend[2]) {
            this.bookAdTO.images[2] = null;
            this.bookAdTO.images.splice(2, 1);
        }
    }

    uploadFile(positionFile: number, id: string): Observable<any> {
        return this.cdnService.uploadFeedApi(
            {file: this.filesSend[positionFile], type: 'image'},
            {objectType: 'book_ad_id', bookAdId: id}
        );
    }

    uploadImages(bookAd: BookAdTO): void {
        const upload = this.uploadImagesUpdate(bookAd);
        if (upload) {
            Util.loadingScreen();
            upload.pipe(take(1))
                .subscribe(r => {
                        Util.stopLoading();
                        this.router.navigateByUrl('/exchange/my-offers');
                    },
                    error => {
                        Util.stopLoading();
                        this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                            Util.showErrorDialog(message);
                        });
                        console.log('error save images BookAD', error);
                    });
        } else {
            Util.stopLoading();
            this.router.navigateByUrl('/exchange/my-offers');
        }


    }

    bookIsSelected(): boolean {
        return this.book.id ? true : false;
    }

    verifyFormUpdate(): boolean {
        if (this.formNewOffer.invalid) {
            return true;
        }
        if (this.bookAdTO.images.length !== 0) {
            return false;
        } else {
            return this.files.length === 0;
        }
        return !this.bookIsSelected();
    }
}
