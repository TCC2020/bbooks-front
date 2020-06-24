import { Component, OnInit } from '@angular/core';
import {BookService} from '../../shared/book.service';
import {OptionMenu} from '../../models/enums/optionMenu.enum';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {
  optionMenu = OptionMenu;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }
  getOptionMenu(): number {
    return this.bookService.getOptionMenu();
  }
}
