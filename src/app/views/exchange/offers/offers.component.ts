import { Component, OnInit } from '@angular/core';
import {BookStatus, getArrayStatus} from '../../../models/enums/BookStatus.enum';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  statusList = getArrayStatus();
  constructor() { }

  ngOnInit(): void {
  }

}
