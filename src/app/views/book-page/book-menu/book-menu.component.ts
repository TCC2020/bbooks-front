import {Component, OnInit} from '@angular/core';
import {mapOptionMenu, OptionMenu} from '../../../models/enums/optionMenu.enum';
import {Router} from '@angular/router';


@Component({
    selector: 'app-book-menu',
    templateUrl: './book-menu.component.html',
    styleUrls: ['./book-menu.component.scss']
})
export class BookMenuComponent implements OnInit {
    optionMenu = OptionMenu;

    opened: boolean = false;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit(): void {
        console.log(this.router.url);
    }

    getOptionMenu(): number {
        if (this.router.url.toString().includes('list')) {
            return this.optionMenu.meusLivros;
        }
        if (this.router.url.toString().includes('criar')) {
            return this.optionMenu.criar;
        }
    }

    toggleSidebar() {
        this.opened = !this.opened;
    }
}
