import { EncoderService } from './../services/encoder.service';
import { FileUploadService } from './../services/file-upload.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, timer, pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StepService } from '../services/step.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  fileInput: any;

  acceptedFormats = [
    "mp4",
    "MKV",
    "m4a",
    "m4v",
    "f4v",
    "f4a",
    "m4b",
    "m4r",
    "f4b",
    "mov",
    "3gp",
    "3gp2",
    "3g2",
    "3gpp",
    "3gpp2",
    "ogg",
    "oga",
    "ogv",
    "ogx",
    "wmv",
    "wma",
    "asf",
    "webm",
    "flv",
    "AVI",
    "HDV",
    "MXF",
    "ts",
    "WAV",
    "LXF",
    "GXF",
    "VOB"
  ];

  fileResult: any;
  createdEncoding: any;


  subscription: Subscription;
  statusText: string;
  encodingDataUpdate: any;
  encodingFinished: boolean;

  constructor(
    private fileUploadService: FileUploadService,
    private encoderService: EncoderService,
    private stepService: StepService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    

  }

  onFileChange(event) {
    this.fileInput = event.target.files[0];
    if (this.fileInput && this.fileInput.name &&  !this.fileCheck(this.getFileExtension(this.fileInput.name))) {
      this.fileInput = undefined;
      this.showSnackBar();
    }else{
      this.stepService.setOriginalFileName(this.fileInput.name);s
       
    }
    console.log(this.fileInput);
  }
  showSnackBar() {
    let snackBar = this.snackBar.open('Oops! Isso não me parece um vídeo', 'OK');

  }

  fileCheck(name: string) {
    console.log(name);
    return this.acceptedFormats.some(f => { return f.toUpperCase() == name.toUpperCase() });
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickSend() {
    this.stepService.setStep(2);
    if (this.fileInput /*&& this.getFileExtension(this.fileInput.name)*/) {
      const formData = new FormData();
      formData.append('file', this.fileInput);
      this.fileUploadService.uploadDocument(formData).subscribe((res :any) => {
        console.log(res);
        
        if(res.loaded == res.total && res.partialText){
          this.fileResult = res.partialText;
          this.stepService.setFileResult(this.fileResult);
          this.stepService.setStep(3);
        } 
      })
    }
  }


 


  onClickGerarManifest() {
    this.encoderService.gerarManifest(this.createdEncoding.encodingId).subscribe((res) => {
      console.log(res);
    });
  }

  getButtonString() {
    if (this.fileInput)
      return this.fileInput.name;
    else return 'SELECIONE O ARQUIVO';
  }



  getFileExtension(filename: string): string {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
  }
}
