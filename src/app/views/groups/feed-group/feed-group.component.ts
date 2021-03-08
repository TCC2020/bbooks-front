import {Component, OnDestroy, OnInit} from '@angular/core';
import {TypePostControler} from '../../../models/enums/TypePost.enum';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedGroupManagerService} from '../store/feed-group-manager.service';
import {Observable} from 'rxjs';
import {IFeedGroupState} from '../store/state/feed-group.state';
import {take} from 'rxjs/operators';
import {PostTO} from '../../../models/PostTO.model';
import {FeedService} from '../../../services/feed.service';
import {PostService} from '../../../services/post.service';
import {FeedGenericService} from '../../../services/feed-generic.service';
import {PostPagination} from '../../../models/pagination/post.pagination';
import {GroupTO} from '../../../models/GroupTO.model';
import {Util} from '../../shared/Utils/util';
import {UserTO} from '../../../models/userTO.model';
import {PostPrivacy} from '../../../models/enums/PostPrivacy.enum';
import {Role} from '../../../models/enums/Role.enum';
import {GroupMemberService} from '../../../services/group-member.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-feed-group',
    templateUrl: './feed-group.component.html',
    styleUrls: ['./feed-group.component.scss']
})
export class FeedGroupComponent implements OnInit, OnDestroy {
    typePostControler = TypePostControler;
    feedRedux$: Observable<IFeedGroupState>;
    loading = false;
    page = 0;
    groupTO: GroupTO;
    user: UserTO;
    public privacy = PostPrivacy;
    isAdmin = false;
    isMember = false;

    constructor(
        public authService: AuthService,
        public router: Router,
        public feedGroupManagerService: FeedGroupManagerService,
        public feedService: FeedService,
        public postService: PostService,
        public feedGenericService: FeedGenericService,
        private route: ActivatedRoute,
        private groupMemberService: GroupMemberService,
        private translate: TranslateService,


    ) {
        this.feedGroupManagerService.clearRedux();
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        Util.loadingScreen();
        this.route.data.pipe(take(1)).subscribe((data: { groupTo: GroupTO }) => {
            Util.stopLoading();
            this.groupTO = data.groupTo;
            localStorage.setItem('groupId', this.groupTO.id);
            this.getMembers();
            this.getPosts();
        });
        this.feedRedux$ = this.feedGroupManagerService.getFeed();
    }

    getPosts(): void {
        this.loading = true;
        this.feedService.getGroupFeed(this.groupTO.id, this.page)
            .pipe(take(1))
            .subscribe(result => {
                this.loading = false;
                // result = result.map(r => { r.group = this.groupTO; return r; });
                this.feedGroupManagerService.getPostOnRedux(result);
                this.getComments(result);
            });
    }

    ngOnDestroy(): void {
        this.feedGroupManagerService.clearRedux();
    }

    getComments(content: PostTO[]): void {
        content.forEach((p) => {
            this.postService.getComment(p.id, 5, 0)
                .pipe(take(1))
                .subscribe(result => {
                    const post = this.feedGenericService.convertToNewPost(p);
                    post.comments = result;
                    this.feedGroupManagerService.updatePost(post);
                });
        });
    }

    updateRedux(result: PostPagination): void {
        if (result?.content?.length > 0) {
            this.page = this.page + 1;
            this.feedGroupManagerService.updatePage(this.page);
            this.feedGroupManagerService.getPostOnRedux(result.content);
            this.getComments(result.content);
        }
    }

    getMembers(): void {
        Util.loadingScreen();
        this.groupMemberService.getGroupMembers(this.groupTO.id)
            .pipe(
                take(1)
            ).subscribe(result => {
            Util.stopLoading();
            const member = result.find(m => m.user.id === this.authService.getUser().id);
            if (member) {
                if (member.role === Role.owner || member.role === Role.admin) {
                    this.isAdmin = true;
                }
                this.isMember = true;
            }
        }, error => {
            Util.stopLoading();
            this.translate.get('PADRAO.OCORREU_UM_ERRO').subscribe(message => {
                Util.showErrorDialog(message);
            });
            console.log('Erro: members-group getMembers', error);
        });
    }

}
