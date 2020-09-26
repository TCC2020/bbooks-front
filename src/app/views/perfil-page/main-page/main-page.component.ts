import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserTO} from '../../../models/userTO.model';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
    links = ['feed', 'bookcase', 'friend'];
    activeLink = this.links[0];
    user: UserTO;
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.data.pipe(take(1)).subscribe((data: { user: UserTO }) => {
            this.user = data.user;
        });
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
            this.router.navigate([`${this.user.userName}/${ this.links[0].toString()}`]);
        });
    }

}
