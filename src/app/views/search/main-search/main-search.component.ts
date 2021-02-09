import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-main-search',
    templateUrl: './main-search.component.html',
    styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {
    links = ['people', 'groups'];
    public formSearch: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.createForm();

    }

    private createForm(): void {
        this.formSearch = this.formBuilder.group({
            search: new FormControl(null)
        });
    }

}
