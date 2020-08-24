import {fakeAsync, TestBed} from '@angular/core/testing';

import {TagService} from './tag.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {first} from "rxjs/operators";

describe('TagService', () => {
    let service: TagService;
    let httpMock: HttpTestingController;

    const Tag = {
        id: null,
        name: 'teste Tag',
        color: 'white',
        profile: null,
        books: []
    }
    let response;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [

            ]
        });
        service = TestBed.inject(TagService);

        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should be created', async () => {
        expect(service).toBeTruthy();
    });
    it('save', async () => {
        service.save(Tag)
            .pipe(
                first(),
            )
            .subscribe((data) => {
                expect(data).toMatchObject(Tag);
            });
        const req = httpMock.expectOne(service.api);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
    });

    it('getAllByProfile', async () => {
        service.getAllByProfile(4).subscribe(res => {

        });
        const req = httpMock.expectOne(service.api + 'profile/4');
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
    });
    afterEach(() => {
        httpMock.verify();
    });
});
