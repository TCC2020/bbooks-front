import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {pipe, zip} from 'rxjs';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
    message: string;
    action: string;

    constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        private translate: TranslateService
    ) {

    }

    ngOnInit(): void {
        zip(
            this.translate.get('PG_N_ENCONTRADA.IR_PG_INICIAL'),
            this.translate.get('PG_N_ENCONTRADA.IR')
        ).subscribe(res => {
            this.message = res[0];
            this.action = res[1];
            const snackBarRef = this.snackBar.open(this.message, this.action, {
                duration: 3000,
            });
            snackBarRef.onAction().pipe(take(1)).subscribe(() => {
                this.redirect();
            });
        });




    }
    redirect(): void {
        this.router.navigate(['/']);
    }
}
