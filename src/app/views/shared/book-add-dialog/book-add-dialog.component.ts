import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Book} from '../../../models/book.model';
import {BookService} from '../../../services/book.service';
import {
    BookStatus,
    BookStatusEnglish,
    getArrayStatus,
    mapBookStatus,
    mapBookStatusEnglish
} from '../../../models/enums/BookStatus.enum';
import {UserbookService} from '../../../services/userbook.service';
import {UserBookTO} from '../../../models/userBookTO';
import {AuthService} from '../../../services/auth.service';
import {Tag} from '../../../models/tag';
import {TagService} from '../../../services/tag.service';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {zip} from 'rxjs';

@Component({
    selector: 'app-book-add-dialog',
    templateUrl: './book-add-dialog.component.html',
    styleUrls: ['./book-add-dialog.component.scss']
})
export class BookAddDialogComponent implements OnInit {

    AllStatus: BookStatus[] = getArrayStatus();
    tags: Tag[];
    tagsBook: Tag[];
    mapStatus = mapBookStatus;
    mapStatusEnglish = mapBookStatusEnglish;

    public formBook: FormGroup;
    public Book: Book;
    public title: string;
    public buttonText: string;
    private userBookTo = new UserBookTO();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { book: Book },
        public dialogRef: MatDialogRef<BookAddDialogComponent>,
        private formBuilder: FormBuilder,
        private bookService: BookService,
        private userbookService: UserbookService,
        private authService: AuthService,
        private tagService: TagService,
        public translate: TranslateService
    ) {
        this.Book = data.book;
        this.tagsBook = [];
        if (this.Book.idUserBook) {
            this.tagService.getAllByUserBook(this.Book.idUserBook).subscribe(tags => {
                this.tagsBook = tags;
                this.modeDialog();
            });
        } else {
            this.modeDialog();
        }
        this.updateLanguageStatus();
        dialogRef.beforeClosed().subscribe(() => {
            this.data.book.status = this.getStatusToUserBookClose();
        });
    }


    ngOnInit(): void {
        this.createForm();
        this.getTags();

    }

    getTags(): void {
        this.tagService.getAllByProfile(this.authService.getUser().profile.id).subscribe((response: Tag[]) => {
            this.tags = response;
            this.initTags();
        });
    }

    modeDialog() {
        if (this.Book.idUserBook) {
            this.translate.get('ESTANTE.EDITAR_LIVRO').subscribe(title => {
                this.title = title;
            });
            this.translate.get('PADRAO.EDITAR').subscribe(text => {
                this.buttonText = text;
            });
        } else {
            this.translate.get('ESTANTE.ADICIONAR_LIVRO').subscribe(title => {
                this.title = title;
            });
            this.translate.get('PADRAO.ADICIONAR').subscribe(text => {
                this.buttonText = text;
            });
        }
    }

    private createForm(): void {
        this.formBook = this.formBuilder.group({
            statusBook: new FormControl(this.Book.status ? this.Book.status : null, Validators.required),
            tags: this.formBuilder.array([])
        });
    }

    private createTagForm(checked: boolean): FormControl {
        return new FormControl(checked);
    }

    private initTags(): void {
        this.tags.forEach((tag, i) => {
            let tagId = new Tag();
            if (this.tagsBook !== null) {
                tagId = this.tagsBook.find(t => tag.id === t.id);
            }
            if (tag.id === tagId?.id) {
                this.tagsControl.push(this.createTagForm(true));
            } else {
                this.tagsControl.push(this.createTagForm(false));
            }
        });
    }

    get tagsControl(): FormArray {
        return this.formBook.get('tags') as FormArray;
    }

    getSelectedTags(): Tag[] {
        return this.formBook.value.tags
            .map((checked, i) => checked ? this.tags[i] : null)
            .filter(v => v !== null);
    }

    saveBook() {
        this.userBookTo.id = this.Book.idUserBook;
        this.userBookTo.idBook = this.Book.id;
        this.userBookTo.profileId = this.authService.getUser().profile.id;
        this.userBookTo.status = this.getStatusToUserBook();
        this.userBookTo.tags = this.getSelectedTags();
        this.userBookTo.page = this.Book.numberPage;

        if (this.tagsBook.length > 0) {
            this.userbookService.update(this.userBookTo).subscribe(
                value => {
                    this.dialogRef.close(value);
                },
                error => {
                    console.log('TagDialog Error', error);
                }
            );

        } else {
            this.userbookService.save(this.userBookTo).subscribe(
                value => {
                    this.dialogRef.close(value);
                },
                error => {
                    console.log('TagDialog Error', error);
                }
            );
        }

    }

    updateLanguageStatus(): void {
        zip(
            this.translate.get('STATUS.QUERO_LER'),
            this.translate.get('STATUS.LENDO'),
            this.translate.get('STATUS.LIDO'),
            this.translate.get('STATUS.EMPRESTADO'),
            this.translate.get('STATUS.RELENDO'),
            this.translate.get('STATUS.INTERROMPIDO'),
            this.translate.get('STATUS.' + this.Book.status),
        ).subscribe(res => {
            this.AllStatus[0] = res[0];
            this.AllStatus[1] = res[1];
            this.AllStatus[2] = res[2];
            this.AllStatus[3] = res[3];
            this.AllStatus[4] = res[4];
            this.AllStatus[5] = res[5];
            this.Book.status = res[6];
        });
    }

    getStatusToUserBook(): any {
        let valueFormStatus = this.formBook.get('statusBook').value;
        const statusEnglish = this.mapStatusEnglish.get(valueFormStatus);
        if (statusEnglish) {
            return statusEnglish;
        } else {
            if (valueFormStatus === 'Quero Ler') {
                valueFormStatus = 'QUERO_LER';
                return valueFormStatus;
            }
            return mapBookStatus.get(valueFormStatus.toUpperCase()).toUpperCase();
        }
    }

    getStatusToUserBookClose(): any {
        const valueFormStatus = this.Book.status.toString() as BookStatusEnglish;
        const statusEnglish = this.mapStatusEnglish.get(valueFormStatus);
        if (statusEnglish) {
            return statusEnglish.toUpperCase();
        } else {
            const status = this.Book.status.toString() as BookStatus;
            return mapBookStatus.get(status);
        }
    }

}
