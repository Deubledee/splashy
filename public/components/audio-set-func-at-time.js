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
const titleObj = {
    setValueAtTime: {
        bindVolTitle: '',
        bindStartTitle: '',
    },
    linearRampToValueAtTime: {
        bindVolTitle: '',
        bindStartTitle: '',
    },
    exponentialRampToValueAtTime: {
        bindVolTitle: '',
        bindStartTitle: '',
    },
    cancelScheduledValues: {
        bindVolTitle: '',
        bindStartTitle: '',
    },
    cancelAndHoldAtTime: {
        bindVolTitle: '',
        bindStartTitle: '',
    }
}
class audioSetFuncAtTime extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeF">
            :host { width: 100%; margin-right: 0px; } aside[id=start][notHere]{ display: none } section[list-box-hiden]{ display: none
            } section[list-box-hiden][boxShow]{ display: block } paper-item[sellected] { background-color: chartreuse } span{color:
            var(--app-color) }
        </style>
        <article>
            <nav class="independent">
                <div>
                    <label id="frovol" class="labelforvol" for="vol" waiting\$="[[waiting]]" ready\$="[[rEady]]">
                        [[titleFuncion]]
                    </label>
                </div>
                <div class="showValueswraper" on-click="showValues" show\$="[[show]]">
                    <paper-icon-button noink="" icon="unfold-less" title="close" class="none showValues" show\$="[[show]]"></paper-icon-button>
                    <paper-icon-button noink="" icon="unfold-more" title="open" class="none showValues" show\$="[[!show]]"></paper-icon-button>
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
                <template is="dom-repeat" items="{{titles}}" as="title" mutable-data="true">
                    <aside id="vol">
                        <paper-input class="diferent" title="[[title.bindVolTitle]]" label="value" size="3" min="-3.4" max="3.4" step="0.05" value="{{bindVol}}">
                        </paper-input>
                    </aside>
                    <aside id="start" nothere\$="[[notHere]]">
                        <paper-input class="diferent" title="[[title.bindStartTitle]]" label="startAt" size="3" min="-3.4" max="3.4" step="0.05" value="{{bindStart}}">
                        </paper-input>
                    </aside>
                </template>
            </section>
            <section class="inputin" show\$="[[show]]">
                <audio-aplly-with id="aplyWith" agent-class="[[agentClass]]" title-funcion="[[titleFuncion]]" elem-title="[[elemTitle]]">
                    <paper-button slot="applyButton" id="apllyNow" on-click="apllyNow">aplly now</paper-button>
                </audio-aplly-with>
            </section>
        </article>
`;
  }

  static get is() {
      return 'audio-set-func-at-time';
  }

  constructor() {
      super();
  }

  static get properties() {
      return {
          agentClass: {
              type: Object
          },
          contextNode: {
              type: Object
          },
          elemTitle: {
              type: String,
              notify: true
          },
          type: {
              type: String
          },
          notHere: {
              type: Boolean,
              value: false,
              notify: true,
          },
          titleFuncion: {
              type: String,
          },
          typeFuncion: {
              type: String,
              observer: 'calcTitles'
          },
          titles: {
              type: Array,
              value: []
          },
          max: {
              type: String,
          },
          min: {
              type: String,
          },
          titleObj: {
              type: Object,
              value: function () {
                  return titleObj
              }
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
          bindVol: {
              type: Number,
              value: 0.0,
          },
          bindStart: {
              type: Number,
              value: 0.0,
          },
          aplyIn: {
              type: String,
              value: '0'
          },
          show: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          setTimeout: Number
      }
  }

  ready() {
      super.ready()
      if (this.titleFuncion.indexOf('ancel') > 0) {
          this.notHere = true
      }
      this.max = '' + this.contextNode[this.type].maxValue
      this.min = '' + this.contextNode[this.type].minValue
      this.max = this.max.slice(0, 4) 
      this.min = this.min.slice(0, 4) + ' >='
  }

  escape(value) {
      let bol = true
      if (this.typeFuncion === 'exponentialRampToValueAtTime' && this.isFloat(value) !== true) {
          this.$.frovol.style.fontSize = '9px'
          this.$.frovol.innerHTML = 'decimal value > 0.0 '
          this.waiting = false
          this.rEady = true
          bol = false
          setTimeout(() => {
              this.$.frovol.innerHTML = this.titleFuncion
              this.$.frovol.style = 'initial'
              this.rEady = false
          }, 2000)
      }
      return bol
  }

  isFloat(n) {
      return Number(parseFloat(n)) === n && n % 1 !== 0;
  }

  removeCall() {
      this.agentClass.revoveFunction(() => {
          window.dispatchEvent(new CustomEvent('apllywith', { detail: { title: this.elemTitle } }))
          this.parentElement.removeChild(this)
      }, this.elemTitle, this.titleFuncion)
  }

  showValues() {
      this.show = !this.show
  }

  calcTitles(functionType) {
      let arr = []
      arr.push(this.titleObj[functionType])
      this.titles = arr
  }

  apllyNow() {
      let that = this.agentClass
      this.$.frovol.innerHTML = 'Waitng...'
      this.waiting = true
      let name = this.elemTitle + this.titleFuncion.split(' ').join('').toLocaleUpperCase()
      if (this.escape(parseFloat(this.bindVol)) === true) {
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
          }, this.contextNode, this.type, this.typeFuncion, parseFloat(this.bindVol), parseFloat(this.bindStart), null, true)
      }
  }
}

window.customElements.define(audioSetFuncAtTime.is, audioSetFuncAtTime);
