import {fakeAsync, TestBed} from '@angular/core/testing';

import {TagService} from './tag.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('TagService', () => {
    let service: TagService;
    let httpMock: HttpTestingController;

    const Tag = {
        id: null,
        name: 'teste Tag',
        color: 'white',
        profile: null,
        books: []
    };

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
            .subscribe((data) => {
                expect(true).toBeFalsy();
            },
                error => {
                expect(true).toEqual(false);
                });
        const req = httpMock.expectOne(service.api);
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
    });

    it('getAllByProfile', async () => {
        service.getAllByProfile(4).subscribe(res => {
            expect(res.length).toBe(3);
        });
        const req = httpMock.expectOne(service.api + 'profile/4');
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
    });
    afterEach(() => {
        httpMock.verify();
    });
});
