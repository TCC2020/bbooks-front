import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { readingTargetMock } from '../mocks/reading-target.model.mock';
import { userbookMock } from '../mocks/userbook.model.mock';

import { ReadingTargetService } from './reading-target.service';

describe('ReadingTargetService', () => {
  let service: ReadingTargetService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ReadingTargetService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addTarget: should call http PUT', done => {
    service.addTarget(readingTargetMock.profileId, userbookMock.id)
        .subscribe(() => {
        });
    const req = httpMock.expectOne(service.api);
    expect(req.request.method).toBe('PUT');
    done();
  });

  it('removeTarget: should call http DELETE', done => {
    service.removeTarget(readingTargetMock.profileId, userbookMock.id)
        .subscribe(() => {
        });
    const req = httpMock.expectOne(service.api  + 'delete/profile/' + readingTargetMock.profileId + '/user-book/' + userbookMock.id);
    expect(req.request.method).toBe('DELETE');
    done();
  });

  it('getByUserBookId: should call http GET', done => {
    service.getByUserBookId(readingTargetMock.profileId, userbookMock.id)
        .subscribe(() => {
        });
    const req = httpMock.expectOne(service.api  + 'search/profile/' + readingTargetMock.profileId + '/user-book/' + userbookMock.id);
    expect(req.request.method).toBe('GET');
    done();
  });

  it('save: should call http POST', done => {
    service.save(readingTargetMock)
        .subscribe(() => {
        });
    const req = httpMock.expectOne(service.api);
    expect(req.request.method).toBe('POST');
    done();
  });

  it('delete: should call http DELETE', done => {
    service.delete(readingTargetMock.id)
        .subscribe(() => {
        });
    const req = httpMock.expectOne(service.api + readingTargetMock.id);
    expect(req.request.method).toBe('DELETE');
    done();
  });

  it('getAllByProfileId: should call http GET', done => {
    service.getAllByProfileId(readingTargetMock.profileId)
        .subscribe(() => {
        });
    const req = httpMock.expectOne(service.api + 'profile/' + readingTargetMock.profileId);
    expect(req.request.method).toBe('GET');
    done();
  });

  it('getAllById: should call http GET', done => {
    service.getAllById(readingTargetMock.id)
        .subscribe(() => {
        });
    const req = httpMock.expectOne(service.api + readingTargetMock.id);
    expect(req.request.method).toBe('GET');
    done();
  });
});
