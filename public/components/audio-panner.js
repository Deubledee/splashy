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

import './audio-panner-function.js';
import './audio-panner-set-function.js';
import './audio-panner-set.js';
import './audio-panner-set-roll-model.js';
import './audio-panner-set-value.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class audiopPanner extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeG">
            :host { margin-right: 4px; box-sizing: border-box; } article{ min-height: 135px; min-width: 188px; max-width: 541px ; width:
            auto; box-sizing: border-box; }
        </style>
        <article>
            <label for="range">[[elemTitle]]
                <span>[[type]]</span>
                <button on-click="removeCall"> x </button>
            </label>
            <div class="open divtitle-area" open\$="[[open]]">
                <section id="title" class="open" open\$="[[open]]">
                    <paper-input id="titleInput" class="diferent" min="0" max="5" step="0.5" label="new title" title="new title" value="{{elemTitle}}">
                    </paper-input>
                    <paper-button on-click="submit" raised="">aplly title </paper-button>
                </section>
            </div>
            <section class="show" show\$="[[show]]">
                <audio-panner-function id="functions" agent-class="[[agentClass]]" elem-title="[[elemTitle]]" type="[[type]]">
                    <div slot="functionArea">

                    </div>
                </audio-panner-function>
            </section>
        </article>
`;
  }

  static get is() {
      return 'audio-panner';
  }
  constructor() {
      super();
  }
  ready() {
      super.ready()
  }
  static get properties() {
      return {
          elemTitle: {
              type: String,
              notify: true
          },
          type: {
              type: String,
              value: 'Panner'
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

  submit() {
      if (this.$.titleInput.value.length > 0) {
          this.elemTitle = this.elemTitle.split(' ').join('');
          this.agentClass.panner((error) => {
              if (error === null) {
                  var that1 = this
                  window.dispatchEvent(new CustomEvent('connect', { detail: { element: that1 } }))
                  this.open = false
                  this.show = true
                  //  setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('elemem-title', { detail: { title: this.elemTitle } }))
                  //  }, 100)
              } else {
                  this.$.titleInput.value = 'already exists'
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
window.customElements.define(audiopPanner.is, audiopPanner);
