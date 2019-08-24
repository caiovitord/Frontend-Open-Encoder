import { Component, OnInit } from '@angular/core';
import * as Hls from 'hls.js';



@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {


  constructor() { }

  ngOnInit() {




  }


  play() {
    var video: any = document.getElementById('video');
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource('https://open-encoder-output.s3.amazonaws.com/' + localStorage.getItem('path') + '/manifest.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });

    }
  }

}
