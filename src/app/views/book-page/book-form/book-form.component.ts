import {Component, Inject, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Book} from '../../../models/book.model';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  public formBook: FormGroup;
  public book: Book = new Book()

  constructor(
      private formBuilder: FormBuilder,
      // public modalRef: MDBModalRef
  ) {
    this.book.authors = ['lucas', 'pedro'];
  }

  ngOnInit(): void {
    this.createForm();
    this.getAuthors();
    this.initAuthors();
    console.log(this.authors.controls[0].value);
  }
  private createForm(): void {
    this.formBook = this.formBuilder.group({
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
  private createAuthorsForm(name: string): FormGroup {
    return new FormGroup({
          nameAuthor: new FormControl(name, Validators.required),
        }
    );
  }
  private initAuthors(): void {
    for (const s of this.book.authors) {
      console.log(s);
      this.authors.push(this.createAuthorsForm(s));
    }
  }

  get authors(): FormArray {
    return this.formBook.get('authors') as FormArray;
  }
  public removeAuthors(i: number): void {
    this.authors.removeAt(i);
  }
  public addAuthors(): void {
    if (this.authors.length < 3) {
      this.authors.insert(0, this.createAuthorsForm(' '));
    }
  }

  private _filterAuthors(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  getAuthors() {
    this.options = ['Monteiro Lobato', 'Gabriel García Márquez', 'Test teste teste'];
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterAuthors(value))
    );
  }
}
