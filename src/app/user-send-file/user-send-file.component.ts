import { EncoderService } from './../services/encoder.service';
import { StepService } from './../services/step.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';


export interface PeriodicElement {
  name: string;
  status: string;
  progress: string;
  eta: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {eta: "", name: '', status: "", progress: '' },
];

@Component({
  selector: 'app-user-send-file',
  templateUrl: './user-send-file.component.html',
  styleUrls: ['./user-send-file.component.scss']
})
export class UserSendFileComponent implements OnInit {

  qualities = [
    { text: "Alta", value: "h" },
    { text: "Média", value: "m" },
    { text: "Baixa", value: "l" },
  ];
  createdEncoding: any;
  encodingDataUpdate: any[];
  subscription: any;
  encodingFinished: boolean;

  displayedColumns: string[] = ['name', 'eta' , 'status', 'progress'];
  oneEncodingTable = ELEMENT_DATA;

  constructor(
    private encoderService: EncoderService,
    private stepService: StepService) { }

  step;
  selected: any;

  @ViewChild('panel1', null) panel1;
  @ViewChild('panel2', null) panel2;
  @ViewChild('panel3', null) panel3;

  @ViewChild('select', null) select;



  ngOnInit() {
    this.stepService.setUserSendFileComponent(this);

    var step = this.stepService.getStep();


    switch (step) {
      case 1:
        this.step = 1;
        break;
      case 2:
        this.stepService.setStep(1);
        this.step = 1;
        break;
      case 3:
        if (this.stepService.getFileResult()) {
          this.stepService.setStep(3);
          this.step = step;
          setTimeout(this.step3, 200);
        } else {
          this.step = 1;
          this.stepService.setStep(1);
        }
        break;
      case 4:
        this.encodingDataUpdate = [];
        this.startStatusWatcher();
        this.startStep4(true);
        break;
    }
  }

  async step2() {
    await this.delay(100);
    console.log("Step 2");
    this.panel1.close();
    this.panel2.open();
    this.step = 2;

  }


  step3() {
    if (this.panel2) {
      this.panel2.open();
    }
    console.log('Step 3 function');
    this.step = 3;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



  onClickEncode() {
    this.startStep4();

    this.encoderService.requestEncoding(localStorage.getItem('fileResult')).subscribe((res: any) => {
      this.createdEncoding = res;

      localStorage.setItem('createdEncoding', JSON.stringify(res));
      localStorage.setItem('path', res.outputPath);


      this.encodingDataUpdate = [];
      this.startStatusWatcher();

    });
  }

  async startStep4(refresh?) {
    await this.delay(300);
    if (!refresh) {
      this.panel3.open();
    }
    this.step = 4;
    this.stepService.setStep(4);

    this.oneEncodingTable = [];
    this.oneEncodingTable.push({name: this.stepService.getOriginalFileName(), eta: "..." , status: "Carregando...", progress: "Carregando..." })
  }

  startStatusWatcher() {
    this.subscription = timer(0, 4000).pipe(
      switchMap(() => this.encoderService.getEncoding(JSON.parse(localStorage.getItem('createdEncoding')).encodingId))
    ).subscribe((result: any) => {
      console.log(result);
      this.encodingDataUpdate.push(result);

      this.updateStatus(result);

      if (result.status === 'FINISHED') {
        this.encodingFinished = true;
        this.subscription.unsubscribe();
      }
    });
  }

  updateStatus(result: any) {
    this.oneEncodingTable[0].status = result.status === "QUEUED" 
  }

}
