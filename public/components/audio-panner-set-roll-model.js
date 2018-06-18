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
class audioPannerSetRollModel extends PolymerElement {
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
            
            div[buttons] {
                position: relative;
                left: 137px;
                padding: 7px;
                display: flex;
                flex-flow: row;
                width: 63px;
            }

            div[block] {
                width: 177px;
                padding: 2px;
                box-shadow: 0px 1px 0px #939292;
            }

            div[block2] {
                box-sizing: border-box;
                margin-right: 1px;
                width: 175px;
                box-shadow: 1px 1px 1px #939292;
                border-radius: var(--app-standart-border-radius);
                padding: 7px;
            }

            div[outer] {
                font-size: 9px
            }

            .shutiit {
                display: none;
            }

            .shutiit[nothere] {
                display: block;
            }

            paper-dropdown-menu.custom {
                background-color: initial;
            }
        </style>
        <article>
            <nav class="independent">
                <div>
                    <label id="frovol" class="labelforvol" for="vol" waiting\$="[[waiting]]" ready\$="[[rEady]]">
                        [[titleFuncion]]
                    </label>
                </div>
                <div buttons="">
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
                <div block2="" class="shutiit" nothere\$="[[nothere]]">
                    <aside id="vol">
                        <paper-input class="diferent" title="" label="[[typeX]]" size="3" min="-3.4" max="3.4" step="0.05" value="{{valX}}">
                        </paper-input>
                    </aside>
                    <div outer="">
                        <template is="dom-if" if="{{titleSet}}">
                            <audio-aplly-with id="aplyWith" agent-class="[[agentClass]]" title-funcion="[[joinTitle(titleFuncion, typeX)]]" elem-title="[[elemTitle]]">
                                <paper-button slot="applyButton" id="apllyNow" on-click="bindX">aplly now</paper-button>
                            </audio-aplly-with>
                        </template>
                    </div>
                </div>
                <div block2="" class="shutiit" nothere\$="[[!nothere]]">
                    <aside outer="">
                        <paper-dropdown-menu class="custom custom2" label="[[typeX]]">
                            <paper-listbox slot="dropdown-content" class="dropdown-content" selected="0">
                                <template is="dom-repeat" items="{{distModels}}" as="option" mutable-data="true">
                                    <paper-item on-click="bindXOption" id="[[option]]" value="[[option]]">
                                        [[option]]
                                    </paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </aside>
                </div>
            </section>
        </article>
`;
  }

  static get is() {
      return 'audio-panner-set-roll-model';
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
          valX: {
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
          nothere: {
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
          setTimeout: Number,
          bindVal: Number,
          titleSet: {
              type: Boolean,
              value: false
          },
          distModels: {
              type: Array,
              value: function () {
                  return ['Models', 'equalpower', 'HRTF']
              },
              notify: true
          },
      }
  }

  ready() {
      super.ready()
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
      if (strMap === 'rolloff') {
          this.typeX = 'rolloffFactor'
          this.nothere = true
          this.titleSet = true
      } else {
          this.typeX = 'panningModel' 
      }
  }

  joinTitle(arg1, arg2) {
      let str = arg1.split(' ').join('') + arg2
      return str
  }

  bindXOption(item) {
      this.bindVal = item.model.__data.option
      this.type = this.typeX
      this.apllyNow()
  }

  bindX() {
      this.bindVal = this.valX
      this.type = this.typeX
      this.apllyNow()
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
      }, this.contextNode, this.type, null, this.bindVal, null, null, false)
  }
}

window.customElements.define(audioPannerSetRollModel.is, audioPannerSetRollModel);
