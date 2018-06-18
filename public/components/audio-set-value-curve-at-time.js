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
class audioSetValueCurveAtTime extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeF">
            :host { width: 100%; margin-right: 0px; } .nav { font-size: 10px; } .labelforvol { top: -17px; } div span, input { position:
            relative; top: -1px; left: 3px; font-size: 10px; text-shadow: 0px 0px 0px transparent; } div[close-button] {
            top: 25px; } .show[show] { display: none } .show { flex-flow: column; padding-top: 0px; } .inputin { display:
            flex; flex-flow: row; padding-right: 2px; padding-left: 4px; margin-bottom: 21px; } .inputin[show] { display:
            none } .inputin aside { top: -7px; right: 0%; margin-right: 0px; } .show aside { display: flex; flex-flow: column;
            } .showasidevol2 { display: block !important; } .inputin button { color: var(--app-input-color); background-color:
            #2f2828; border-color: cadetblue; width: 50px; height: 18px; font-size: 8px; font-weight: bold; padding-left:
            1px; } .inputin nav { margin-top: 7px; margin-bottom: 4px; } .input button { color: var(--app-input-color); background-color:
            #5a6565; border-color: #fafafa; border-radius: 5px; width: 50px; height: 18px; font-size: 8px; font-weight: bold;
            padding-left: 1px; text-shadow: var(--app-type-gain-text-shadow); } .input aside { right: 0% !important; } aside
            input { color: #ede4e4; background-color: #5a6565; margin-top: 2px; border: 0; border-bottom: 1px solid; padding-left:
            4px; box-shadow: 0px 0px 0px; } aside button { width: 147px; background-color: #5a6565; border: 0px; border-radius:
            5px; box-shadow: 1px 2px 2px grey; } .showValues { color: #a9a1a1; } .showValues[show] { height: 2px; top: -4px;
            } .input { height: 15px; visibility: visible; font-size: 9px; } .input[show] { visibility: collapse; } .input[input]
            { visibility: collapse; } .showValueswraper { color: #a9a1a1; top: -14px; } .wavesNavDisplay { display: flex;
            flex-flow: column; margin-bottom: 2px; font-size: 11px; } .wavesNavDisplay span { margin-left: 3px; font-size:
            10px; } .top { position: relative; top: 38px; }span{color:
            var(--app-color) }

        </style>
        <app-location route="{{route}}"></app-location>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"></app-route>
        <article>
            <nav class="nav independent">
                <div>
                    <label class="labelforvol" id="frovol" for="vol" waiting\$="[[waiting]]" ready\$="[[rEady]]">
                        [[titleFuncion]]
                    </label>
                </div>
                <div class="showValueswraper" on-click="showValues" show\$="[[show]]">
                    <paper-icon-button noink="" icon="unfold-less" title="find" class="none showValues" show\$="[[show]]"></paper-icon-button>
                    <paper-icon-button noink="" icon="unfold-more" title="find" class="none showValues" show\$="[[!show]]"></paper-icon-button>
                </div>

                <div close-button="" class="buttShow" show\$="[[show]]" on-click="removeCall">
                    <paper-icon-button noink="" icon="close" title="remove"></paper-icon-button>
                </div>
            </nav>
            <div>                
                <span>  [[min]]  </span>
                <span> [[max]] </span>
            </div>
            <section class="show" show\$="[[show]]">
                <aside id="vol">
                    <nav class="wavesNavDisplay">
                        <paper-input class="diferent" max="25" step="1" placeholder="max 25" label="waves min 2" title="number of waves" value="{{bindWave}}">
                        </paper-input>
                        <paper-button on-click="setArray">aplly</paper-button>
                    </nav>
                </aside>
                <aside class="input top" input\$="[[input]]">
                    <span>values min 0 max 3.4</span>
                </aside>
                <aside id="vol2" class="showasidevol2">
                    <template is="dom-repeat" items="[[inputsArray]]" as="wave" mutable-data="true">
                        <iron-input class="diferent" bind-value="{{wave}}" id="input2">
                            <input class="diferent smallInput" min="0" value="[[value::input]]" on-input="inputToArray" on-keyup="inputToArray">
                        </iron-input>
                    </template>
                </aside>
            </section>
            <section class="inputin" show\$="[[show]]">
                <aside id="timeConst">
                    <paper-input class="diferent" min="0" max="5" step="0.05" label="startAt" title="time to start at" value="{{bindStart}}">
                    </paper-input>
                </aside>
                <aside id="duration">
                    <paper-input class="diferent" min="0" max="5" step="0.5" label="duration" title="duration of waves" value="{{bindConst}}">
                    </paper-input>
                </aside>
            </section>
            <section class="inputin input" show\$="[[show]]">
                <audio-aplly-with id="aplyWith" agent-class="[[agentClass]]" title-funcion="[[titleFuncion]]" elem-title="[[elemTitle]]">
                    <paper-button slot="applyButton" id="apllyNow" on-click="apllyNow">aplly now</paper-button>
                </audio-aplly-with>
            </section>
        </article>
`;
  }

  static get is() {
      return 'audio-set-value-curve-at-time';
  }
  constructor() {
      super();
  }
  ready() {
      super.ready()
      this.max = '' + this.contextNode[this.type].maxValue
      this.min = '' + this.contextNode[this.type].minValue
      this.max = this.max.slice(0, 4) 
      this.min = this.min.slice(0, 4) + ' >='
  }
  static get properties() {
      return {
          notHere: {
              type: Boolean,
              value: false,
              notify: true,
          },
          elemTitle: {
              type: String,
              notify: true
          },
          titleFuncion: {
              type: String,
              notify: true
          },
          typeFuncion: {
              type: String
          },
          titles: {
              type: Array,
              value: []
          },
          titleObj: {
              type: Object,
              value: function () {
                  return titleObj
              }
          },
          max: {
              type: String,
          },
          min: {
              type: String,
          },
          rEady: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          waiting: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          bindWave: {
              type: Number,
              value: 2
          },
          bindConst: {
              type: Number,
              value: 0.1
          },
          bindStart: {
              type: Number,
              value: 0
          },
          agentClass: {
              type: Object
          },
          contextNode: {
              type: Object
          },
          type: {
              type: String,
              notify: true
          },
          inputsArray: {
              type: Array,
              notify: true,
          },
          waveArray: {
              type: Array,
              notify: true,
              value: [0]
          },
          show: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          input: {
              type: Boolean,
              value: true,
              notify: true,
              reflectToAttribute: true
          },
          setTimeout: Number
      }
  }

  _log(data) {
      console.log('app log', data)
  }

  removeCall() {
      this.agentClass.revoveFunction(() => {
          window.dispatchEvent(new CustomEvent('apllywith', { detail: { title: this.elemTitle } }))
          this.parentElement.removeChild(this)
      }, this.elemTitle, this.titleFuncion)
  }

  inputToArray(event) {
      if (this.setTimeout) {
          console.log('killed')
          clearTimeout(this.setTimeout)
      }
      this.setTimeout = setTimeout(() => {
          this.waveArray[event.model.__data.index] = parseFloat(event.model.children[1].value) === NaN ? 0 : parseFloat(event.model.children[1].value)
          console.log('waveArray', this.waveArray)
      }, 500)
  }


  apllyNow() {
      let that = this.agentClass
      this.$.frovol.innerHTML = 'Waitng...'
      this.waiting = true
      if (this.waveArray.length >= 2 && this.bindStart && parseFloat(this.bindConst)) {
          this.setParam(that)
      } else {
          this.checkValues(this.waveArray, this.bindStart, parseFloat(this.bindConst))
      }
  }

  Error(err) {
      console.log(err)
  }

  checkValues(waveArray, bindStart, bindConst) {
      let that = this.agentClass
      try {
          let arr = waveArray.join(' ')
          if (waveArray.length < 2) {
              throw 'input waves...'
          }
      }
      catch (err) {
          this.sendError('input waves...', err)
      }
      try {
          let num = Math.floor(bindStart)
          if (~bindStart >= 0) {
              throw 'worng star value...'
          }
      }
      catch (err) {
          this.sendError('worng star value...', err)
      }
      try {
          let num = parseFloat(bindConst)
          if (bindConst <= 0) {
              throw 'worng duration value...'
          }
      }
      catch (err) {
          this.sendError('worng duration value...', err)
      }
  }

  setParam(that) {
      this.$.frovol.innerHTML = 'Waitng...'
      this.waiting = true
      let name = this.elemTitle + this.titleFuncion.split(' ').join('').toLocaleUpperCase()
      that.setAgentParamTo((err, context) => {
          if (err === null) {
              if (that.appliesWith[name]) {
                  for (let i = 0; i < that.appliesWith[name].length; i++) {
                      that.appliesWith[name][i].elem.click()
                  }
              }
              if (this.type === 'threshold' || this.type === 'knee' || this.type === 'ratio' ||
                      this.type === 'attack' || this.type === 'release') {
                      window.dispatchEvent(new CustomEvent('compressor-changed', {}))
                      console.log(this.type)
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
                  console.log(this.contextNode[this.type].maxValue, this.contextNode[this.type].minValue)
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
      }, this.contextNode, this.type, 'setValueCurveAtTime', this.waveArray, parseFloat(this.bindStart), parseFloat(this.bindConst), true)
  }

  sendError(msg, err) {
      console.error(err)
      this.$.frovol.innerHTML = msg
      this.waiting = true
      setTimeout(() => {
          this.$.frovol.innerHTML = 'Curve Wave'
          this.waiting = false
      }, 3000)
  }

  showValues() {
      this.show = !this.show
  }

  setArray() {
      let newArray = [0]
      let num = ' '
      this.inputsArray = this.waveArray = [0]
      this.input = false
      for (let i = 0; i < this.bindWave; i++) {
          newArray[i] = num
      }
      this.inputsArray = newArray
      for (let i = 0; i < this.bindWave; i++) {
          this.waveArray[i] = parseInt(0)
      }
  }
}
window.customElements.define(audioSetValueCurveAtTime.is, audioSetValueCurveAtTime);
