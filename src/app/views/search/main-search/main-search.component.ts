import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Route, Router} from '@angular/router';

@Component({
    selector: 'app-main-search',
    templateUrl: './main-search.component.html',
    styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {
    links = ['people', 'groups', 'books'];
    public formSearch: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    redirect(): void {
        const url = this.router.url.toString();
        let subrouter = '';
        if (url.includes('groups')) {
            subrouter = 'groups';
        }
        if (url.includes('people')) {
            subrouter = 'people';
        }
        if (url.includes('books')) {
            subrouter = 'books';
        }
        this.router.navigate(['search/' + subrouter], {queryParams: {search: this.formSearch.get('search').value}});
    }

    private createForm(): void {
        this.formSearch = this.formBuilder.group({
            search: new FormControl(null)
        });
    }

}
