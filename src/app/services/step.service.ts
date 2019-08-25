import { UserStepsComponent } from '../user-steps/user-steps.component';
import { Injectable } from '@angular/core';
import { EncodingListComponent } from '../encoding-list/encoding-list.component';

@Injectable({
  providedIn: 'root'
})
export class StepService {







  step: number = 1;
  UserStepsComponent: any;
  encodingListComponent: any;

  constructor() { 

  }

  setEncodingList(arg0: EncodingListComponent) {
    this.encodingListComponent = arg0;
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
       return this.UserStepsComponent.step2();
      case 3:
        return  this.UserStepsComponent.step3();
    }
  }


  setFileResult(fileResult: string) {
    localStorage.setItem('fileResult', fileResult);
  }

  getFileResult(){
    return localStorage.getItem('fileResult');
  }

  setUserStepsComponent(UserStepsComponent:UserStepsComponent){
    this.UserStepsComponent = UserStepsComponent;
  }

  setOriginalFileName(str){
    localStorage.setItem('originalFileName', str);
  }

  getOriginalFileName(){
    return localStorage.getItem('originalFileName');
  }

  setUserHasEncodings(arg0: boolean) {
    localStorage.setItem('hasencodings', arg0 ? "true" : "false");
  }

  getUserHasEncodings() {
    return localStorage.getItem('hasencodings');
  }


  sendAnother() {
    console.log("Enviar outro")
    this.setStep(1);
    this.UserStepsComponent.onClickEnviarOutro();
  }

  pushCreatedEncoding(created: any) {
    var createdEncodings :any = localStorage.getItem('createdEncoding');

    createdEncodings = createdEncodings ? JSON.parse(createdEncodings) : [];
    createdEncodings.push(created);

    localStorage.setItem('createdEncoding', JSON.stringify(createdEncodings));
    if(this.encodingListComponent) this.encodingListComponent.refresh();
  }

  getCreatedEncodingList(): any[] {
    var createdEncodings :any= localStorage.getItem('createdEncoding');
    createdEncodings = createdEncodings ? JSON.parse(createdEncodings) : [];
    return createdEncodings;
  }

  setCreatedEncodingList(arg0: any[]) {
    localStorage.setItem('createdEncoding', JSON.stringify(arg0));
    if(this.encodingListComponent) this.encodingListComponent.refresh();
  }
}
