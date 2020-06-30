import {Component, OnInit} from '@angular/core';
import {mapOptionMenu, OptionMenu} from '../../../models/enums/optionMenu.enum';
import {Router} from '@angular/router';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {BookcaseModalComponent} from '../bookcase-modal/bookcase-modal.component';
import {BookService} from '../../../services/book.service';


@Component({
    selector: 'app-book-menu',
    templateUrl: './book-menu.component.html',
    styleUrls: ['./book-menu.component.scss']
})
export class BookMenuComponent implements OnInit {
    optionMenu = OptionMenu;
    modalRef: MDBModalRef;
    bookcases: string[];

    opened: boolean = false;

    constructor(
        private router: Router,
        private modalService: MDBModalService,
        private bookService: BookService
    ) {
    }

    ngOnInit(): void {
        this.bookcases = this.bookService.getBookCase();
    }
    openModal() {
        this.modalRef = this.modalRef = this.modalService.show(BookcaseModalComponent, {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: false,
            ignoreBackdropClick: false,
            class: 'modal-dialog modal-dialog-centered',
            containerClass: 'right',
            animated: true,
        });
    }

    toggleSidebar() {
        this.opened = !this.opened;
    }
}
