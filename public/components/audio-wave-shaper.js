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

import './audio-functions.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class audioWaveShaper extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeG">
            :host {
                margin-right: var(--app-standart-border-radius);
            }

            article {
                border-radius: var(--app-standart-border-radius);
                margin-top: 6px;
                width: 164px;
                background-color: var(--app-primary-background-color);
                padding-left: 9px;
                display: flex;
                flex-flow: column;
            }

            span,
            label[for=range] {
                color: var(--app-color)
            }

            .labelforvol {
                position: relative;
                font-weight: 600;
                left: -3px;
                color: var(--app-type-labelforvol-color);
                top: 0px;
                border-radius: var(--app-standart-border-radius);
                padding: 3px;
                font-size: var(--app-type-labelforvol-font-size);
                text-shadow: var(--app-type-labelforvol-text-shadow);
            }

            .labelforvol[rEady] {
                background-color: var(--app-type-labelforvol-Ready-background-color);
                font-size: var(--app-type-labelforvol-font-size);
            }

            .labelforvol[waiting] {
                background-color: var(--app-type-labelforvol-waiting-background-color);
                font-size: var(--app-type-labelforvol-font-size);
            }

            .open[open] {
                height: auto
            }

            audio {
                width: 128px
            }

            paper-icon-button {
                color: var(--app-color)
            }

            paper-icon-button {
                display: none
            }

            section[list-box-hiden] {
                display: none
            }

            section[list-box-hiden][boxShow] {
                display: block
            }

            paper-item[sellected] {
                background-color: chartreuse
            }

            paper-button[slot="applyButton"]{
                top: 8px;
            }

            .inputin {
                display: none
            }

            .inputin aside {
                position: relative;
                flex-basis: 84px;
                top: 9px;
            }

            aside[apllyWith] {
                position: relative;
                top: 1px;
            }

            .inputin[open] {
                height: 41px;
                display: inline-flex;
                flex-flow: row;
                color: #000000;
                font-size: 8px;
            }
        </style>
        <article>
            <label for="range">[[elemTitle]]
                <span>[[type]]</span>
                <button on-click="removeCall"> x </button>
            </label>
            <section id="title" class="open" open\$="[[!open]]">
                <label id="frovol" class="labelforvol" for="vol" waiting\$="[[waiting]]" ready\$="[[rEady]]">
                    Distortion Values
                </label>
                <paper-item>
                    <paper-item-body two-line="">
                        <paper-input class="diferent" title="overSample" label="overSample" value="{{overSample}}">
                        </paper-input>
                        <paper-input class="diferent" title="amount" label="wave amount" value="{{amount}}">
                        </paper-input>
                    </paper-item-body>
                </paper-item>
            </section>
            <section id="title" class="inputin open" open\$="[[!open]]">
                <audio-aplly-with id="aplyWith" agent-class="[[agentClass]]" title-funcion="[[titleFuncion]]">
                    <paper-button slot="applyButton" id="apllyNow" on-click="apllyNow">aplly now</paper-button>
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
      return 'audio-wave-shaper';
  }
  constructor() {
      super();
  }
  ready() {
      super.ready()
  }
  static get properties() {
      return {
          contextNode: {
              type: Object,
              //computed: 'getContextNode(elemTitle)'
          },
          elemTitle: {
              type: String,
              notify: true
          },
          titleFuncion: {
              type: String,
              notify: true,
              value: 'distortion values'
          },
          type: {
              type: String,
              value: 'distortion'
          },
          agentClass: {
              type: Object,
              notify: true
          },
          open: {
              type: Boolean,
              value: true,
              notify: true,
              reflectToAttribute: true
          },
          show: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          overSample: {
              type: Number,
              value: 2
          },
          amount: {
              type: Number,
              value: 100
          }
      }
  }

  setContextNode(elemTitle) {
      let that = this.agentClass
      this.contextNode = that.contextNode[elemTitle]
      //  console.log(this.contextNode)
  }

  removeCall() {
      if (this.agentClass.contextNode[this.elemTitle]) {
          window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
          this.agentClass.removeAgents(() => {
              this.agentClass.revoveElemTitle(() => {
                  window.dispatchEvent(new CustomEvent('apllywith', {}))
                  // delete this.agentClass.contextNode[this.elemTitle]
                  this.parentElement.removeChild(this)
              }, this.elemTitle)
          }, 'contextNode', this.elemTitle)
      } else {
          this.parentElement.removeChild(this)
          window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
      }
  }

  submit(event) {
      if (this.$.titleInput.value.length > 0) {
          this.elemTitle = this.elemTitle.split(' ').join('');
          this.agentClass.waveShaper((error) => {
              if (!error) {
                  var that = this
                  window.dispatchEvent(new CustomEvent('connect', { detail: { element: that } }))
                  this.setContextNode(this.elemTitle)
                  window.dispatchEvent(new CustomEvent('elemem-title', { detail: { title: this.elemTitle } }))
                  this.$.aplyWith.elemTitle = this.elemTitle
                  this.open = false
                  this.show = true
              } else {
                  this.$.titleInput.value = error
                  setTimeout(() => {
                      this.$.titleInput.value = ''
                  }, 1000)
              }
          }, this.elemTitle, this.overSample, this.amount)
      }
  }

  apllyNow() {
      let that = this.agentClass
      this.$.frovol.innerHTML = 'Waitng...'
      this.waiting = true
      let name = this.elemTitle + this.titleFuncion.split(' ').join('').toLocaleUpperCase()
      that.setAgentParamTo((err) => {
          if (!err) {
              if (that.appliesWith[name]) {
                  for (let i = 0; i < that.appliesWith[name].length; i++) {
                      that.appliesWith[name][i].elem.click()
                  }
              }
              setTimeout(() => {
                  this.waiting = !this.waiting
                  this.$.frovol.innerHTML = 'ready...'
                  this.waiting = false
                  this.rEady = true
              }, 500)
              setTimeout(() => {
                  this.$.frovol.innerHTML = this.titleFuncion
                  this.rEady = false
              }, 1500)
          } else {
              console.error(err)
              this.$.frovol.innerHTML = 'Something Went Wrong...'
              this.waiting = true
              setTimeout(() => {
                  this.$.frovol.innerHTML = this.titleFuncion
                  this.waiting = false
              }, 3000)
          }
      }, this.contextNode, 'overSample', 'curve', this.overSample + 'x', this.amount, false)
  }
}
window.customElements.define(audioWaveShaper.is, audioWaveShaper);
