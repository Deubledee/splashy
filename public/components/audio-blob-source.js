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
class audioBlobSource extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeG">
            :host { width: 100%; margin-right: var(--app-standart-border-radius); } article { box-shadow: var( --app-type-gain-box-shadow);
            border-radius: var(--app-standart-border-radius); margin-top: 6px; width: 164px; background-color: var(--app-primary-background-color);
            padding-left: 9px; display: flex; flex-flow: column; } iron-input { flex-basis: 25px; } span, label[for=range]
            { color: var(--app-color) } .open[open] { height: auto } audio { width: 128px } paper-icon-button { color: var(--app-color)
            } paper-item[sellected] { background-color: chartreuse } aside[apllyWith] { border-top: 0.4px solid #b6b6b6b3
            } section[list-box-hiden] { display: none } section[list-box-hiden][boxShow] { display: block } audio { width:
            165px } #apllyNow { display: none } div[inline] { display: flex; flex-flow: row; box-sizing: border-box; padding:
            2px; } button { height: 24px; margin-top: 6px }label[for="range"] { width: 90px; margin-top: 7px }
        </style>

        <article>
            <div inline="">
                <label for="range" title="[[elemTitle]]">[[elemTitle]]</label>
                <paper-icon-button icon="input" title="[[type]]"></paper-icon-button>
                <button on-click="removeCall"> x </button>
            </div>
            <section id="title" class="open" open\$="[[!open]]">
                <section id="art">
                </section>
                <audio-player slot="applyButton" id="player" active="[[apllyWith]]" audio="{{source}}" elemtitle="[[elemTitle]]"></audio-player>
                <audio-aplly-with id="aplyWith" agent-class="[[agentClass]]" title-funcion="[[titleFuncion]]" elem-title="[[elemTitle]]">
                    <paper-button slot="applyButton" id="apllyNow" on-click="apllyNow"></paper-button>
                </audio-aplly-with>
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
      return 'audio-blob-source';
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
          agentClass: {
              type: Object
          },
          emTitle: {
              type: String
          },
          titleFuncion: {
              type: String,
              notify: true,
              value: 'Source'
          },
          timeView: {
              type: Boolean,
              value: true
          },
          Elapsed: {
              type: String,
              value: '00:00'
          },
          state: {
              type: String,
              value: 'inactive...'
          },
          start: {
              type: Object,
              observer: 'submit'
          },
          disable: {
              type: Boolean,
              value: true,
              notify: true,
              reflectToAttribute: true
          },
          boxShow: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          source: {
              type: Object,
              observer: 'setSource'
          },
          type: {
              type: String,
              value: 'source'
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

  apllyNow() {
      this.$.player.click()
      let that = this.agentClass
      if (that.appliesWith[this.$.player.name]) {
          for (let i = 0; i < that.appliesWith[this.$.player.name].length; i++) {
              that.appliesWith[this.$.player.name][i].elem.click()
          }
      }
  }

  timeupdate(event) {
      let timeupdate = this.timeView === true ? ('' + event.timeStamp).split('.')[0] :
          event.path[0].currentTime
      this.$.audio.controls = false
      this.Elapsed = timeupdate.toString()
  }

  toggleTimeView() {
      this.timeView = !this.timeView
  }

  submit(event) {
      var url, audio
      if (event.title) {
          this.$.titleInput.value = event.title.split(' ').join('')
          url = URL.createObjectURL(event.blob)
          this.$.player.url = url
      }
  }

  setSource(src) {
      this.agentClass.setElementSource((err) => {
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
              this.elemTitle = this.$.titleInput.value
              var that = this
              window.dispatchEvent(new CustomEvent('connect', { detail: { element: that } }))
              window.dispatchEvent(new CustomEvent('elemem-title', { detail: { title: this.elemTitle } }))
              window.dispatchEvent(new CustomEvent('source', { detail: { name: this.elemTitle, type: this.type } }))
              this.open = false
          }
      }, this.$.titleInput.value, src)
  }

  error(msg, err) {
      console.error(msg, err);
  }

  removeCall() {
      window.dispatchEvent(new CustomEvent('remove-source', { detail: { name: this.elemTitle, type: this.type } }))
      setTimeout(() => {
          this.agentClass.removeAgents(() => {
              this.agentClass.revoveElemTitle(() => {
                  window.dispatchEvent(new CustomEvent('apllywith', { detail: { title: this.elemTitle } }))
                  window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
                  this.$.player.stopSong()
                  this.parentElement.removeChild(this)
              }, this.elemTitle)
          }, 'sourceNode', this.elemTitle)
      }, 100)
  }
}
window.customElements.define(audioBlobSource.is, audioBlobSource);
