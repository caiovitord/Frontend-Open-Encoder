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

  constructor(
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit() {
  }

  onFileChange(event){
    this.fileInput = event.target.files[0];
    if (this.fileInput /*&& this.getFileExtension(this.fileInput.name)*/) {
      const formData = new FormData();
      formData.append('file', this.fileInput);
      this.fileUploadService.uploadDocument(formData)
    }
    console.log(this.fileInput);
  }



}
