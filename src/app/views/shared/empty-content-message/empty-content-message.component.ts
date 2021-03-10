import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-empty-content-message',
  templateUrl: './empty-content-message.component.html',
  styleUrls: ['./empty-content-message.component.scss']
})
export class EmptyContentMessageComponent implements OnInit {

  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
