import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../services/book.service";
import {BookCase} from "../../../models/bookCase.model";
import {Tag} from "../../../models/tag";
import {AuthService} from "../../../services/auth.service";
import {TagService} from "../../../services/tag.service";

@Component({
    selector: 'app-tag-dialog',
    templateUrl: './tag-dialog.component.html',
    styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent implements OnInit {

    public formTag: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private tagService: TagService
    ) {

    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        this.formTag = this.formBuilder.group({
            name: new FormControl(null, Validators.required),
        });
    }

    save() {
        const tag = new Tag();
        tag.name = this.formTag.get('name').value;
        tag.profileId = this.authService.getUser().profile.id;
        tag.books = [];
        this.tagService.save(tag).subscribe(response => {
        });
    }

}
