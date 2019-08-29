import { PlayerService } from './../player.service';
import { Component, OnInit } from '@angular/core';
import * as Hls from 'hls.js';



@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  hls: any;
  hls2: any;
  videoName: any;


  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.setPlayer(this);




  }


  play(outputPath, videoName) {
    console.log(outputPath);
    this.videoName = videoName;
    var video: any = document.getElementById('video');


    if (Hls.isSupported()) {
      if (this.hls) {
        this.hls.destroy();
        this.hls2 = new Hls();
        this.hls2.loadSource('https://open-encoder-output.s3.amazonaws.com/' + outputPath + '/manifest.m3u8');
        this.hls2.attachMedia(video);
        this.hls2.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
          this.hls = null;
        });
      } else {
        if(this.hls2) this.hls2.destroy();
        this.hls = new Hls();
        this.hls.loadSource('https://open-encoder-output.s3.amazonaws.com/' + outputPath + '/manifest.m3u8');
        this.hls.attachMedia(video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
          this.hls2 = null;
        });
      }
    }
  }



}
