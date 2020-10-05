import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BookCase} from '../../../models/bookCase.model';
import {ActivatedRoute} from '@angular/router';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Observable, Subscription, zip} from 'rxjs';
import {BookStatus, getArrayStatus, mapBookStatus} from '../../../models/enums/BookStatus.enum';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Book} from '../../../models/book.model';
import {AuthService} from '../../../services/auth.service';
import {map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {UserTO} from '../../../models/userTO.model';

@Component({
    selector: 'app-bookcase',
    templateUrl: './bookcase.component.html',
    styleUrls: ['./bookcase.component.scss']
})
export class BookcaseComponent implements OnInit, OnDestroy {
    user: UserTO = new UserTO();
    panelOpenState = false;
    bookCase: BookCase = new BookCase();
    search;
    inscricao: Subscription;
    deviceXs;
    mediaSub: Subscription;
    userBook: boolean;
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
        private route: ActivatedRoute,
        public mediaObserver: MediaObserver,
        public authService: AuthService,
        private translate: TranslateService

    ) {
        this.updateLanguageStatus();
    }

    ngOnInit(): void {
        this.inscricao = this.route.data.subscribe((data: { data: {bookcase: BookCase, user: UserTO }}) => {
            this.bookCase = data.data.bookcase;
            this.user = data.data.user;
        });
        this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
            this.deviceXs = result.mqAlias === 'xs' ? true : false;
        });
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

    bookReturn(event) {
        this.bookCase.books[this.bookCase.books.indexOf((event.book))].status = event.status;
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
        this.mediaSub.unsubscribe();
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
    verfiyPerfilPageisUserLogged() {
        if (this.authService.getUser()?.id) {
            return this.authService.getUser().id === this.user.id;
        } else {
            return false;
        }
    }

}
