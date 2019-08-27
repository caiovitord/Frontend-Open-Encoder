import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Hls from 'hls.js';

@Component({
  selector: 'app-unique-link-player',
  templateUrl: './unique-link-player.component.html',
  styleUrls: ['./unique-link-player.component.scss']
})
export class UniqueLinkPlayerComponent implements OnInit {
  
  id: string;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.play(this.id);
  }

  hls: any;
  hls2: any;
  videoName: any;




  play(outputPath) {
    console.log(outputPath);
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

  getLink(){
    return 'https://open-encoder-output.s3.amazonaws.com/' + this.id + '/manifest.m3u8';
  }
}
