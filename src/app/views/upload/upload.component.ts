import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Util} from '../shared/Utils/util';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

    public formFile: FormGroup;
    image: any;
    maxSize = 1000000;
    file;

    constructor(
        private formBuilder: FormBuilder,
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.formFile = this.formBuilder.group({
            file: new FormControl('', Validators.required)
        });
    }

    inputFileChange(event) {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0];
            if (!this.checkfiles(image.name)) {
                this.translate.get('MESSAGE_ERROR.NEED_BE_IMAGE').subscribe(message => {
                    Util.showErrorDialog(message);
                });
            } else {
                const reader = new FileReader();
                if (image.size > this.maxSize) {
                    this.translate.get('MESSAGE_ERROR.BIG_IMAGE').subscribe(message => {
                        Util.showErrorDialog(message);
                    });
                    this.file = '';
                    this.formFile.get('file').setValue('');
                    this.image = '';
                } else {
                    reader.onload = (e) => this.image = e.target.result;
                    this.file = image;
                    reader.readAsDataURL(image);
                    this.image = image;
                }
            }

        }
    }

    checkfiles(fileName: string) {
        const ext = fileName.substring(fileName.lastIndexOf('.') + 1);
        if (ext.includes('jpeg') || ext.includes('png') || ext.includes('jpg')) {
            return true;
        } else {
            this.formFile.reset();
            this.image = null;
            return false;
        }
    }
}
