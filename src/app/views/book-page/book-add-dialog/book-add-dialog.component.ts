import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../../models/book.model";
import {BookService} from "../../../services/book.service";
import {BookStatus, getArrayStatus, mapBookStatus} from "../../../models/enums/BookStatus.enum";
import {UserbookService} from "../../../services/userbook.service";
import {UserBookTO} from "../../../models/userBookTO";
import {AuthService} from "../../../services/auth.service";
import {Tag} from "../../../models/tag";
import {TagService} from "../../../services/tag.service";

@Component({
    selector: 'app-book-add-dialog',
    templateUrl: './book-add-dialog.component.html',
    styleUrls: ['./book-add-dialog.component.scss']
})
export class BookAddDialogComponent implements OnInit {

    bookCases: BookStatus[] = getArrayStatus();
    tags: Tag[];
    tagsBook: Tag[];
    mapStatus = mapBookStatus;
    public formBook: FormGroup;
    public Book: Book;
    public title: string;
    public buttonText: string;
    private userBookTo = new UserBookTO();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { book: Book, tags: Tag[] },
        public dialogRef: MatDialogRef<BookAddDialogComponent>,
        private formBuilder: FormBuilder,
        private bookService: BookService,
        private userbookService: UserbookService,
        private authService: AuthService,
        private tagService: TagService
    ) {
        this.Book = data.book;
        this.tagsBook = data.tags;
        // this.bookcase = data.name;
    }

    ngOnInit(): void {
        this.createForm();
        this.modeDialog();
        this.getTags();

    }

    getTags(): void {
        this.tagService.getAllByProfile(this.authService.getUser().profile.id).subscribe((response: Tag[]) => {
            this.tags = response;
            this.initTags();
        });
    }

    modeDialog() {
        if (this.tagsBook.length > 0) {
            this.title = 'Editar tags do livro';
            this.buttonText = "Editar";
            this.formBook.get('statusBook').setValue(this.Book.status);
        } else {
            this.title = 'Adicionar livro em tags';
            this.buttonText = 'Adicionar';
        }
    }

    private createForm(): void {
        this.formBook = this.formBuilder.group({
            statusBook: new FormControl(null, Validators.required),
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
        this.userBookTo.status = this.formBook.get('statusBook').value;
        this.userBookTo.tags = this.getSelectedTags();
        if (this.tagsBook.length > 0) {
            this.userbookService.update(this.userBookTo).subscribe(
                value => {
                    this.dialogRef.close(this.userBookTo);
                },
                error => {
                    console.log('TagDialog Error', error);
                }
            );

        } else {
            this.userbookService.save(this.userBookTo).subscribe(
                value => {
                    this.dialogRef.close(this.userBookTo);
                },
                error => {
                    console.log('TagDialog Error', error);
                }
            );
        }

    }

}
