import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewAllReactionsComponent} from './view-all-reactions.component';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ReactionsTO} from '../../../models/ReactionsTO';
import {ReactionsByType} from '../../../models/ReactionsByType.model';
import {MaterialModule} from '../../../material/material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateServiceMockForChild} from '../../../mocks/translate.service.mock';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BaseProfileTO} from '../../../models/BaseProfileTO.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ViewAllReactionsComponent', () => {
    let component: ViewAllReactionsComponent;
    let fixture: ComponentFixture<ViewAllReactionsComponent>;
    const profile = new BaseProfileTO();
    profile.id = 3;
    profile.username = 'tetse';
    profile.profileImage = '';
    profile.lastName = 'lucas';
    profile.name = 'lucas';
    const profiles = [];
    profiles.push(profile);
    profiles.push(profile);
    profiles.push(profile);
    const reactions = new ReactionsTO();
    reactions.likes = new ReactionsByType();
    reactions.likes.profiles = profiles;
    reactions.dislike = new ReactionsByType();
    reactions.dislike.profiles = profiles;
    reactions.loved = new ReactionsByType();
    reactions.loved.profiles = profiles;
    reactions.hilarius = new ReactionsByType();
    reactions.hilarius.profiles = profiles;
    reactions.surprised = new ReactionsByType();
    reactions.surprised.profiles = profiles;
    reactions.sad = new ReactionsByType();
    reactions.sad.profiles = profiles;
    reactions.hated = new ReactionsByType();
    reactions.hated.profiles = profiles;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewAllReactionsComponent],
            imports: [
                MaterialModule,
                RouterTestingModule,
                TranslateServiceMockForChild,
                HttpClientTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: reactions
                },
                TranslateService,
                TranslateStore
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewAllReactionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
