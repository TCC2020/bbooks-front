import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {PostService} from '../../../services/post.service';
import {TranslateService} from '@ngx-translate/core';
import {UserTO} from '../../../models/userTO.model';
import {PostTO} from '../../../models/PostTO.model';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';
import {Util} from '../Utils/util';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AddPost} from '../../perfil-page/store/actions/feed.actions';
import {FeedPerfilManageService} from '../../perfil-page/store/feed-perfil-manage.service';
import {TypePost, TypePostControler} from '../../../models/enums/TypePost.enum';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeedMainManagerService} from '../../feed-page/store/feed-main-manager.service';

@Component({
    selector: 'app-reactions',
    templateUrl: './reactions.component.html',
    styleUrls: ['./reactions.component.scss']
})
export class ReactionsComponent implements OnInit {

    @Input() user: UserTO;
    @Input() post: PostTO;
    @Input() typePostControler: TypePostControler;
    @Output() postOutput = new EventEmitter<any>();
    @Input() userPost: UserTO;
    reaction = 'Gostei';
    icon = 'fa-thumbs-up';

    listReactions = [
        {reaction: 'Aaarg', icon: 'fa-angry'},
        {reaction: 'Triste', icon: 'fa-sad-tear'},
        {reaction: 'Surpreso', icon: 'fa-surprise'},
        {reaction: 'Hilário', icon: 'fa-laugh-squint'},
        {reaction: 'Amei', icon: 'fa-heart'},
        {reaction: 'Não Gostei', icon: 'fa-thumbs-down'},
        {reaction: 'Gostei', icon: 'fa-thumbs-up'}
    ];

    public formComment: FormGroup;

    constructor(
        public dialog: MatDialog,
        private router: Router,
        public authService: AuthService,
        public postService: PostService,
        public translate: TranslateService,
        public feedPerfilManageService: FeedPerfilManageService,
        private formBuilder: FormBuilder,
        public feedMainManagerService: FeedMainManagerService
    ) {

    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.formComment = this.formBuilder.group({
            id: new FormControl(),
            profileId: new FormControl(this.user.profile.id),
            description: new FormControl(null, Validators.required),
            asks: this.formBuilder.array([]),
            image: new FormControl(null),
            tipoPost: new FormControl('comentario'),
            privacy: new FormControl('public_all', Validators.required),
            creationDate: new FormControl(null),
            upperPostId: new FormControl(this.post.id)
        });
    }

    changeReaction(reaction: string, icon: string) {
        this.reaction = reaction;
        this.icon = icon;
    }


    openPost(post?: PostTO) {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('android')) {
            this.redirectRouterPost(post);
        } else {
            this.openPostDialog(post);
        }
    }

    openPostDialog(p?: PostTO) {
        const dialogRef = this.dialog.open(PostDialogComponent, {
            height: '450px',
            width: '500px',
            data: p
        });
        dialogRef.afterClosed()
            .pipe().subscribe((post) => {
            if (post) {
                if (p) {
                    this.updateReduxOfTypePost(this.typePostControler, post);
                }
            }
        });
    }

    delete(p: PostTO): void {
        Util.loadingScreen();
        this.postService.delete(p.id)
            .pipe(take(1))
            .subscribe(() => {
                this.deleteReduxOfTypePost(this.typePostControler, p);
                Util.stopLoading();
                this.translate.get('POST.POST_EXCLUIDO')
                    .pipe(take(1))
                    .subscribe(msg => {
                        Util.showSuccessDialog(msg);
                    });
            });
    }

    updateReduxOfTypePost(typePostController: TypePostControler, postTo: PostTO) {
        switch (typePostController) {
            case TypePostControler.feed:
                this.feedMainManagerService.updatePost(postTo);
                return;
            case TypePostControler.feedPerfil:
                this.feedPerfilManageService.updatePost(postTo);
                return;
            case TypePostControler.group:
                return;
        }
    }

    deleteReduxOfTypePost(typePostController: TypePostControler, postTo: PostTO) {
        switch (typePostController) {
            case TypePostControler.feed:
                this.feedMainManagerService.deletePost(postTo);
                return;
            case TypePostControler.feedPerfil:
                this.feedPerfilManageService.deletePost(postTo);
                return;
            case TypePostControler.group:
                return;
        }
    }

    redirectRouterPost(post?: PostTO) {
        switch (this.typePostControler) {
            case TypePostControler.feed:
                this.router.navigate(['/create-post'], {state: {post}});
                return;
            case TypePostControler.feedPerfil:
                this.router.navigate([this.user.userName + '/create-post'], {state: {post}});
                return;
            case TypePostControler.group:
                return;
        }
    }

    onKeyEnter(): void {
        this.postService.save(this.formComment.value)
            .pipe(take(1))
            .subscribe(result => {
                console.log(result);
            });
    }
}
