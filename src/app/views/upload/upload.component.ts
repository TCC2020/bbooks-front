import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

    public formFile: FormGroup;
    image: any;
    maxSize = 3579139;
    file;

    constructor(
        private formBuilder: FormBuilder
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
                alert('O arquivo precisa se uma imagem, favor tentar novamente!');
            } else {
                const reader = new FileReader();
                if (image.size > this.maxSize) {
                    alert('O arquivo é muito grande, favor formatar...');
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
