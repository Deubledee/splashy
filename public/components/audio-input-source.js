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

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class audioInputSource extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeG">
            :host { width: 100%; margin-right: var(--app-standart-border-radius); } article { box-shadow: var( --app-type-gain-box-shadow);
            border-radius: var(--app-standart-border-radius); margin-top: 6px; width: 164px; background-color: var(--app-primary-background-color);
            padding-left: 9px; display: flex; flex-flow: column; } iron-input { flex-basis: 25px; } span, label[for=range]
            { color: var(--app-color) } .open[open]{height: auto} audio{width: 128px} paper-icon-button {color: var(--app-color)}div[inline]
            { display: flex; flex-flow: row; box-sizing: border-box; padding: 2px; } button { height: 24px; margin-top: 6px
            }label[for="range"] { width: 90px; margin-top: 7px }
        </style>

        <article>
            <div inline="">
                <label for="range" title="[[elemTitle]]">[[elemTitle]]</label>
                <paper-icon-button icon="input" title="[[type]]"></paper-icon-button>
                <button on-click="removeCall"> x </button>
            </div>
            <section id="title" class="open" open\$="[[!open]]">
                <paper-input class="diferent" title="Elapsed time" label="Elapsed" value="{{Elapsed}}">
                </paper-input>
                <audio id="audio" class="diferent" title="Elapsed Time" on-timeupdate="timeupdate" label="Elapsed Time">
                </audio>
            </section>
            <div class="open divtitle-area" open\$="[[open]]">
                <section id="title" class="open" open\$="[[open]]">
                    <paper-input class="diferent" id="titleInput" min="0" max="5" step="0.5" label="new title" title="new title" value="{{elemTitle}}">
                    </paper-input>
                    <paper-button on-click="submit" raised="">aplly title </paper-button>
                </section>
            </div>
        </article>
`;
  }

  static get is() {
      return 'audio-input-source';
  }
  constructor() {
      super();
  }
  ready() {
      super.ready()
  }
  static get properties() {
      return {
          timeView: {
              type: Boolean,
              value: true
          },
          Elapsed: {
              type: String
          },
          elapAnimation: {
              type: Number
          },
          type: {
              type: String,
              value: 'source'
          },
          promisse: {
              type: Boolean,
              value: undefined
          },
          elemTitle: {
              type: String
          },
          agentClass: {
              type: Object
          },
          gUM: {
              type: Object,
              computed: 'gUMStart(agentClass)'
          },
          constraints: {
              type: Object,
              value: function () {
                  return {
                      audio: {
                          autoGainControl: { ideal: 1 },
                          channelCount: 2,
                          echoCancelation: false,
                          noiseSuspension: false
                      }, video: false
                  }
              }
          },
          open: {
              type: Boolean,
              value: true,
              notify: true,
              reflectToAttribute: true
          },
          count: {
              type: Number,
              value: 0
          }
      }
  }

  timeupdate(event) {
      let currentSeconds = (Math.floor(this.$.audio.currentTime % 60) < 10 ? '0' : '') + Math.floor(this.$.audio.currentTime % 60);
      let currentMinutes = Math.floor(this.$.audio.currentTime / 60);
      this.Elapsed = currentMinutes + ":" + currentSeconds
  }

  toggleTimeView() {
      this.timeView = !this.timeView
  }

  gUMStart(agentClass) {
      try {
          if (navigator.mediaDevices.getUserMedia) {
              this.promisse = true
              return navigator.mediaDevices
          }
          else
              if (navigator.getUserMedia) {
                  this.promisse = false
                  return navigator
              }
              else {
                  this.noGUmWarn()
                  return {}
              }
      }

      catch (err) {
          throw 'an error acoured' + err
      }
  }

  noGUmWarn() {
      this.promisse = undefined
      alert('Browser not compatible')
  }

  submit() {
      setTimeout(() => {
          if (this.$.titleInput.value.length > 0) {
              this.agentClass.inputStreamSource((err) => {
                  if (typeof err === 'object') {
                      throw this.error('input ', err);
                  } else if (typeof err === 'string') {
                      this.$.titleInput.value = 'already exists'
                      setTimeout(() => {
                          this.$.titleInput.value = ''
                          this.elemTitle = ''
                      }, 1000)
                  }
                  if (err === false) {
                      var that = this
                      window.dispatchEvent(new CustomEvent('connect', { detail: { element: that } }))
                      this.elemTitle = this.elemTitle.split(' ').join('')
                      window.dispatchEvent(new CustomEvent('source', { detail: { name: this.elemTitle, type: this.type } }))
                      window.dispatchEvent(new CustomEvent('elemem-title', { detail: { title: this.elemTitle } }))
                      this.open = false
                      this.gumMe()
                  }
              }, this.elemTitle, 0)
          }
      }, 500)
  }

  gumMe() {
      if (this.promisse === true) {
          this.gUM.getUserMedia(this.constraints)
              .then((this.success).bind(this))
              .catch((error) => {
                  throw this.error('The following gUM error occured: ', error)
              })
      } else {
          this.gUM.getUserMedia(this.constraints, (this.success).bind(this), this.error)
      }
  }

  success(stream) {
      this.agentClass.inputStreamSource((err, stream) => {
          this.$.audio.srcObject = stream
          this.$.audio.muted = true
          this.$.audio.controls = false
          this.$.audio.play()
      }, this.elemTitle, stream)
  }

  error(msg, err) {
      console.error(msg, err);
  }

  removeCall() {
      if (this.agentClass.sourceNode[this.elemTitle]) {
          window.dispatchEvent(new CustomEvent('remove-source', { detail: { name: this.elemTitle, type: this.type } }))
          setTimeout(() => {
              this.agentClass.removeAgents(() => {
                  this.parentElement.removeChild(this)
                  window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
              }, 'sourceNode', this.elemTitle)
          }, 100)
      } else {
          this.parentElement.removeChild(this)
          window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
      }
  }
}
window.customElements.define(audioInputSource.is, audioInputSource);
