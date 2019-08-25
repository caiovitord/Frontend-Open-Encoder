import { EncodingProcess } from './../entities/EncodingProcess';
import { MatTableDataSource } from '@angular/material/table';
import { StepService } from './../services/step.service';
import { PlayerService } from './../player.service';
import { Component, OnInit } from '@angular/core';
import { Encoding } from '../entities/Encoding';

export interface PeriodicElement {
  name: string;
  status: string;
  progress: number;
  eta: string;
}

const ELEMENT_DATA: Encoding[] = [
  {name: '.', createdAt: new Date(),  outputPath: "" },
];

@Component({
  selector: 'app-encoding-list',
  templateUrl: './encoding-list.component.html',
  styleUrls: ['./encoding-list.component.scss']
})
export class EncodingListComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private stepService:StepService,

    ) { }


      
  displayedColumns: string[] = ['name', 'createdAt' , 'outputPath', 'progress'];
  encodingTableDataDS = new MatTableDataSource<Encoding>(ELEMENT_DATA);


  ngOnInit() {
    this.stepService.setEncodingList(this);
    console.log("Filtering", this.stepService.getCreatedEncodingList().filter(e => e.finished));
    this.encodingTableDataDS.data = [].concat(this.initList(this.stepService.getCreatedEncodingList().filter(e => e.finished)));
  }

  initList(list: any[]){
    const array =[];
    list.forEach(e => array.push({
      createdAt: e.createdAt, name: e.fileName, outputPath: e.outputPath,
    }));
    return array;
  }



  onClickAbrir(index){
    console.log(index);
    window.open(
      'https://caiovitor.com',
      '_blank'
    );
  }

  refresh(){
    this.encodingTableDataDS.data = [].concat(this.initList(this.stepService.getCreatedEncodingList().filter(e => e.finished)));
  }

  onClickPlay(index?){
    console.log("PLAY INDEX", index, this.stepService.getCreatedEncodingList()[index].outputPath)
    this.playerService.playByKey(this.stepService.getCreatedEncodingList()[index].outputPath);
  }

  onClickEnviarOutro(){
    this.stepService.sendAnother();
  }

  isStep2Or3(){
    return this.stepService.getStep() == 2;
  }


  addToTable(){
    this.encodingTableDataDS.data = [].concat(this.encodingTableDataDS.data).concat();

  }

  removeOfTable(index){
    this.encodingTableDataDS.data = [].concat(this.encodingTableDataDS.data.splice(index,1));
    
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
