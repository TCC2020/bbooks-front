import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../../models/book.model";
import {BookService} from "../../../services/book.service";
import {BookStatus, getArrayStatus, mapBookStatus} from "../../../models/enums/BookStatus.enum";
import {UserbookService} from "../../../services/userbook.service";
import {UserBookTO} from "../../../models/userBookTO";
import {AuthService} from "../../../services/auth.service";
import {AuthGuard} from "../../../guards/auth-guard";
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
    mapStatus = mapBookStatus;
    public formBook: FormGroup;
    public Book: Book;
    private tagId: any;
    public title: string;
    public buttonText: string;
    private userBookTo = new UserBookTO();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { book: Book, tagId: any },
        public dialogRef: MatDialogRef<BookAddDialogComponent>,
        private formBuilder: FormBuilder,
        private bookService: BookService,
        private userbookService: UserbookService,
        private authService: AuthService,
        private tagService: TagService
    ) {
        this.Book = data.book;
        this.tagId = data.tagId;
        // this.bookcase = data.name;
    }

    ngOnInit(): void {
        this.modeDialog();
        this.createForm();
        this.getTags();
    }

    getTags(): void {
        this.tagService.getAllByProfile(this.authService.getUser().profile.id).subscribe((response: Tag[]) => {
            this.tags = response;
        });
    }

    modeDialog() {
        if (this.tagId) {
            this.title = 'Mover livro para outra tag';
            this.buttonText = "Mover";
        } else {
            this.title = 'Adicionar livro a uma tag';
            this.buttonText = 'Adicionar';
        }
    }

    private createForm(): void {
        this.formBook = this.formBuilder.group({
            statusBook: new FormControl(null, Validators.required),
            tag: new FormControl(null, Validators.required)
        });
    }

    saveBook() {

        this.userBookTo.idBook = this.Book.id;
        this.userBookTo.profileId = this.authService.getUser().profile.id;
        this.userBookTo.status = this.formBook.get('statusBook').value;
        this.userBookTo.isbn10 = this.Book.isbn10;
        this.userBookTo.isbn13 = this.Book.isbn13;
        this.userBookTo.tagId = this.formBook.get('tag').value.id;
        console.log(this.userBookTo);
        this.userbookService.save(this.userBookTo).subscribe(value => {
        });
    }

}
