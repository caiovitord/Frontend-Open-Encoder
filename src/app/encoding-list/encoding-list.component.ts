import { EncoderService } from './../services/encoder.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EncodingProcess } from './../entities/EncodingProcess';
import { MatTableDataSource } from '@angular/material/table';
import { StepService } from './../services/step.service';
import { PlayerService } from './../player.service';
import { Component, OnInit } from '@angular/core';
import { Encoding } from '../entities/Encoding';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
export interface PeriodicElement {
  name: string;
  status: string;
  progress: number;
  eta: string;
}

const ELEMENT_DATA: Encoding[] = [
  { name: '.', createdAt: new Date(), outputPath: "" },
];

@Component({
  selector: 'app-encoding-list',
  templateUrl: './encoding-list.component.html',
  styleUrls: ['./encoding-list.component.scss']
})
export class EncodingListComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private stepService: StepService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private encoderService: EncoderService,
  ) { }


  openDialog(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      videoName: this.encodingTableDataDS.data[index].name,
      title: 'Confirme'
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true) {
        console.log("Delete ", index);
        this.encoderService.delete(this.stepService.getCreatedEncodingList().find(e => e.outputPath == this.encodingTableDataDS.data[index].outputPath).encodingId).subscribe((res)=>{
          console.log("Deletado da origem",res);
        });
        this.stepService.setCreatedEncodingList(this.stepService.getCreatedEncodingList().filter(e => e.outputPath !== this.encodingTableDataDS.data[index].outputPath))
        this.stepService.removeEncodingInUserStepByIndex(index);
        this.refresh();
      }
    });
  }

  displayedColumns: string[] = ['name', 'createdAt', 'outputPath', 'progress'];
  encodingTableDataDS = new MatTableDataSource<Encoding>(ELEMENT_DATA);


  ngOnInit() {
    this.stepService.setEncodingList(this);
    console.log("Filtering", this.stepService.getCreatedEncodingList().filter(e => e.finished));
    this.encodingTableDataDS.data = [].concat(this.initList(this.stepService.getCreatedEncodingList().filter(e => e.finished)));
  }

  initList(list: any[]) {
    const array = [];
    list.forEach(e => array.push({
      createdAt: e.createdAt, name: e.fileName, outputPath: e.outputPath,
    }));
    return array;
  }



  onClickAbrir(index) {
    console.log(index);
  }

  openCopySnackBar(path) {
    var config = new MatSnackBarConfig()
    config.duration = 2500;
    const snackBar = this.snackBar.open('Link copiado para área de transferência', 'OK', config);

    
    navigator.clipboard.writeText(("" + (window.location)).replace("steps", "") + "video/" + path  ).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  refresh(wait?) {
    if(wait)
      setTimeout(() => {this.encodingTableDataDS.data = [].concat(this.initList(this.stepService.getCreatedEncodingList().filter(e => e.finished)));}, 3000);
    else this.encodingTableDataDS.data = [].concat(this.initList(this.stepService.getCreatedEncodingList().filter(e => e.finished)));
  }

  

  onClickPlay(index?) {
    console.log("PLAY INDEX", index, this.stepService.getCreatedEncodingList()[index].outputPath)
    this.playerService.playByKey(this.stepService.getCreatedEncodingList()[index].outputPath, this.stepService.getCreatedEncodingList()[index].fileName);
  }

  onClickEnviarOutro() {
    this.stepService.sendAnother();
  }

  isStep2Or3() {
    return this.stepService.getStep() == 2;
  }


  addToTable() {
    this.encodingTableDataDS.data = [].concat(this.encodingTableDataDS.data).concat();

  }

  removeOfTable(index) {
    this.encodingTableDataDS.data = [].concat(this.encodingTableDataDS.data.splice(index, 1));

  }


  timeSince(date: any) {
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
