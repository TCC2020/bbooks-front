import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../models/book.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {BookService} from "../../../services/book.service";
import {Author} from "../../../models/author.model";


@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>[] = [];
    public formBook: FormGroup;
    public book: Book = new Book();
    filteredOptions2: Observable<string[]>[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private bookService: BookService
        // public modalRef: MDBModalRef
    ) {
        this.book.authors = [];
    }

    ngOnInit(): void {
        this.createForm();
        this.initAuthors();
        console.log('form', this.authors);
    }

    private createForm(): void {
        this.formBook = this.formBuilder.group({
            image: new FormControl(null, Validators.required),
            isbn: new FormControl(null, Validators.required),
            title: new FormControl(null, Validators.required),
            publisher: new FormControl(null, Validators.required),
            country: new FormControl(null, Validators.required),
            language: new FormControl(null, Validators.required),
            pageCount: new FormControl(null, Validators.required),
            publishedDate: new FormControl(null, Validators.required),
            averageRating: new FormControl(null, Validators.required),
            // image: new FormControl(null, Validators.required),
            // searchInfo: new FormControl(null, Validators.required),
            authors: this.formBuilder.array([])
        });
    }

    private createAuthorsForm(id: number, name: string): FormGroup {
        return new FormGroup({
                id: new FormControl(id),
                name: new FormControl(name, Validators.required),
            }
        );
    }

    private initAuthors(): void {
        this.book.authors.forEach((author, i) => {
            this.authors.push(this.createAuthorsForm(author.id, author.name));
            this.getAuthors(i);
        });
        // for (const s of this.book.authors) {
        //     this.authors.push(this.createAuthorsForm(s));
        //     this.getAuthors(0);
        // }

    }

    get authors(): FormArray {
        return this.formBook.get('authors') as FormArray;
    }

    get users(): FormArray {
        return this.formBook.get('items') as FormArray;
    }


    public removeAuthors(i: number): void {
        this.authors.removeAt(i);
    }

    public addAuthors(): void {
        if (this.authors.length < 3) {
            this.authors.insert(0, this.createAuthorsForm(null, ''));
            this.getAuthors(this.authors.length - 1);
        }
    }

    private _filterAuthors(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

    getAuthors(index: number) {

        this.options = ['Monteiro Lobato', 'Gabriel García Márquez', 'Test teste teste'];

        this.filteredOptions[index] = this.authors.at(index).get('name').valueChanges
            .pipe(
                startWith(''),
                map(value => value ? this._filterAuthors(value) : this.options.slice())
            );
    }

    onFileChanged(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            console.log(file);
            const formData = new FormData();
            formData.append('foto', file);
        }

    }
    convertToBook() {
        this.book.isbn10 = this.formBook.get('isbn').value;
        this.book.authors = [];
        this.book.title = this.formBook.get('title').value;
        this.book.language = this.formBook.get('language').value;
        this.book.numberPage = this.formBook.get('pageCount').value;
        this.book.publishedDate = this.formBook.get('publishedDate').value;
        this.book.publisher = this.formBook.get('publisher').value;
        this.book.authors = this.authors.value;
        this.book.description = 'dsfasdfsafadsf';
    }
    saveBook() {
        this.convertToBook();
        this.bookService.save(this.book).subscribe( book => {
            console.log(book);
        });
    }
}
