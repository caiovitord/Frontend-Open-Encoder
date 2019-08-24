import { Component, OnInit } from '@angular/core';

import { Player } from 'bitmovin-player/modules/bitmovinplayer-core';
import EngineBitmovinModule from 'bitmovin-player/modules/bitmovinplayer-engine-bitmovin';
import MseRendererModule from 'bitmovin-player/modules/bitmovinplayer-mserenderer';
import HlsModule from 'bitmovin-player/modules/bitmovinplayer-hls';
import AbrModule from 'bitmovin-player/modules/bitmovinplayer-abr';
import ContainerTSModule from 'bitmovin-player/modules/bitmovinplayer-container-ts';
import SubtitlesModule from 'bitmovin-player/modules/bitmovinplayer-subtitles';
import PolyfillModule from 'bitmovin-player/modules/bitmovinplayer-polyfill';
import StyleModule from 'bitmovin-player/modules/bitmovinplayer-style';
import DashModule from 'bitmovin-player/modules/bitmovinplayer-dash';
import XmlModule from 'bitmovin-player/modules/bitmovinplayer-xml';

import { UIFactory } from 'bitmovin-player/bitmovinplayer-ui';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  player: any;

  constructor() { }

  ngOnInit() {

    Player.addModule(EngineBitmovinModule);
    Player.addModule(MseRendererModule);
    Player.addModule(HlsModule);
    Player.addModule(AbrModule);
    Player.addModule(ContainerTSModule);
    Player.addModule(SubtitlesModule);
    Player.addModule(PolyfillModule);
    Player.addModule(StyleModule);
    Player.addModule(DashModule);
    Player.addModule(XmlModule);

    const config = {
      key: '91e8346c-a81c-4f09-b5cc-3b246f80e87d',
      ui: false,
    };

    const container = document.getElementById('my-player');
    this.player = new Player(container, config);

  }


  play() {

    const source = {
      dash: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
      hls: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      progressive:
        'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4',
      poster: 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/poster.jpg'
    };

    this.player.load(source).then(
      () => console.log('Successfully created Bitmovin Player instance'),
      reason => console.log('Error while creating Bitmovin Player instance')
    );
  }

}
