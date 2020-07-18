import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../../services/book.service';
import {BookCase} from "../../../models/bookCase.model";

@Component({
    selector: 'app-bookcase-modal',
    templateUrl: './bookcase-modal.component.html',
    styleUrls: ['./bookcase-modal.component.scss']
})
export class BookcaseModalComponent implements OnInit {
    public formBookCase: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private bookService: BookService
    ) {

    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.formBookCase = this.formBuilder.group({
            bookcase: new FormControl(null, Validators.required),
        });
    }

    saveBookCase() {
        const bc = new BookCase();
        bc.description = this.formBookCase.get('bookcase').value
        bc.description.toLowerCase();
        bc.books = [];
        this.bookService.addBookCases(bc);
    }


}
