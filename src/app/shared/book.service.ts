import {EventEmitter, Injectable} from '@angular/core';
import {mapOptionMenu} from '../models/enums/optionMenu.enum';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  option: number;

  constructor() { }

  getOptionMenu(): number {
    return this.option;
  }

  setOptionMenu(option: number): void {
    this.option = option;
    // BookService.optionMenu.emit(option);
  }
}
