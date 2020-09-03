import {TestBed} from '@angular/core/testing';

import {ProfileService} from './profile.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ProfileService', () => {
    let service: ProfileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
              HttpClientTestingModule
          ]
        });
        service = TestBed.inject(ProfileService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
