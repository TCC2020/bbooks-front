import {Component, Injector, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {UserTO} from '../../../models/userTO.model';
import {PostService} from '../../../services/post.service';
import {take} from 'rxjs/operators';
import {TypePost} from '../../../models/enums/TypePost.enum';
import {getArrayPostPrivacy, mapPostPrivacy, PostPrivacy} from '../../../models/enums/PostPrivacy.enum';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PostTO} from '../../../models/PostTO.model';
import {Util} from '../Utils/util';
import {TranslateService} from '@ngx-translate/core';
import {UploadComponent} from '../../upload/upload.component';
import {CDNService} from '../../../services/cdn.service';

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
    public title = 'POST.CRIAR_POSTAGEM';
    public buttonSave = 'PADRAO.PUBLICAR';
    public dialogRef: MatDialogRef<PostDialogComponent>;
    public dataDialog: PostTO;

    image: any;
    file: any;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        public postService: PostService,
        public router: Router,
        private injector: Injector,
        public translate: TranslateService,
        public dialog: MatDialog,
        public cdnService: CDNService
    ) {
        this.dialogRef = this.injector.get(MatDialogRef, null);
        if (!this.isMobile()) {
            this.dataDialog = this.injector.get(MAT_DIALOG_DATA);
        } else {
            this.dataDialog = this.router.getCurrentNavigation()?.extras?.state?.post;
        }
    }

    ngOnInit(): void {
        this.configTexts();
        this.user = this.authService.getUser();
        this.createForm();
    }

    configTexts(): void {
        if (this.dataDialog) {
            this.title = 'POST.EDITAR_POSTAGEM';
            this.buttonSave = 'PADRAO.EDITAR';
        }
    }

    private createForm(): void {
        this.formFeed = this.formBuilder.group({
            id: new FormControl(this.dataDialog ? this.dataDialog.id : null),
            profileId: new FormControl(this.hadProfileId()),
            description: new FormControl(this.dataDialog ? this.dataDialog.description : null, Validators.required),
            asks: this.formBuilder.array([]),
            image: new FormControl(this.dataDialog ? this.dataDialog.image : null),
            tipoPost: new FormControl(TypePost.post),
            privacy: new FormControl(
                this.dataDialog ? this.dataDialog.privacy : mapPostPrivacy.get(PostPrivacy.public_all),
                Validators.required
            ),
            creationDate: new FormControl(this.dataDialog ? this.dataDialog.creationDate : null),
            groupId: new FormControl(this.getGroupId()),
            pageId: new FormControl(this.getPageId())
        });
        this.image = this.dataDialog ? this.dataDialog.image : null;
    }

    hadProfileId(): number {
        return this.router.url.includes('public-profile') || 'perfil-publico' ? 0 : this.user.profile.id;
    }

    getGroupId(): string {
        return this.router.url.includes('group') ?
            localStorage.getItem('groupId') : this.dataDialog ? this.dataDialog?.groupId : '';
    }

    getPageId(): string {
        const hasPage = this.router.url.includes('public-profile') || this.router.url.includes('perfil-publico');
        if (hasPage) {
            return localStorage.getItem('pageId');
        } else {
            return this.dataDialog ? this.dataDialog?.pageId : '';
        }
    }
    isPublicPageRoute(): boolean {
        return this.router.url.includes('public-profile');
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
        if (this.menuChoose === this.menu.ASK) {
            this.textInput = 'TEXT_POST_INPUT';
            this.menuChoose = this.menu.PHOTO;
        } else {
            this.textInput = 'TEXT_POST_INPUT_ASK';
            this.menuChoose = this.menu.ASK;
        }
        this.asks.clear();
        this.addAsk();
        this.addAsk();
    }

    choosePhoto(): void {
        this.textInput = 'TEXT_POST_INPUT';
        // this.menuChoose = this.menu.PHOTO;
        this.openDialogUpload();
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
        Util.loadingScreen();
        if (this.dataDialog) {
            this.postService.update(this.formFeed.value)
                .pipe(take(1))
                .subscribe(post => {
                        Util.stopLoading();
                        this.uploadPhotoPost(post);
                    },
                    error => {
                        this.showErrorDialog();
                        console.log('Error post-dialog', error);
                    });
        } else {
            this.postService.save(this.formFeed.value)
                .pipe(take(1))
                .subscribe(post => {
                        Util.stopLoading();
                        this.uploadPhotoPost(post);
                    },
                    error => {
                        this.showErrorDialog();
                        console.log('Error post-dialog', error);
                    });
        }

    }

    uploadPhotoPost(post: PostTO): void {
        if (!this.file) {
            this.redirectPage(post);
        } else {
            Util.loadingScreen();
            this.cdnService.uploadFeedApi(
                {file: this.file, type: 'image'},
                {objectType: 'post_image', postId: post.id}
            )
                .pipe(take(1))
                .subscribe(() => {
                    Util.stopLoading();
                    post.image = this.image;
                    this.redirectPage(post);

                }, error => {
                    Util.stopLoading();
                    console.log('error upload image post', error);
                });
        }


    }

    showErrorDialog(): void {
        this.translate.get('PADRAO.OCORREU_UM_ERRO')
            .subscribe(msg => {
                Util.showErrorDialog(msg);
            });
    }

    redirectPage(post: PostTO): void {
        if (this.isMobile()) {
            window.history.back();
        } else {
            post.user = this.authService.getUser();
            this.dialogRef.close(post);
        }
    }

    openDialogUpload() {
        const dialogRef = this.dialog.open(UploadComponent, {
            height: '350px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.file = result;
                this.image = result;
                const reader = new FileReader();
                reader.onload = (e) => this.image = e.target.result;
                reader.readAsDataURL(this.image);
            }
        });
    }
}
