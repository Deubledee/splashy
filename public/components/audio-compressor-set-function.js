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
class audioCompressorSetFunction extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeF">
            :host { width: 100%; margin-right: 0px; } article{width: 183px;} section { display: none } section[show] { display: flex;
            flex-flow: row } paper-item[sellected] { background-color: chartreuse } paper-icon-button.diferent { color: var(--app-color)
            } div[close-button] { right: 1%; top: -12px; } .showValueswraper { right: 38% } .labelforvol { color: var(--app-progress-color)
            } div[buttons] { left: 135px; } div[buttons] { position: relative; left: 138px; padding: 7px; display: flex;
            flex-flow: row; width: 63px; } section[block2] { box-sizing: border-box; margin-right: 1px; /* width: 175px;*/
            box-shadow: 1px 1px 1px #939292; border-radius: var(--app-standart-border-radius); padding: 7px; }
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
            <section block2="" show\$="[[show]]">
                <audio-functions id="functions" context-node="[[contextNode]]" agent-class="[[agentClass]]" elem-title="[[elemTitle]]" type="[[typeX]]">
                    <div slot="functionArea">

                    </div>
                </audio-functions>
            </section>
        </article>
`;
  }

  static get is() {
      return 'audio-compressor-set-function';
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
      this.typeX = functionType
  }
}

window.customElements.define(audioCompressorSetFunction.is, audioCompressorSetFunction);
