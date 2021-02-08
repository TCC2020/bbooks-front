import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {UserTO} from '../../../models/userTO.model';
import {MatDialog} from '@angular/material/dialog';
import {PostDialogComponent} from '../../shared/post-dialog/post-dialog.component';
import {AuthService} from '../../../services/auth.service';
import {PostService} from '../../../services/post.service';
import {PostTO} from '../../../models/PostTO.model';
import {Util} from '../../shared/Utils/util';
import {TranslateService} from '@ngx-translate/core';
import {FeedService} from '../../../services/feed.service';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
    user: UserTO;
    page = 0;
    posts: PostTO[] = [];
    loading = false;

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private router: Router,
        public authService: AuthService,
        public postService: PostService,
        public translate: TranslateService,
        public feedService: FeedService
    ) {
    }

    ngOnInit(): void {
        this.route.data.pipe(take(1)).subscribe((data: { user: UserTO }) => {
            this.user = data.user;
            this.getPosts();
        });
    }

    openPost(post?: PostTO) {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('android')) {
            this.router.navigate([this.user.userName + '/create-post'], {state: { post }});
        } else {
            this.openPostDialog(post);
        }
    }

    openPostDialog(post?: PostTO) {
        const dialogRef = this.dialog.open(PostDialogComponent, {
            height: '450px',
            width: '500px',
            data: post
        });
        dialogRef.afterClosed()
            .pipe().subscribe((res) => {
            if (res) {
                if (post) {
                    const index = this.posts.indexOf(post);
                    this.posts[index].description = res.description;
                } else {
                    this.posts.unshift(res);

                }
            }
        });
    }

    onScroll() {
        this.getPosts();
    }

    getPosts(): void {
        this.loading = true;
        this.feedService.getPersonFeed(this.authService.getUser().profile.id, 5, this.page)
            .pipe(take(1))
            .subscribe(result => {
                this.loading = false;
                if (result.content.length > 0) {
                    this.page++;
                    this.posts = this.posts.concat(result.content);
                }
            });
    }

    delete(p: PostTO): void {
        Util.loadingScreen();
        const index = this.posts.indexOf(p);
        this.postService.delete(p.id)
            .pipe(take(1))
            .subscribe(() => {
                this.posts.splice(index, 1);
                Util.stopLoading();
                this.translate.get('POST.POST_EXCLUIDO')
                    .pipe(take(1))
                    .subscribe(msg => {
                        Util.showSuccessDialog(msg);
                    });
            });
    }
}
