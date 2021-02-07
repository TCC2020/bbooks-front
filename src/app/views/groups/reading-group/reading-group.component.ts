import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserTO} from '../../../models/userTO.model';
import {GroupTO} from '../../../models/GroupTO.model';
import {Util} from '../../shared/Utils/util';
import {take} from 'rxjs/operators';
import {mapPostPrivacy, mapPostPrivacyStrinView} from '../../../models/enums/PostPrivacy.enum';

@Component({
    selector: 'app-reading-group',
    templateUrl: './reading-group.component.html',
    styleUrls: ['./reading-group.component.scss']
})
export class ReadingGroupComponent implements OnInit {
    links = ['feed', 'about', 'members'];
    groupTO: GroupTO;
    public mapPostPrivacy = mapPostPrivacyStrinView;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        Util.loadingScreen();
        this.route.data.pipe(take(1)).subscribe((data: { groupTo: GroupTO }) => {
            Util.stopLoading();
            this.groupTO = data.groupTo;
        });
    }


}
