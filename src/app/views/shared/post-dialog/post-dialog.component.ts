import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {UserTO} from '../../../models/userTO.model';

export enum Menu {
    ASK = 0,
    PHOTO = 1,
    REVIEW = 2
}

@Component({
    selector: 'app-post-dialog',
    templateUrl: './post-dialog.component.html',
    styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

    public formFeed: FormGroup;
    public user: UserTO;
    public menu = Menu;
    public menuChoose: Menu;
    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        this.createForm();
    }

    private createForm(): void {
        this.formFeed = this.formBuilder.group({
            post: new FormControl(null, Validators.required),
            asks: this.formBuilder.array([])
        });
    }

    get asks(): FormArray {
        return this.formFeed.get('asks') as FormArray;
    }

    public removeAsk(i: number): void {
        this.asks.removeAt(i);
    }

    public addAsk(): void {
        if (this.asks.length < 4) {
            this.asks.insert(0, this.createAskForm(null, ''));
            // this.getAuthors(this.authors.length - 1);
        }
    }
    resetAsks(): void {
        this.menuChoose = this.menu.ASK;
        this.asks.clear();
        this.addAsk();
        this.addAsk();
    }
    choosePhoto(): void {
        this.menuChoose = this.menu.PHOTO;
    }
    chooseReview(): void {
        this.menuChoose = this.menu.REVIEW;
    }

    private createAskForm(id: number, name: string): FormGroup {
        return new FormGroup({
                id: new FormControl(id),
                name: new FormControl(name, Validators.required),
            }
        );
    }

    isMobile() {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase();
        return userAgent.includes('iphone') || userAgent.includes('android');
    }

}
