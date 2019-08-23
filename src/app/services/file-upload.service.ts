import { APP_CONFIGURATION } from './../../environments/configuration';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { 

  }

  private url = APP_CONFIGURATION.serverBaseUrl;

  uploadDocument(formData: FormData) {
    //const file:any = formData.get('file');
    return this.httpClient.post(`${this.url}/file`, formData, { responseType: 'text' });
  }

}
