import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {pipe} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
    message = 'Ir para pagina inicial';
    action = 'Ir';

    constructor(
        private snackBar: MatSnackBar,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        const snackBarRef = this.snackBar.open(this.message, this.action, {
            duration: 2000,
        });
        snackBarRef.onAction().pipe(take(1)).subscribe(() => {
            this.redirect();
        });
    }
    redirect(): void {
        this.router.navigate(['/']);
    }
}
