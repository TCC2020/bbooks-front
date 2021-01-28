import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reading-group',
  templateUrl: './reading-group.component.html',
  styleUrls: ['./reading-group.component.scss']
})
export class ReadingGroupComponent implements OnInit {
links = ['feed', 'about', 'members', 'book-of-month'];
activeLink = this.links[0];

constructor(
  private router: Router,
) { }

  ngOnInit(): void {
  }


  changeMenu(): void {
    const result = this.links.find(l => this.router.url.toLowerCase().includes(l.toLowerCase()));
    if (result) {
        this.activeLink = result;
        this.router.navigate([`reading-group/${result.toString()}`]);
    } else {
        this.activeLink = this.links[0];
        this.router.navigate([`reading-group/${this.links[0].toString()}`]);
    }
}

}
