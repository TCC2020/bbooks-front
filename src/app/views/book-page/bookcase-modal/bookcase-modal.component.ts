import { Component, OnInit } from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../../services/book.service';

@Component({
  selector: 'app-bookcase-modal',
  templateUrl: './bookcase-modal.component.html',
  styleUrls: ['./bookcase-modal.component.scss']
})
export class BookcaseModalComponent implements OnInit {
  public formBookCase: FormGroup
  constructor(
      public modalRef: MDBModalRef,
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
    this.bookService.addBookCases(this.formBookCase.get('bookcase').value);
    this.modalRef.hide();
  }


}
