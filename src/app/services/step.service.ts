import { UserSendFileComponent } from './../user-send-file/user-send-file.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepService {



  step: number = 1;
  userSendFileComponent: any;

  constructor() { 

  }

  getStep(){
    let step :any  = localStorage.getItem('step');
    step = step ? Number.parseInt(step,10) : null;
    this.step = step || this.step;
    return this.step;
  }

  setStep(number){
    this.step = number;
    localStorage.setItem('step', number);

    switch(number){
      case 2:
       return this.userSendFileComponent.step2();
      case 3:
        return  this.userSendFileComponent.step3();
    }
  }


  setFileResult(fileResult: string) {
    localStorage.setItem('fileResult', fileResult);
  }

  getFileResult(){
    return localStorage.getItem('fileResult');
  }

  setUserSendFileComponent(userSendFileComponent:UserSendFileComponent){
    this.userSendFileComponent =userSendFileComponent;
  }

  setOriginalFileName(str){
    localStorage.setItem('originalFileName', str);
  }

  getOriginalFileName(){
    return localStorage.getItem('originalFileName');
  }
}
