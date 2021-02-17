import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GroupTO} from '../../../models/GroupTO.model';
import {GroupService} from '../../../services/group.service';


@Injectable()
export class MembersGroupResolve implements Resolve<GroupTO> {

    constructor(
        private groupService: GroupService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<GroupTO> | Promise<GroupTO> | GroupTO {
        const id = route.parent.params.id;
        return this.groupService.getById(id);
    }
}
