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
import {FeedPerfilManageService} from '../../perfil-page/store/feed-perfil-manage.service';
import {TypePostControler} from '../../../models/enums/TypePost.enum';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeedMainManagerService} from '../../feed-page/store/feed-main-manager.service';
import {FeedGenericService} from '../../../services/feed-generic.service';
import {UploadComponent} from '../../upload/upload.component';
import {FeedGroupManagerService} from '../../groups/store/feed-group-manager.service';
import {GroupService} from '../../../services/group.service';
import {GroupTO} from '../../../models/GroupTO.model';

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

    public editForm: FormGroup;

    group: GroupTO;

    comments: PostTO[] = [];

    constructor(
        public dialog: MatDialog,
        private router: Router,
        public authService: AuthService,
        public postService: PostService,
        public translate: TranslateService,
        public feedPerfilManageService: FeedPerfilManageService,
        private formBuilder: FormBuilder,
        public feedMainManagerService: FeedMainManagerService,
        public feedGenerec: FeedGenericService,
        public feedGroupManagerService: FeedGroupManagerService,
        public groupService: GroupService
    ) {
    }

    ngOnInit(): void {
        this.getGroup();
        this.createForm();
        this.comments = this.post?.comments?.map(c => this.feedGenerec.convertToNewPost(c));
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

    private createEditCommentForm(comment: PostTO): void {
        this.editForm = this.formBuilder.group({
            id: new FormControl(comment.id),
            profileId: new FormControl(this.user.profile.id),
            description: new FormControl(comment.description, Validators.required),
            asks: this.formBuilder.array([]),
            image: new FormControl(null),
            tipoPost: new FormControl('comentario'),
            privacy: new FormControl('public_all', Validators.required),
            creationDate: new FormControl(comment.creationDate),
            upperPostId: new FormControl(this.post.id)
        });
    }

    changeReaction(reaction: string, icon: string) {
        this.reaction = reaction;
        this.icon = icon;
    }


    openPost(post?: PostTO) {
        if (this.isMobile()) {
            this.redirectRouterPost(post);
        } else {
            this.openPostDialog(post);
        }
    }

    isMobile(): boolean {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase();
        return userAgent.includes('iphone') || userAgent.includes('android');
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
                    post.comments = p.comments;
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

    deleteComment(p: PostTO): void {
        Util.loadingScreen();
        this.postService.delete(p.id)
            .pipe(take(1))
            .subscribe(() => {
                this.deleteCommentReduxOfTypePost(this.typePostControler, this.post, p);
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
                this.feedGroupManagerService.updatePost(postTo);
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
                this.feedGroupManagerService.deletePost(postTo);
                return;
        }
    }

    deleteCommentReduxOfTypePost(typePostController: TypePostControler, postTo: PostTO, comment: PostTO) {
        switch (typePostController) {
            case TypePostControler.feed:
                this.feedMainManagerService.deleteComment(postTo, comment);
                return;
            case TypePostControler.feedPerfil:
                this.feedPerfilManageService.deleteComment(postTo, comment);
                return;
            case TypePostControler.group:
                this.feedGroupManagerService.deleteComment(postTo, comment);
                return;
        }
    }

    addCommentReduxOfTypePost(typePostController: TypePostControler, postTo: PostTO, comment: PostTO) {
        switch (typePostController) {
            case TypePostControler.feed:
                this.feedMainManagerService.addComment(postTo, comment);
                return;
            case TypePostControler.feedPerfil:
                this.feedPerfilManageService.addComment(postTo, comment);
                return;
            case TypePostControler.group:
                this.feedGroupManagerService.addComment(postTo, comment);

                return;
        }
    }

    updateCommentReduxOfTypePost(typePostController: TypePostControler, postTo: PostTO, comment: PostTO) {
        switch (typePostController) {
            case TypePostControler.feed:
                this.feedMainManagerService.updateComment(postTo, comment);
                return;
            case TypePostControler.feedPerfil:
                this.feedPerfilManageService.updateComment(postTo, comment);
                return;
            case TypePostControler.group:
                this.feedGroupManagerService.updateComment(postTo, comment);
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
                this.router.navigate(['groups/create-post'], {state: {post}});
                return;
        }
    }

    saveComment(c?: PostTO): void {
        Util.loadingScreen();
        if (!c) {
            this.postService.save(this.formComment.value)
                .pipe(take(1))
                .subscribe(comment => {
                        comment.user = this.authService.getUser();
                        Util.stopLoading();
                        this.addCommentReduxOfTypePost(this.typePostControler, this.post, comment);
                    },
                    error => {
                        Util.stopLoading();
                        console.log('Error save comment', error);
                        this.showErrorDialog();
                    });
        } else {
            this.postService.update(this.editForm.value)
                .pipe(take(1))
                .subscribe(comment => {
                        comment.user = this.authService.getUser();
                        Util.stopLoading();
                        this.updateCommentReduxOfTypePost(this.typePostControler, this.post, comment);
                    },
                    error => {
                        this.showErrorDialog();
                        console.log('Error post-dialog', error);
                    });
        }
    }

    editComment(comment: PostTO): void {
        this.createEditCommentForm(comment);
        const index = this.comments.indexOf(comment);
        this.comments[index].editMode = !this.comments[index].editMode;
    }

    showErrorDialog(): void {
        this.translate.get('PADRAO.OCORREU_UM_ERRO')
            .subscribe(msg => {
                Util.showErrorDialog(msg);
            });
    }

    getGroup(): void {
        if (this.post.groupId) {
            this.groupService.getById(this.post.groupId)
                .pipe(take(1))
                .subscribe(r => {
                    this.group = r;
                });
        }
    }
    isGroupRouter(): boolean {
        return this.router.url.includes('group');
    }
}
