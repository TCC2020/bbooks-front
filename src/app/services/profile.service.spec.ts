import {TestBed} from '@angular/core/testing';

import {ProfileService} from './profile.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {reviewMock} from '../mocks/review.model.mock';
import {profileMock} from '../mocks/profile.model.mock';

describe('ProfileService', () => {
    let service: ProfileService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
              HttpClientTestingModule
          ]
        });
        service = TestBed.inject(ProfileService);
        httpMock = TestBed.inject(HttpTestingController);

    });

    it('should be created profile service', () => {
        expect(service).toBeTruthy();
    });

    it('update: should update and return expected Profile',  done => {
        const spy = jest.spyOn(service, 'update').mockReturnValue(of(profileMock));
        service.update(profileMock)
            .subscribe(result => {
                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(profileMock);
                expect(result).toEqual(profileMock);
                done();
            });
    });

    it('update: should call http PUT',  done => {
        service.update(profileMock)
            .subscribe(() => {
            });
        const req = httpMock.expectOne(service.api + profileMock.id );
        expect(req.request.method).toBe('PUT');
        done();
    });
});
