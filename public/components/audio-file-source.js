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
class audioFileSource extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeG">
            :host { width: 100%; margin-right: var(--app-standart-border-radius); } article { box-shadow: var( --app-type-gain-box-shadow);
            border-radius: var(--app-standart-border-radius); margin-top: 6px; width: 164px; background-color: var(--app-primary-background-color);
            padding-left: 9px; display: flex; flex-flow: column; min-height: 107px; } audio { width: 128px } paper-icon-button
            { color: var(--app-color) } aside[apllyWith] { border-top: 0.4px solid #b6b6b6b3 } section[list-box-hiden] {
            display: none } section[list-box-hiden][boxShow] { display: block } audio { width: 165px } #apllyNow { display:
            none } input { display: none } label { color: var(--app-color); cursor: pointer; } paper-button.diferent { box-shadow:
            var(--app-toolbar-box-shadow) } label[for="range"] { width: 90px; margin-top: 7px } div[inline] { display: flex;
            flex-flow: row; box-sizing: border-box; padding: 2px; } section[boxShow] { display: none } button { height: 24px;
            margin-top: 6px }
        </style>
        <article>
            <div inline="">
                <label for="range" title="[[elemTitle]]">[[elemTitle]] [[loading]]</label>
                <paper-icon-button icon="input" title="[[type]]"></paper-icon-button>
                <button on-click="removeCall"> x </button>
            </div>
            <section id="title" boxshow\$="[[boxShow]]">
                <paper-button id="art" class="diferent">
                    <label id="label" for="input">Insert File</label>
                </paper-button>
                <input id="input" aria-labelledby="" type="file" on-change="submit" class="diferent">
            </section>
            <section id="title" boxshow\$="[[!boxShow]]">
                <audio-player slot="applyButton" id="player" active="[[apllyWith]]" audio="{{source}}" elemtitle="[[elemTitle]]"></audio-player>
                <audio-aplly-with id="aplyWith" agent-class="[[agentClass]]" title-funcion="[[titleFuncion]]" elem-title="[[elemTitle]]">
                    <paper-button slot="applyButton" id="apllyNow" on-click="apllyNow"></paper-button>
                </audio-aplly-with>
            </section>
        </article>
`;
  }

  static get is() {
      return 'audio-file-source';
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
          file: {
              type: Object
          },
          timeView: {
              type: Boolean,
              value: true
          },
          loading: {
              type: String
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
      var fileName = event.target.value.split('\\').pop()
      let input = event.target;
      let reader = new FileReader();
      reader.onprogress = evt => {
          this.loading = 'loading...'
      }
      reader.onload = () => {
          var dataURL = reader.result;
          this.$.player.url = dataURL;
          setTimeout(() => {
              this.loading = 'loaded...'
              setTimeout(() => {
                  this.loading = ''
                  this.elemTitle = fileName
              }, 500)
          }, 1000)
      };
      reader.readAsDataURL(input.files[0]);
  }

  setSource(src) {
      setTimeout(() => {
          this.agentClass.setElementSource((err) => {
              if (typeof err === 'object') {
                  throw this.error('input ', err);
              } else if (typeof err === 'string') {
                  this.elemTitle = 'already exists'
                  setTimeout(() => {
                      this.elemTitle = ''
                  }, 1000)
              }
              if (err === false) {
                  var that = this
                  window.dispatchEvent(new CustomEvent('connect', { detail: { element: that } }))
                  window.dispatchEvent(new CustomEvent('elemem-title', { detail: { title: this.elemTitle } }))
                  window.dispatchEvent(new CustomEvent('source', { detail: { name: this.elemTitle, type: this.type } }))
                  this.boxShow = true
              }
          }, this.elemTitle, src)
      }, 2000)
  }

  error(msg, err) {
      console.error(msg, err);
  }

  removeCall() {
      if (this.agentClass.sourceNode[this.elemTitle]) {
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
      } else {
          this.parentElement.removeChild(this)
          window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
      }
  }
}
window.customElements.define(audioFileSource.is, audioFileSource);
