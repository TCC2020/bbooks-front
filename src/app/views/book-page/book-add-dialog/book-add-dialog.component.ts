import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Book} from "../../../models/book.model";
import {BookService} from "../../../services/book.service";

@Component({
    selector: 'app-book-add-dialog',
    templateUrl: './book-add-dialog.component.html',
    styleUrls: ['./book-add-dialog.component.scss']
})
export class BookAddDialogComponent implements OnInit {

    bookCases: string[] = [];
    public formBook: FormGroup;
    public Book: Book;
    public bookcase: string;
    public title: string;
    public buttonText: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { book: Book, bookcase: string },
        public dialogRef: MatDialogRef<BookAddDialogComponent>,
        private formBuilder: FormBuilder,
        private bookService: BookService
    ) {
        this.Book = data.book;
        this.bookcase = data.bookcase;
    }

    ngOnInit(): void {
        this.modeDialog();
        this.createForm();
        this.bookCases = this.bookService.getBookCaseDescritption().filter(value => value !== this.bookcase);
        console.log(this.bookCases.indexOf(this.bookcase.toLowerCase()));
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
            bookcase: new FormControl(null, Validators.required)
        });
    }

    saveBook() {
        if (this.bookcase) {
            this.bookService.removeBookOfBookCase(this.Book, this.bookcase);
        }
        this.bookService.addBookToBookCase(this.Book, this.formBook.get('bookcase').value);
    }

}
