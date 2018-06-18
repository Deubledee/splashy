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
class audioGain extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeG">
            :host { width: 179px; margin-right: 4px; }
        </style>
        <article>
            <label for="range">[[elemTitle]]
                <span>Gain</span>
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
                <audio-functions id="functions">
                    <div slot="functionArea">

                    </div>
                </audio-functions>
            </section>
        </article>
`;
  }

  static get is() {
      return 'audio-gain';
  }
  constructor() {
      super();
  }
  ready() {
      super.ready()
      // console.log(this.agentClass)
  }
  static get properties() {
      return {
          elemTitle: {
              type: String,
              notify: true
          },
          type: {
              type: String,
              value: 'gain'
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
          }

      }
  }

  submit() {
      if (this.$.titleInput.value.length > 0) {
          this.elemTitle = this.elemTitle.split(' ').join('');
          this.agentClass.gain((error) => {
              if (!error) {
                  var that1 = this
                  window.dispatchEvent(new CustomEvent('connect', { detail: { element: that1 } }))
                  let that = this.agentClass
                  this.open = false
                  this.show = true
                  this.$.functions.agentClass = this.agentClass
                  this.$.functions.type = this.type
                  this.$.functions.elemTitle = this.elemTitle
                  window.dispatchEvent(new CustomEvent('elemem-title', { detail: { title: this.elemTitle } }))
              } else {
                  this.$.titleInput.value = error
                  setTimeout(() => {
                      this.$.titleInput.value = ''
                  }, 1000)
              }
          }, this.elemTitle, 0, 0)
      }
  }

  removeCall() {
      if (this.agentClass.contextNode[this.elemTitle]) {
          this.agentClass.removeAgents(() => {
              this.agentClass.revoveElemTitle(() => {
                  //   window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
                  setTimeout(() => {
                      window.dispatchEvent(new CustomEvent('remove-elem', { detail: { title: this.elemTitle } }))
                      window.dispatchEvent(new CustomEvent('apllywith', { detail: { title: this.elemTitle } }))
                      //  delete this.agentClass.contextNode[this.elemTitle]
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
window.customElements.define(audioGain.is, audioGain);
