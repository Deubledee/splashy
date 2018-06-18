/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './audio-svg-progress.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
var percentageOfVolumeSlider
class audioPlayer extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                width: 100%;
            }

            nav {
                display: flex;
                flex-flow: column;
                box-sizing: border-box;
                padding: 8px
            }

            div {
                width: 90%;
                flex-basis: 40px;
                cursor: pointer;
            }

            paper-input.diferent {
                --paper-input-container-label: {
                    color: var(--app-color);
                }
                ;
                --paper-input-container-input: {
                    color: var(--app-color);
                }
            }

            paper-icon-button {
                color: #ffffff;
                display: block;
                transition: all 0.5 ease-in-out
            }

            paper-icon-button[pause] {
                display: none;
            }

            paper-icon-button[active] {
                color: rgb(58, 210, 236)
            }

            paper-icon-button[loop] {
                color: #75e011;
            }

            paper-icon-button[looping] {
                color: rgb(58, 210, 236)
            }

            audio-svg-progress{
                position: relative;
                left: 9px;
            }
        </style>
        <nav>
            <paper-item>
                <paper-item-body two-line="">
                    <paper-input class="diferent" title="Elapsed time" label="Elapsed" value="[[Elapsed]] [[duration]]">
                    </paper-input>
                      
                </paper-item-body>
            </paper-item>
            <audio-svg-progress id="progress" percentage="{{currentTime}}"></audio-svg-progress>
            <paper-item>
                <paper-item-body two-line="">
                </paper-item-body>
                <paper-icon-button on-click="play" active\$="[[active]]" pause\$="[[pause]]" icon="av:play-arrow" title="play">
                </paper-icon-button>
                <paper-icon-button on-click="Pause" active\$="[[active]]" pause\$="[[!pause]]" icon="av:pause" title="pause">
                </paper-icon-button>
                <paper-icon-button on-click="stopSong" icon="av:stop" title="stop">
                </paper-icon-button>
                <paper-icon-button id="loop" on-click="Loop" loop\$="[[loop]]" looping\$="[[looping]]" icon="av:loop" title="loop">
                </paper-icon-button>
            </paper-item>
        </nav>
`;
  }

  static get is() {
      return 'audio-player';
  }
  constructor() {
      super();
  }
  ready() {
      super.ready()
      window.addEventListener('connected', (event) => {
          if (this.elemTitle === event.detail.connected) {
              this.connected = event.detail.state
              console.log(this.connected)
              if (this.record === true && this.connected === false) {
                  this.cancelRecording()
              }
          }
      }, false)
  }
  static get properties() {
      return {
          url: {
              type: Object,
              observer: 'setElement'
          },
          active: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          pause: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          loop: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          looping: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          elemTitle: {
              type: String
          },
          audio: {
              type: Object,
              notify: true
          },
          Elapsed: {
              type: String
          },
          duration: {
              type: String,
              notify: true
          },
          currentTime: {
              type: Number,
              observer: 'jumpTo'
          }
      }
  }

  setElement(url) {
      this.audio = new Audio(url)
     // console.log('loaded')
      this.audio.controls = false
      this.audio.controlsList = 'nodownload'
      this.audio.crossOrigin = 'anonymous'
  }

  changeThis() {
      this.change = !this.change
  }

  click() {
      if (this.active === false) {
          this.play()
      } else {
          this.stopSong()
      }
  }

  play() {
      this.audio.play();
      this.pause = true;
      this.active = true;
      this.audio.ontimeupdate = event => {                   
          this.updateTime(event)
          let figure = parseInt(this.audio.currentTime / this.duration * 100)
          let figure1 = (this.audio.currentTime / this.duration * 100)  //11 = radius //parseInt(parseInt(this.Elapsed.split(':').join(''))                   
          if (this.audio.loop === true) {
              this.loop = false
              this.looping = true
              this.$.progress.progressToX(figure, this.duration)
              let degs = figure1 / 100 * 360
              this.$.loop.style.transform = `rotate(-${degs}deg)`
          } else {
              this.$.progress.progressToX(figure1, this.duration)
          }
      }
      this.audio.onended = event => {
          this.stopSong()
      }
  }

  Pause() {
      this.audio.pause();
      this.pause = false;
      this.active = false;
      if (this.audio.loop === true) {
          setTimeout(() => {
              this.loop = true
              this.looping = false
              console.log('loop ', this.looping, this.loop)
          }, 100)
      }
  }

  stopSong() {
      this.audio.currentTime = 0;
      this.Pause()
  }

  Loop() {
      if (this.audio.loop === true) {
          setTimeout(() => {
              this.loop = false
              this.looping = false
              console.log('loop ', this.looping, this.loop)
          }, 100)
      } else {
          this.loop = !this.loop;
      }
      this.audio.loop = !this.audio.loop;
  }

  jumpTo(percentage) {
      if (percentage) {
          this.audio.currentTime = percentage / 100 * this.audio.duration
      }
  }

  updateTime(event) {
      let currentSeconds = (Math.floor(this.audio.currentTime % 60) < 10 ? '0' : '') + Math.floor(this.audio.currentTime % 60);
      let currentMinutes = Math.floor(this.audio.currentTime / 60);
      this.Elapsed = currentMinutes + ":" + currentSeconds
      this.duration = Math.floor(this.audio.duration / 60) + (Math.floor(this.audio.duration % 60) < 10 ? '0' : '') + '' + Math.floor(this.audio.duration % 60);
  }
}
window.customElements.define(audioPlayer.is, audioPlayer);
