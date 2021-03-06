import { VideoPlayerComponent } from './video-player/video-player.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  videoPlayerComponent: VideoPlayerComponent;

 


  constructor() { }


  playByKey(outputPath: any, videoName) {
    this.videoPlayerComponent.play(outputPath, videoName);
  }

  setPlayer(arg: VideoPlayerComponent) {
    this.videoPlayerComponent = arg;
  }
}
