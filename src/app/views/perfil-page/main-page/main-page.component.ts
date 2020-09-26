import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    links = ['feed', 'bookcase', 'friend'];
    activeLink = this.links[0];

    constructor(
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.changeMenu();
    }

    changeMenu(): void {
        this.links.forEach(l => {
            if (this.router.url.toLowerCase().includes(l.toLowerCase())) {
                this.activeLink = l;
                return;
            }
            this.activeLink = this.links[0];
            this.router.navigate([`perfil/${this.links[0].toString()}`]);
        });
    }

}
