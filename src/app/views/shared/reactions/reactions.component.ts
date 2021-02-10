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
import {TypePostControler} from '../../../models/enums/TypePost.enum';

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

    reaction = 'Gostei';
    icon = 'thumb_up';

    listReactions = [
        {reaction: 'Aaarg', icon: 'sentiment_neutral'},
        {reaction: 'Triste', icon: 'sentiment_very_dissatisfied'},
        {reaction: 'Surpreso', icon: 'mood_bad'},
        {reaction: 'Hilário', icon: 'sentiment_very_satisfied'},
        {reaction: 'Amei', icon: 'favorite'},
        {reaction: 'Gostei', icon: 'thumb_up'}
    ];

    constructor(
        public dialog: MatDialog,
        private router: Router,
        public authService: AuthService,
        public postService: PostService,
        public translate: TranslateService,
        public feedPerfilManageService: FeedPerfilManageService
    ) {
    }

    ngOnInit(): void {
    }

    changeReaction(reaction: string, icon: string) {
        this.reaction = reaction;
        this.icon = icon;
    }


    openPost(post?: PostTO) {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('android')) {
            this.router.navigate([this.user.userName + '/create-post'], {state: {post}});
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
                    this.feedPerfilManageService.updatePost(post);
                }
            }
        });
    }

    delete(p: PostTO): void {
        Util.loadingScreen();
        this.postService.delete(p.id)
            .pipe(take(1))
            .subscribe(() => {
                this.feedPerfilManageService.deletePost(p);
                Util.stopLoading();
                this.translate.get('POST.POST_EXCLUIDO')
                    .pipe(take(1))
                    .subscribe(msg => {
                        Util.showSuccessDialog(msg);
                    });
            });
    }

}
