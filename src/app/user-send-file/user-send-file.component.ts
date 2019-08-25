import { StepService } from './../services/step.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-send-file',
  templateUrl: './user-send-file.component.html',
  styleUrls: ['./user-send-file.component.scss']
})
export class UserSendFileComponent implements OnInit {
  spinnerDiameter: any = 1;

  constructor(private stepService: StepService) { }

  step = 1;

  @ViewChild('panel1', null) panel1;
  @ViewChild('panel2', null) panel2;


  ngOnInit() {
    this.panel1.open();
    this.panel2.close();
    this.stepService.setStep(1);
    this.stepService.setUserSendFileComponent(this);
  }

  async step2() {
    await this.delay(100);
    console.log("Step 2");
    this.panel1.close();
    this.panel2.open();
    this.step = 2;
    
  }


  step3() {
    console.log("Step 3");
    this.step = 3;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


}
