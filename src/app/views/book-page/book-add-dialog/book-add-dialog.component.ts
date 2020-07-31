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

@Component({
    selector: 'app-book-add-dialog',
    templateUrl: './book-add-dialog.component.html',
    styleUrls: ['./book-add-dialog.component.scss']
})
export class BookAddDialogComponent implements OnInit {

    bookCases: BookStatus[] = getArrayStatus();
    mapStatus = mapBookStatus;
    public formBook: FormGroup;
    public Book: Book;
    public bookcase: string;
    public title: string;
    public buttonText: string;
    private userBookTo = new UserBookTO();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { book: Book, bookcase: string },
        public dialogRef: MatDialogRef<BookAddDialogComponent>,
        private formBuilder: FormBuilder,
        private bookService: BookService,
        private userbookService: UserbookService,
        private authService: AuthService
    ) {
        this.Book = data.book;
        this.bookcase = data.bookcase;
    }

    ngOnInit(): void {
        this.modeDialog();
        this.createForm();
    }

    modeDialog() {
        if (this.bookcase) {
            this.title = 'Mover livro para outra estante';
            this.buttonText = "Mover";
        } else {
            this.title = 'Adicionar livro a minha estante';
            this.buttonText = 'Adicionar';
        }
    }

    private createForm(): void {
        this.formBook = this.formBuilder.group({
            statusBook: new FormControl(null, Validators.required)
        });
    }

    saveBook() {

        if (this.bookcase) {
            this.bookService.removeBookOfBookCase(this.Book, this.bookcase);
        }
        this.userBookTo.idBook = this.Book.id;
        this.userBookTo.profileId = this.authService.getUser().profile.id;
        this.userBookTo.status =  this.formBook.get('statusBook').value;
        this.userBookTo.isbn10 = this.Book.isbn10;
        this.userBookTo.isbn13 = this.Book.isbn13;
        this.userbookService.save(this.userBookTo).subscribe(value => {
        });
    }

}
