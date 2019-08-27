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

  requestEncoding(fileName, encodingQuality) {
    return this.httpClient.post(`${this.url}/encodings`, { fileName, encodingQuality});
  }

  getEncoding(encodingId) {
    return this.httpClient.get(`${this.url}/encodings/${encodingId}`);
  }

  gerarManifest(encodingId: any) {
    return this.httpClient.post(`${this.url}/encodings/${encodingId}/manifest`,{}, { responseType: 'text'});
  }

  delete(encodingId: any) {
    return this.httpClient.delete(`${this.url}/encodings/${encodingId}`);
  }

}
