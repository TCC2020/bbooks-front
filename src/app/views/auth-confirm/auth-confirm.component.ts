import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthConfirmService} from '../../services/auth-confirm.service';
import { Md5 } from 'ts-md5/dist/md5';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-confirm',
  templateUrl: './auth-confirm.component.html',
  styleUrls: ['./auth-confirm.component.scss']
})
export class AuthConfirmComponent implements OnInit {
  confirmControl: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AuthConfirmService: AuthConfirmService,
    private authGuard: AuthGuard,
    private router: Router
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
    console.log(this.confirmControl.value.password)
    this.confirmControl.value.password = Md5.hashStr(this.confirmControl.value.password);
    console.log(this.confirmControl.value.password)
    this.AuthConfirmService.confirm(this.confirmControl.value).subscribe(res => {
      this.authGuard.login(res, this.confirmControl.value.keepLogin);
      this.router.navigateByUrl('/');
    },
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
