import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../services/book.service";
import {BookCase} from "../../../models/bookCase.model";
import {Tag} from "../../../models/tag";
import {AuthService} from "../../../services/auth.service";
import {TagService} from "../../../services/tag.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-tag-dialog',
    templateUrl: './tag-dialog.component.html',
    styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent implements OnInit {

    public formTag: FormGroup;

    public textForm: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public tag: Tag,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private tagService: TagService,
        public dialogRef: MatDialogRef<Tag>
    ) {
    }

    ngOnInit(): void {
        if (this.tag) {
            this.textForm = 'Editar';
        } else {
            this.textForm = 'Criar';
        }
        this.createForm();
    }

    private createForm(): void {
        this.formTag = this.formBuilder.group({
            name: new FormControl(this.tag?.name, Validators.required),
        });
    }

    save() {
        if (this.tag) {
            this.tag.name = this.formTag.get('name').value;
        } else {
            const tag = new Tag();
            tag.name = this.formTag.get('name').value;
            tag.profileId = this.authService.getUser().profile.id;
            tag.books = [];
            this.tagService.save(tag).subscribe(response => {
                this.dialogRef.close(response);
            });
        }
    }

}
