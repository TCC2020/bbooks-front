import { Component, OnInit } from '@angular/core';
import {BookService} from '../../../shared/book.service';
import {mapOptionMenu, OptionMenu} from '../../../models/enums/optionMenu.enum';

@Component({
  selector: 'app-book-menu',
  templateUrl: './book-menu.component.html',
  styleUrls: ['./book-menu.component.scss']
})
export class BookMenuComponent implements OnInit {
  optionMenu = OptionMenu;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.setOptionMenu(this.optionMenu.meusLivros);
  }

  setOption(option: number): void {
    this.bookService.setOptionMenu(option);
  }
  getOptionMenu(): number {
    return this.bookService.getOptionMenu();
  }

}
