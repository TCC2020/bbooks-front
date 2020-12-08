import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription, zip} from 'rxjs';
import {BookService} from '../../../services/book.service';
import {BookCase} from '../../../models/bookCase.model';
import {Book} from '../../../models/book.model';
import {MatDialog} from '@angular/material/dialog';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {BookStatus, getArrayStatus, mapBookStatus} from '../../../models/enums/BookStatus.enum';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, take} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'app-book-estante',
    templateUrl: './book-estante.component.html',
    styleUrls: ['./book-estante.component.scss']
})
export class BookEstanteComponent implements OnInit, OnDestroy {
    bookCase: BookCase = new BookCase();
    search;
    inscricao: Subscription;
    deviceXs;
    mediaSub: Subscription;
    userBook: boolean;
    routerlink: string;
    mapStatus = mapBookStatus;

    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filterCtrl = new FormControl();
    filteredElements: Observable<BookStatus[]>;
    filter: BookStatus[] = [];
    allStatus: BookStatus[] = getArrayStatus();

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private bookService: BookService,
        public dialog: MatDialog,
        public mediaObserver: MediaObserver,
        private router: Router,
        private translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.mediaSub = this.mediaObserver.asObservable().subscribe((result: MediaChange[]) => {
            this.deviceXs = result[0].mqAlias === 'xs' ? true : false;
        });
        this.userBook = this.verifyrouter();

        this.inscricao = this.route.data.subscribe((data: { bookcase: BookCase }) => {
            this.bookCase = data.bookcase;
        });
        this.bookService.updateListCarrousel.subscribe(updated => {
            if (updated) {
                const myBook = this.router.url.toString().includes('mybooks');
                if (myBook) {
                    if (this.bookCase.id) {
                        this.bookService.getBookCaseByTag(this.bookCase.id)
                        .pipe(take(1))
                        .subscribe(
                        bcs => {
                            this.bookCase = bcs;
                        }, error => console.log('error booksComponent', error));

                    } else {
                        this.bookService.getAllBooks()
                        .pipe(
                            take(1)
                        )
                        .subscribe(books => {
                            this.bookCase.books = books;
                        },
                        error => console.log('error booksComponent get all', error));
                    }
                }
            }
        });

        if (!this.userBook) {
            this.routerlink = '/book/';
        } else {
            this.routerlink = '/mybooks/';
        }
        this.translate.onLangChange.subscribe(() => {
            this.updateLanguageStatus();
        });

    }

    updateLanguageStatus(): void {
        zip(
            this.translate.get('STATUS.QUERO_LER'),
            this.translate.get('STATUS.LENDO'),
            this.translate.get('STATUS.LIDO'),
            this.translate.get('STATUS.EMPRESTADO'),
            this.translate.get('STATUS.RELENDO'),
            this.translate.get('STATUS.INTERROMPIDO'),
        ).subscribe(res => {
            this.allStatus[0] = res[0];
            this.allStatus[1] = res[1];
            this.allStatus[2] = res[2];
            this.allStatus[3] = res[3];
            this.allStatus[4] = res[4];
            this.allStatus[5] = res[5];
            this.filteredElements = this.filterCtrl.valueChanges.pipe(
                map((status: string | null) => status ? this._filter(status) : this.allStatus));
        });
    }


    ngOnDestroy(): void {
        this.bookCase = new BookCase();
        this.bookCase.books = [];
        this.inscricao.unsubscribe();
        this.mediaSub.unsubscribe();
    }

    verifyrouter(): boolean {
        return this.router.url.includes('my');
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '')) {
            this.filter.push();
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.filterCtrl.setValue(null);
    }

    remove(status: BookStatus): void {
        const index = this.filter.indexOf(status);
        this.allStatus.push(status);
        if (index >= 0) {
            this.filter.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.filter.push(event.option.value);
        this.allStatus = this.allStatus.filter(status => status !== event.option.value);
        this.fruitInput.nativeElement.value = '';
        this.filterCtrl.setValue(null);
    }

    _filter(value: string): BookStatus[] {
        return this.allStatus.filter(status => status.toLowerCase().indexOf(value.toLowerCase()) === 0);
    }

    private statusFilter(): BookStatus[] {
        if (this.filter.length <= 0) {
            return this.allStatus;
        }
        let result = [];
        for (const s of this.filter) {
            result = this.allStatus.filter((status) => {
                if (status === s) {
                    return false;
                } else {
                    return true;
                }
            });
        }

        return result;
    }

    filterBooks(): Book[] {
        if (this.search === undefined || this.search.trim() === null) {
            return this.filterStatus();
        }
        const books = this.filterStatus().filter((book) => {
            if (book.title.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) !== -1) {
                return true;
            } else {
                return false;
            }
        });
        return books;
    }

    filterStatus(): Book[] {
        if (this.filter.length <= 0) {
            return this.bookCase.books;
        }
        const books = [];
        this.bookCase.books.filter((book) => {
            this.translate.get('STATUS.' + book.status).subscribe(statusBook => {
                for (const status of this.filter) {
                    if (status === statusBook) {
                        books.push(book);
                    }
                }
            });

        });
        return books;
    }

    bookReturn(event) {
        this.bookCase.books[this.bookCase.books.indexOf((event.book))].status = event.status;
    }


}
