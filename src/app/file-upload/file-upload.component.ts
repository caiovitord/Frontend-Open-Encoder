import { EncoderService } from './../services/encoder.service';
import { FileUploadService } from './../services/file-upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  
  fileInput: any;

  acceptedFormats = [

  ];
  fileResult: string;

  constructor(
    private fileUploadService: FileUploadService,
    private encoderService: EncoderService
  ) { }

  ngOnInit() {
  }

  onFileChange(event){
    this.fileInput = event.target.files[0];

    console.log(this.fileInput);
  }

  onClickSend(){
    if (this.fileInput /*&& this.getFileExtension(this.fileInput.name)*/) {
      const formData = new FormData();
      formData.append('file', this.fileInput);
      this.fileUploadService.uploadDocument(formData).subscribe((res)=>{
        console.log(res);
        this.fileResult = res;
      })
    }
  }

  onClickEncode(){
    this.encoderService.requestEncoding(this.fileResult).subscribe((res)=>{
      console.log(res);
    })
  }


}
