import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent implements OnInit {

  newPassword: FormGroup;
  profileTo: any;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService) {
    
   }

  ngOnInit(): void {
    this.createForm();
    this.profileService.getById(this.authService.getUser().profile.id).subscribe(
      user => {
        this.profileTo = user;
        this.createForm();
      }
    );
  }

  createForm() {
    this.newPassword = this.fb.group({
        email: [this.profileTo?.user?.email ? this.profileTo.user.email : '', Validators.compose([
            Validators.required,
            Validators.email
        ])],
    });
  }
}
