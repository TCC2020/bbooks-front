import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthConfirmService} from '../../services/auth-confirm.service';
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import { EncryptService } from 'src/app/services/encrypt.service';

@Component({
  selector: 'app-auth-confirm',
  templateUrl: './auth-confirm.component.html',
  styleUrls: ['./auth-confirm.component.scss']
})
export class AuthConfirmComponent implements OnInit {
  confirmControl: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authConfirmService: AuthConfirmService,
    private authService: AuthService,
    private router: Router,
    private encrypt: EncryptService
  ) {
    this.confirmControl = this.fb.group({
      email: '',
      password: '',
      keepLogin: [false]
    });
  }

  ngOnInit(): void {
  }

  confirm(): void {
    this.confirmControl.value.password = this.encrypt.encryptPass(this.confirmControl.value.password);
    this.authConfirmService.confirm(this.confirmControl.value).subscribe(res => {
      this.authService.authenticate(res, this.confirmControl.value.keepLogin);
      this.router.navigateByUrl('/');
    },
      (err) => {
        alert(err.error.message);
      }
    );
  }

}
