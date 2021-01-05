import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Observable} from 'rxjs';
import {UserTO} from '../../../models/userTO.model';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  public formFeed: FormGroup;
  public user: UserTO;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.createForm();

  }
  private createForm(): void {
    this.formFeed = this.formBuilder.group({
      post: new FormControl(null, Validators.required),
    });
  }
  isMobile() {
    const userAgent = window.navigator.userAgent.toLocaleLowerCase();
    return userAgent.includes('iphone') || userAgent.includes('android');
  }

}
