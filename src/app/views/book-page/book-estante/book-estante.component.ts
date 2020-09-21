import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {BookService} from '../../../services/book.service';
import {BookCase} from '../../../models/bookCase.model';
import {Book} from '../../../models/book.model';
import {MatDialog} from '@angular/material/dialog';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {BookStatus, getArrayStatus, mapBookStatus} from '../../../models/enums/BookStatus.enum';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';


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
    allStatus: BookStatus[] = getArrayStatus()

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private bookService: BookService,
        public dialog: MatDialog,
        public mediaObserver: MediaObserver,
        private router: Router,
    ) {
        this.filteredElements = this.filterCtrl.valueChanges.pipe(
            map((status: string | null) => status ? this._filter(status) : this.allStatus));
    }

    ngOnInit(): void {
        this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
            this.deviceXs = result.mqAlias === 'xs' ? true : false;
        });
        this.userBook = this.verifyrouter()

        this.inscricao = this.route.data.subscribe((data: { bookcase: BookCase }) => {
            this.bookCase = data.bookcase;
        });

        if (!this.userBook) {
            this.routerlink = '/book/';
        } else {
            this.routerlink = '/mybooks/';
        }


    }


    ngOnDestroy(): void {
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
        this.allStatus = this.allStatus.filter(status => status !== event.option.value)
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
        for (let s of this.filter) {
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
        let books = this.filterStatus().filter((book) => {
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
            for (const status of this.filter) {
                if (status === book.status) {
                    books.push(book);
                }
            }
        });
        return books;
    }

    bookReturn(event) {
        this.bookCase.books[this.bookCase.books.indexOf((event.book))].status = event.status;
    }

}
