import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { of, Observable } from 'rxjs';

export class EncodingDataSource extends DataSource<any> {




  constructor(private encodings) {
    super();
  }

  connect(): Observable<any> {
    return of(this.encodings);
  }

  disconnect() {
    // No-op
  }



}