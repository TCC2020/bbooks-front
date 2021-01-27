import {Component, Injector, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {UserTO} from '../../../models/userTO.model';
import {PostService} from '../../../services/post.service';
import {take} from 'rxjs/operators';
import {TypePost} from '../../../models/enums/TypePost.enum';
import {getArrayPostPrivacy, mapPostPrivacy} from '../../../models/enums/PostPrivacy.enum';
import {Route, Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

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
    public mapTypePost = getArrayPostPrivacy();
    mapPostPrivacy = mapPostPrivacy;

    public textInput = 'TEXT_POST_INPUT';
    public dialogRef: MatDialogRef<PostDialogComponent>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        public postService: PostService,
        public router: Router,
        private injector: Injector
    ) {
        this.dialogRef =  this.injector.get(MatDialogRef, null);
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        this.createForm();
    }

    private createForm(): void {
        this.formFeed = this.formBuilder.group({
            profileId: new FormControl(this.user.profile.id),
            description: new FormControl(null, Validators.required),
            asks: this.formBuilder.array([]),
            image: new FormControl(null),
            tipoPost: new FormControl(TypePost.post),
            privacy: new FormControl(null, Validators.required),
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
        this.textInput = 'TEXT_POST_INPUT_ASK';
        this.menuChoose = this.menu.ASK;
        this.asks.clear();
        this.addAsk();
        this.addAsk();
    }

    choosePhoto(): void {
        this.textInput = 'TEXT_POST_INPUT';
        this.menuChoose = this.menu.PHOTO;
    }

    chooseReview(): void {
        this.textInput = 'TEXT_POST_INPUT';
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

    save(): void {
        this.postService.save(this.formFeed.value)
            .pipe(take(1))
            .subscribe(post => {
                    if (this.isMobile()) {
                        this.router.navigate([`/${this.user.userName}`]);
                    } else {
                        this.dialogRef.close();
                    }
                    console.log(post);
                },
                error => {
                    console.log('Error post-dialog', error);
                });
    }

}
