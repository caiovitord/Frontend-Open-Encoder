import { EncodingProcess } from '../entities/EncodingProcess';
import { EncodingDataSource } from './EncodingDataSource';
import { EncoderService } from '../services/encoder.service';
import { StepService } from '../services/step.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTable, MatTableDataSource } from '@angular/material/table';






@Component({
  selector: 'app-user-steps',
  templateUrl: './user-steps.component.html',
  styleUrls: ['./user-steps.component.scss']
})
export class UserStepsComponent implements OnInit {

  qualities = [
    { text: 'Alta', value: 'h' },
    { text: 'Média', value: 'm' },
    { text: 'Baixa', value: 'l' },
  ];

  createdEncoding: any;
  encodingDataUpdate: any[] = [];
  subscription: any[] = [];
  encodingFinished: boolean;

  clickedSendAnother = false;

  progressBarColor = 'primary';

  displayedColumns: string[] = ['name', 'createdAt', 'eta', 'status', 'progress'];

  oneEncodingTableDS = new MatTableDataSource<EncodingProcess>([]);

  userHasEncodings: any;

  constructor(
    private encoderService: EncoderService,
    private changeDetectorRefs: ChangeDetectorRef,
    private stepService: StepService) { }

  step;
  selected: any;

  @ViewChild('panel1', null) panel1;
  @ViewChild('panel2', null) panel2;
  @ViewChild('panel3', null) panel3;

  @ViewChild('select', null) select;



  ngOnInit() {
    this.stepService.setUserStepsComponent(this);
    this.userHasEncodings = this.stepService.getUserHasEncodings();

    let step = this.stepService.getStep();


    switch (step) {
      case 1:
        this.step = 1;
        if (this.stepService.getCreatedEncodingList().length) {
          this.onClickEnviarOutro();
          this.stepService.getCreatedEncodingList().forEach((e, index) => this.addToTable(index));
          this.startStatusWatcher();
        }
        break;
      case 2:
        this.stepService.setStep(1);
        this.step = 1;
        if (this.stepService.getCreatedEncodingList().length) {
          this.onClickEnviarOutro();
          this.stepService.getCreatedEncodingList().forEach((e, index) => this.addToTable(index));
          this.startStatusWatcher();
        }
        break;
      case 3:
        if (this.stepService.getFileResult()) {
          this.stepService.setStep(3);
          this.step = step;
          setTimeout(this.step3, 200);
          if (this.stepService.getCreatedEncodingList().length) {
            this.stepService.getCreatedEncodingList().forEach((e, index) => this.addToTable(index));
            this.startStatusWatcher();
          }
        } else {
          this.step = 1;
          this.stepService.setStep(1);
        }
        break;
      case 4:
        this.encodingDataUpdate = [];
        this.startStep4(true);
        this.startStatusWatcher();
        if (this.stepService.getCreatedEncodingList().length) {
          this.stepService.getCreatedEncodingList().forEach((e, index) => this.addToTable(index));
        }
        break;
    }
    console.log(step);
  }

  async step2() {
    await this.delay(100);
    console.log('Step 2');
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
    this.addToTable();



    console.log(this.oneEncodingTableDS.data);

    this.startStep4();

    this.encoderService.requestEncoding(localStorage.getItem('fileResult')).subscribe((res: any) => {
      this.createdEncoding = res;

      this.createdEncoding.createdAt = new Date();
      this.createdEncoding.fileName = localStorage.getItem('originalFileName');
      this.createdEncoding.fileResult = localStorage.getItem('fileResult');
      this.createdEncoding.finished = false;
      this.stepService.pushCreatedEncoding(this.createdEncoding);
      //localStorage.setItem('path', res.outputPath);


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

  }

  startStatusWatcher() {
    console.log("START STATUS WATCHER");
    this.stepService.getCreatedEncodingList().forEach((elem, index) => {
      this.subscription.push({
        id: elem.encodingId, sub: timer(0, 4000).pipe(
          switchMap(() => this.encoderService.getEncoding(elem.encodingId))
        ).subscribe((result: any) => {
          console.log(result, index, elem.encodingId);
          this.encodingDataUpdate.push(result);

          this.updateStatus(result, index);

          if (result.status === 'FINISHED') {
            this.encodingFinished = true;


            this.subscription.find(e => e.id == elem.encodingId).sub.unsubscribe();


            this.encoderService.gerarManifest(
              elem.encodingId).subscribe((res) => {
                console.log(res);
              });


            this.startStep5(index);

            //this.oneEncodingTableDS.data.splice(index,1);

            //this.oneEncodingTable.splice(index, 1);
            const updatedList = this.stepService.getCreatedEncodingList();
            updatedList[index].finished = true;
            this.stepService.setCreatedEncodingList(updatedList);

          }
        })
      });
    })

  }

  /*
    push(){
      console.log(this.oneEncodingTableDS.data);
      
    }*/

  updateStatus(result: any, index) {
    console.log('Index', index);
    if (this.oneEncodingTableDS.data[index]) {
      this.oneEncodingTableDS.data[index].status = result.status === 'QUEUED' ? 'Na fila' : result.status === 'FINISHED' ? 'Finalizado' : 'Processando';
      this.oneEncodingTableDS.data[index].progress = result.progress;

      if (this.oneEncodingTableDS.data[index].progress == 100) {
        this.progressBarColor = 'warn';
      }

      const min = Math.floor(result.eta / 60);
      const seg = (result.eta - Math.floor(result.eta / 60) * 60);
      this.oneEncodingTableDS.data[index].eta = (min ? (min + ' min.') : '') + (seg ? seg + ' e seg.' : '');
      this.oneEncodingTableDS.data[index].eta = this.oneEncodingTableDS.data[index].eta == '' ? 'Pronto' : this.oneEncodingTableDS.data[index].eta;
    }
  }

  startStep5(index) {
    this.stepService.setUserHasEncodings(true);
    this.userHasEncodings = true;
  }


  onClickEnviarOutro() {
    if (this.step == 2) return;
    this.clickedSendAnother = true;
    this.stepService.setStep(1);
    this.step = 1;
    window.scrollTo(0,0);
  }


  addToTable(index?) {
    this.oneEncodingTableDS.data = [].concat(this.oneEncodingTableDS.data).concat([{ name: this.stepService.getOriginalFileName(), createdAt: index != undefined ? this.stepService.getCreatedEncodingList()[index].createdAt : new Date() , eta: '...', status: 'Carregando...', progress: 0 }]);

  }

  removeFromTable(index) {
    this.oneEncodingTableDS.data.splice(index, 1)
    this.oneEncodingTableDS.data = [].concat(this.oneEncodingTableDS.data);
  }



  timeSince(date : any) {
    date = new Date(date)
    var seconds = Math.floor((new Date().getTime() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " anos";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " meses";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " dias";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " horas";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutos";
    }
    return Math.floor(seconds) + " segundos";
  }

}
