import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BookcaseModalComponent} from '../bookcase-modal/bookcase-modal.component';
import {BookService} from '../../../services/book.service';
import {MatDialog} from '@angular/material/dialog';
import {Input} from '@angular/core';
import {BookCase} from "../../../models/bookCase.model";


@Component({
    selector: 'app-book-menu',
    templateUrl: './book-menu.component.html',
    styleUrls: ['./book-menu.component.scss']
})
export class BookMenuComponent implements OnInit {
    bookcases: BookCase[];

    @Input() deviceXs: boolean;
    topVal = 0;
    constructor(
        private router: Router,
        private bookService: BookService,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
        this.bookcases = this.bookService.getBookCase();

    }
    onScroll(e) {
        let scrollXs = this.deviceXs ? 55 : 73;
        if (e.srcElement.scrollTop < scrollXs) {
            this.topVal = e.srcElement.scrollTop;
        } else {
            this.topVal = scrollXs;
        }
    }

    sideBarScroll() {
        let e = this.deviceXs ? 160 : 130;
        return e - this.topVal;
    }
    openDialogBookCase(): void {
        const dialogRef = this.dialog.open(BookcaseModalComponent, {
            width: '300px',
            height: '200px'
        });
    }
    verifyRouterLink(route: string) {
        return this.router.url.includes(route);
    }

}
