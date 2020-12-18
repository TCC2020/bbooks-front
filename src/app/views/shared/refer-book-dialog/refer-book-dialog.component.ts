import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/models/book.model';
import { BookRecommendationTO } from 'src/app/models/bookRecommendationTO.model';
import { Profile } from 'src/app/models/profileTO.model';
import { UserTO } from 'src/app/models/userTO.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookRecommendationService } from 'src/app/services/book-recommendation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-refer-book-dialog',
  templateUrl: './refer-book-dialog.component.html',
  styleUrls: ['./refer-book-dialog.component.scss']
})
export class ReferBookDialogComponent implements OnInit {


  pesquisarUsuarios;
  users: UserTO[];
  filterUsers: UserTO[];
  public Profile: Profile;
  private bookRecommendationTO = new BookRecommendationTO();
  public Book: Book;
  public formRecommendation: FormGroup;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { book: Book },
    private fb: FormBuilder,
    private userService: UserService,
    private bookRecommendationService: BookRecommendationService,
    private authService: AuthService,


  ) {
      this.pesquisarUsuarios = this.fb.group({
          user: ['']
      });
  }

  ngOnInit(): void {
    this.getUsers();
    this.createForm();
    this.Book = this.data.book;
  }

  private createForm(): void {
    this.formRecommendation = this.fb.group({
        comment: new FormControl(null, Validators.required)
    });
}

  pesquisar(nome) {
    this.filterUsers = this.users.filter(user =>
            user?.profile?.name.concat(user?.profile?.lastName).toLocaleLowerCase().replace(' ', '')
            .includes(nome.value.toLocaleLowerCase().replace(' ', '')));
  }

  getUsers() {
      this.userService.getAllUsers().subscribe(response => {
          this.users = response;
      });
  }

  referBook(profileReceivedId: number) {
    this.bookRecommendationTO.profileSubmitter = this.authService.getUser().profile.id;
    this.bookRecommendationTO.profileReceived = profileReceivedId;
    this.Book.api === 'google' ?
            this.bookRecommendationTO.idBookGoogle = this.Book.id :
            // tslint:disable-next-line:radix
            this.bookRecommendationTO.idBook = Number.parseInt(this.Book.id);
    this.bookRecommendationTO.comentario = this.formRecommendation.get('comment').value;
    this.bookRecommendationService.save(this.bookRecommendationTO).subscribe(
        () => {
            alert('O seu livro foi indicado para seu amigo.');
        },
        error => {
            console.log('TagDialog Error', error);
        }
    );
  }

}
