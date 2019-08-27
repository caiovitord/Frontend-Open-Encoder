import { APP_CONFIGURATION } from './../../environments/configuration';
import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { 

  }

  private url = APP_CONFIGURATION.serverBaseUrl;

  uploadDocument(formData: FormData) {
    //const file:any = formData.get('file');
    return this.httpClient.post(`${this.url}/files/upload`, formData, { responseType: 'text', reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return event;
      }
    })
    );


  }

}
