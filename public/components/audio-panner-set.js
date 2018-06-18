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
class audioPannerSet extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeF">
            :host {
                width: 100%;
                margin-right: 0px;
            }

            section {
                display: none
            }

            section[show] {
                display: flex;
                flex-flow: row
            }

            paper-item[sellected] {
                background-color: chartreuse
            }

            paper-icon-button.diferent {
                color: var(--app-color)
            }

            div[close-button] {
                right: 1%;
                top: -12px;
            }

            .showValueswraper {
                right: 38%
            }

            .labelforvol {
                color: var(--app-progress-color)
            }

            div[buttons][show] {
                left: 92%;
            }

            div[buttons] {
                position: relative;
                left: 138px;
                padding: 7px;
                display: flex;
                flex-flow: row;
                width: 63px;
            }

            div[block] {
                box-sizing: border-box;
                width: 177px;
                padding: 2px;     
                box-shadow: 0px 1px 0px #939292;      
                padding: 7px;  
            }
            div[block2] {
                box-sizing: border-box;
                margin-right: 2px;
                width: 175px;
                box-shadow: 1px 1px 1px #939292;
                border-radius: var(--app-standart-border-radius);
                padding: 7px;                
            }
            div[outer] {
                font-size: 9px
            }
        </style>
        <article>
            <nav class="independent">
                <div>
                    <label id="frovol" class="labelforvol" for="vol" waiting\$="[[waiting]]" ready\$="[[rEady]]">
                        [[titleFuncion]]
                    </label>
                </div>
                <div buttons="" show\$="[[show]]">
                    <div class="showValueswraper" on-click="showValues" show\$="[[show]]">
                        <paper-icon-button noink="" icon="unfold-less" title="close" class="none showValues" show\$="[[show]]"></paper-icon-button>
                        <paper-icon-button noink="" icon="unfold-more" title="open" class="none showValues" show\$="[[!show]]"></paper-icon-button>
                    </div>

                    <div close-button="" class="buttShow" show\$="[[show]]" on-click="removeCall">
                        <paper-icon-button noink="" icon="close" title="remove"></paper-icon-button>
                    </div>
                </div>
            </nav>
            <section show\$="[[show]]">
                <div block="">
                    <aside id="vol">
                        <paper-input class="diferent" title="" label="[[typeX]]" size="3" min="-3.4" max="3.4" step="0.05" value="{{valX}}">
                        </paper-input>
                    </aside>
                </div>
                <div block="">
                    <aside id="vol">
                        <paper-input class="diferent" title="" label="[[typeY]]" size="3" min="-3.4" max="3.4" step="0.05" value="{{valY}}">
                        </paper-input>
                </aside></div>
                <div block2="">
                    <aside id="vol">
                        <paper-input class="diferent" title="" label="[[typeZ]]" size="3" min="-3.4" max="3.4" step="0.05" value="{{valZ}}">
                        </paper-input>
                    </aside>
                    <div outer="">
                        <audio-aplly-with id="aplyWith" agent-class="[[agentClass]]" title-funcion="[[titleFuncion]]" elem-title="[[elemTitle]]">
                            <paper-button slot="applyButton" id="apllyNow" on-click="apllyNow">aplly now</paper-button>
                        </audio-aplly-with>

                    </div>
                </div>
            </section>
        </article>
`;
  }

  static get is() {
      return 'audio-panner-set';
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
              type: String,
          },
          typeX: {
              type: String,
          },
          typeY: {
              type: String,
          },
          typeZ: {
              type: String,
          },
          valX: {
              type: Number,
              value: 0
          },
          valY: {
              type: Number,
              value: 0
          },
          valZ: {
              type: Number,
              value: 0
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
          show: {
              type: Boolean,
              value: true,
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
  }

  calcFunc(titleFuncion, type) {
      let name = titleFuncion.split(' ').join('') + type
      console.log(titleFuncion, type, name)
      return name
  }

  removeCall() {
      this.agentClass.revoveElemTitle(() => {
          window.dispatchEvent(new CustomEvent('apllywith', { detail: { title: this.elemTitle } }))
          this.parentElement.removeChild(this)
      }, this.elemTitle)
  }

  showValues() {
      this.show = !this.show
  }

  calcTitles(functionType) {
      let strMap = functionType.toLocaleLowerCase()
      if (strMap === 'position' || strMap === 'orientation') {
          this.typeX = strMap + 'X'
          this.typeY = strMap + 'Y'
          this.typeZ = strMap + 'Z'
          this.type = 'set' + functionType
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
      }, this.contextNode, this.type, null, this.valX, this.valY, this.valZ, false)
  }
}

window.customElements.define(audioPannerSet.is, audioPannerSet);
