import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookcaseModalComponent } from '../bookcase-modal/bookcase-modal.component';
import { BookService } from '../../../services/book.service';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-book-menu',
    templateUrl: './book-menu.component.html',
    styleUrls: ['./book-menu.component.scss']
})
export class BookMenuComponent implements OnInit {
    bookcases: string[];

    opened: boolean = false;

    constructor(
        private router: Router,
        private bookService: BookService
    ) {
    }

    ngOnInit(): void {
        this.bookcases = this.bookService.getBookCase();
    }
    openModal() {
        // let modalRef = this.modalService.open(BookcaseModalComponent, {
 
        // });
    }

    toggleSidebar() {
        this.opened = !this.opened;
    }
}