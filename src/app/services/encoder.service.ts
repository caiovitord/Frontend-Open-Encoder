import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIGURATION } from 'src/environments/configuration';

@Injectable({
  providedIn: 'root'
})
export class EncoderService {

  constructor(private httpClient: HttpClient) { 

  }

  private url = APP_CONFIGURATION.serverBaseUrl;

  requestEncoding(fileName) {
    return this.httpClient.post(`${this.url}/encoder`, {fileName: fileName}, { responseType: 'text' });
  }

}
