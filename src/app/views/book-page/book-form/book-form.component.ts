import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../models/book.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {BookService} from "../../../services/book.service";
import {Author} from "../../../models/author.model";
import {AuthorService} from "../../../services/author.service";


@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

    options: any[] = [];
    filteredOptions: Observable<Author[]>[] = [];
    public formBook: FormGroup;
    public book: Book = new Book();
    filteredOptions2: Observable<string[]>[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private bookService: BookService,
        private authorService: AuthorService
        // public modalRef: MDBModalRef
    ) {
        this.book.authors = [];
    }

    ngOnInit(): void {
        this.createForm();
        this.initAuthors();
    }

    private createForm(): void {
        this.formBook = this.formBuilder.group({
            // image: new FormControl(null, Validators.required),
            isbn10: new FormControl(null, Validators.required),
            title: new FormControl(null, Validators.required),
            publisher: new FormControl(null, Validators.required),
            // country: new FormControl(null, Validators.required),
            language: new FormControl(null, Validators.required),
            numberPage: new FormControl(null, Validators.required),
            publishedDate: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            // averageRating: new FormControl(null, Validators.required),
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

    private _filterAuthors(value: string): Author[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.name?.toLowerCase().indexOf(filterValue) === 0);
    }

    getAuthors(index: number) {
        this.authorService.getAll().subscribe(authors => {
            this.options = authors;
            this.filteredOptions[index] = this.authors.at(index).get('name').valueChanges
                .pipe(
                    startWith(''),
                    map((value) => {
                        if (this._filterAuthors(value).length <= 0) {
                            this.authors.at(index).get('id').setValue('');
                        }
                        return this._filterAuthors(value);
                    })
                );
        });


    }

    resetOption(index: number): void {
        this.authors.at(index).get('id').setValue('');
        this.authors.at(index).get('name').setValue('');
    }

    selectOption(index: number, option) {
        console.log(option);
        this.authors.at(index).get('id').setValue(option.id);
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
        this.book.isbn10 = this.formBook.get('isbn10').value;
        this.book.authors = [];
        this.book.title = this.formBook.get('title').value;
        this.book.language = this.formBook.get('language').value;
        this.book.numberPage = this.formBook.get('numberPage').value;
        this.book.publishedDate = this.formBook.get('publishedDate').value;
        this.book.publisher = this.formBook.get('publisher').value;
        this.book.authors = this.authors.value;
        this.book.description = 'dsfasdfsafadsf';
    }

    saveBook() {
        console.log(this.book)
        console.log(this.formBook.value)
        this.bookService.save(this.formBook.value).subscribe(book => {
            console.log(book);
        });
    }
}
