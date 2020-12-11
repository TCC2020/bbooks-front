import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CDNFile } from '../models/CDNFile';

@Injectable({
  providedIn: 'root'
})
export class CDNService {

  api = environment.api + 'cdn/';

  bucket = 'cdn-bbooks';

  constructor(private http: HttpClient) { }

  upload(value: CDNFile, info: any) {
    const formData: FormData = new FormData();
    formData.append('file', value.file, value.file.name);
    formData.append('info', JSON.stringify(
        info
      ));
    return this.http.post(this.api + 'upload', formData);
  }

  uploadAsync(file, info) {

    return new Promise(resolve => {
      setTimeout(() => {
        if (file) {
          info.bucket = this.bucket;
          const formData: FormData = new FormData();
          formData.append('info', JSON.stringify(info));

          formData.append('file', file, file.name);

          this.uploadFile(formData).subscribe(response => {
            if (response) {
              // tslint:disable-next-line: no-string-literal
              resolve(response);
            } else {
              resolve();
            }
          },
            e => {
              if (e.error.message.includes('FILE_DUPLICATE')) { alert('O arquivo já existe...'); }
              if (e.error.message.includes('FILE_MAX_SIZE')) { alert('O arquivo é muito grande...'); }
            }
          );
        }
      }, 1);
    });
  }

  uploadFile(data: FormData) {
    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
      .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
      .set('Accept', '*/*')
      .set('enctype', 'multipart/form-data');

    return this.http.post(this.api + 'upload', data,
      { headers });
  }

}