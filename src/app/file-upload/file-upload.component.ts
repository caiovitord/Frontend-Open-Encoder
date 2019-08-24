import { EncoderService } from './../services/encoder.service';
import { FileUploadService } from './../services/file-upload.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  fileInput: any;


  fileResult: string;
  createdEncoding: any;


  subscription: Subscription;
  statusText: string;
  encodingDataUpdate: any;

  constructor(
    private fileUploadService: FileUploadService,
    private encoderService: EncoderService
  ) { }

  ngOnInit() {


  }

  onFileChange(event) {
    this.fileInput = event.target.files[0];
    console.log(this.fileInput);
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickSend() {
    if (this.fileInput /*&& this.getFileExtension(this.fileInput.name)*/) {
      const formData = new FormData();
      formData.append('file', this.fileInput);
      this.fileUploadService.uploadDocument(formData).subscribe((res) => {
        console.log(res);
        this.fileResult = res;
      })
    }
  }

  onClickEncode() {
    this.encoderService.requestEncoding(this.fileResult).subscribe((res) => {
      this.createdEncoding = res;
      localStorage.setItem('createdEncoding', JSON.stringify(res));


      this.encodingDataUpdate = []; 

      this.subscription = timer(0, 4000).pipe(
        switchMap(() => this.encoderService.getEncoding(this.createdEncoding.encodingId))
      ).subscribe(result => {
        console.log(result);
        this.encodingDataUpdate.push(result);

      });

    });
  }


}
