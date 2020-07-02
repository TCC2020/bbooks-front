import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {GoogleBooksService} from '../../../services/google-books.service';
import {BookFormComponent} from '../book-form/book-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-book-estante',
    templateUrl: './book-estante.component.html',
    styleUrls: ['./book-estante.component.scss']
})
export class BookEstanteComponent implements OnInit {
    // books;
    // searchControl;
    // search;
    // busca: string = 'o menino';

    // constructor(
    //     private fb: FormBuilder,
    //     private gBooksService: GoogleBooksService,
    //     public dialog: MatDialog
    // ) {
    //     this.searchControl = this.fb.group({
    //         search: ['']
    //     });
    // }

    ngOnInit(): void {
       // this.searchBook();
    }

    // searchBook() {
    //     // this.searchControl.value.book?
    //     this.busca.split(' ').join('+');
    //     this.gBooksService.searchByName(this.busca.split(' ').join('+')).subscribe(books => {
    //         this.books = books['items'];
    //     });
    // }

    // filterBooks() {
    //     if (this.search === undefined || this.search.trim() === null) {
    //         return this.books;
    //     }
    //     return this.books.filter((book) => {
    //         if (book.volumeInfo.title.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) !== -1) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // }

    // openModal() {
    //     // this.modalRef = this.modalRef = this.modalService.show(BookFormComponent, {
    //     //     backdrop: true,
    //     //     keyboard: true,
    //     //     focus: true,
    //     //     show: false,
    //     //     ignoreBackdropClick: false,
    //     //     class: 'modal-dialog modal-dialog-scrollable',
    //     //     animated: true,
    //     // });
    //     const dialogRef = this.dialog.open(BookFormComponent, {
    //         width: '550px',
    //         height: '700px'
    //     });

    //     // dialogRef.afterClosed().subscribe(result => {
    //     //     console.log(`Dialog result: ${result}`);
    //     // });
    // }

}
