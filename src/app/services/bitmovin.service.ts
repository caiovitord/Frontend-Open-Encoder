import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BitmovinService {

  constructor(private httpClient: HttpClient) { 

  }

  private url = 'https://api.bitmovin.com/v1';
}
