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

import './audio-compressor-function.js';
import './audio-compressor-set-function.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class audioCompressor extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeG">
            :host { margin-right: 4px; box-sizing: border-box; } article { min-height: 135px; min-width: 188px; width: auto; box-sizing:
            border-box; } div[slot="functionArea"][short] { flex-flow: column } div[slot="functionArea"] { display: flex;
            flex-flow: row; } div[buttons] { display: flex; flex-flow: row; color: var(--app-color) } .showValues { display:
            none; position: relative; top: -2px; left: -0.5px; } .showValues[short] { display: block; } .showValueswraper
            { color: var(--app-secondary-close-button-color); position: relative; left: 149px; top: -9px; height: 11px; width:
            3px; } div[close-button] { position: relative; left: 154px; top: -27px; }


        </style>
        <article>
            <label for="range">[[elemTitle]]
                <span>[[type]]</span>
            </label>
            <div buttons="">
                <div class="showValueswraper" on-click="showValues" show\$="[[show]]">
                    <paper-icon-button noink="" icon="unfold-less" title="togge function layout" class="showValues" short\$="[[short]]"></paper-icon-button>
                    <paper-icon-button noink="" icon="unfold-more" title="togge function layout" class="showValues" short\$="[[!short]]"></paper-icon-button>
                </div>
                <div close-button="" class="buttShow" show\$="[[show]]">
                    <button on-click="removeCall"> x </button>
                </div>
            </div>
            <div class="open divtitle-area" open\$="[[open]]">
                <section id="title" class="open" open\$="[[open]]">
                    <paper-input id="titleInput" class="diferent" min="0" max="5" step="0.5" label="new title" title="new title" value="{{elemTitle}}">
                    </paper-input>
                    <paper-button on-click="submit" raised="">aplly title </paper-button>
                </section>
            </div>
            <section class="show" show\$="[[show]]">
                <nav>
                    <paper-input id="reduction" class="diferent" label="reduction" title="the amount of gain reduction currently applied by the compressor to the signal" value="{{reduction}}">
                    </paper-input>
                </nav>
                <audio-compressor-function id="functions" agent-class="[[agentClass]]" elem-title="[[elemTitle]]" type="[[type]]">
                    <div slot="functionArea" short\$="[[short]]">

                    </div>
                </audio-compressor-function>
            </section>
        </article>
`;
  }

  static get is() {
      return 'audio-compressor';
  }
  constructor() {
      super();
  }
  ready() {
      super.ready()
      window.addEventListener('compressor-changed', event => {
          this.reduction = this.agentClass.contextNode[this.elemTitle].reduction
          console.log('compressor-changed')
      })
  }
  static get properties() {
      return {
          elemTitle: {
              type: String,
              notify: true
          },
          reduction: {
              type: Number,
              notify: true
          },
          type: {
              type: String,
              value: 'Compressor'
          },
          agentClass: {
              type: Object,
              notify: true
          },
          value: {
              type: String,
              value: 'agent',
              notify: true,
          },
          short: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
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
          }

      }
  }
  showValues() {
      this.short = !this.short
      //this.show = !this.show
  }


  submit() {
      if (this.$.titleInput.value.length > 0) {
          this.elemTitle = this.elemTitle.split(' ').join('');
          this.agentClass.compressor((error, context) => {
              if (context !== undefined) {
                  var that1 = this
                  window.dispatchEvent(new CustomEvent('connect', { detail: { element: that1 } }))
                  this.open = false
                  this.show = true
                  this.reduction = context.reduction
                  window.dispatchEvent(new CustomEvent('elemem-title', { detail: { title: this.elemTitle } }))                         
              } else {
                  this.$.titleInput.value = error
                  setTimeout(() => {
                      this.$.titleInput.value = ''
                  }, 1000)
              }
          }, this.elemTitle)
      }
  }

  removeCall() {
      if (this.agentClass.contextNode[this.elemTitle]) {
          this.agentClass.removeAgents(() => {
              this.agentClass.revoveElemTitle(() => {
                  setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
                      window.dispatchEvent(new CustomEvent('apllywith', { detail: { title: this.elemTitle } }))
                  }, 500)
                  this.parentElement.removeChild(this)
              }, this.elemTitle)
          }, 'contextNode', this.elemTitle)
      } else {
          this.parentElement.removeChild(this)
          window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
      }
  }
}
window.customElements.define(audioCompressor.is, audioCompressor);
