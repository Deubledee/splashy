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
class audioApllyWith extends PolymerElement {
  static get template() {
    return html`
        <style include="shared-styles-typeF">
            :host { width: auto; z-index: 1; } section[list-box-hiden] { display: none } section[list-box-hiden][boxShow] { display:
            block } paper-item[sellected] { background-color: chartreuse }
        </style>
        <section>
            <aside>
                <paper-menu-button>
                    <paper-button slot="dropdown-trigger" alt="menu">aplly with</paper-button>
                    <paper-listbox slot="dropdown-content">
                        <template id="applyNode" is="dom-repeat" items="{{keys}}" as="key" mutable-data="true">
                            <paper-item on-click="showBox">[[key]]</paper-item>
                        </template>
                    </paper-listbox>
                </paper-menu-button>
            </aside>
            <aside>
                <slot name="applyButton">
                </slot>
            </aside>
        </section>
        <section list-box-hiden="" boxshow\$="[[boxShow]]" on-click="hidewBox2">
            <paper-listbox id="listBox" slot="dropdown-content" multi="">
                <template is="dom-repeat" items="{{applicables}}" as="applicable" mutable-data="true">
                    <paper-item id="[[applicable.name]]" on-click="hidewBox">[[applicable.titleFuncion]]</paper-item>
                </template>
            </paper-listbox>
        </section>
`;
  }

  static get is() {
      return 'audio-aplly-with';
  }
  constructor() {
      super();
  }
  ready() {
      super.ready()
  }
  static get properties() {
      return {
          agentClass: {
              type: Object,
          },
          type: {
              type: String
          },
          elemTitle: {
              type: String,
          },
          titleFuncion: {
              type: String,
          },
          name: {
              type: String,
              computed: 'set(elemTitle)'
          },
          boxShow: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          sellected: {
              type: Array,
              value: [],
          },
          keys: {
              type: Array,
              value: function () {
                  return []
              },
              notify: true
          },
          applicables: {
              type: Array,
              value: function () {
                  return []
              },
              notify: true
          },
      }
  }

  set(elemTitle) {
      let name = elemTitle + this.titleFuncion.split(' ').join('').toLocaleUpperCase()
      this.agentClass.setApplicable(() => {
          window.addEventListener('apllywith', (event) => {
              this.applyer()
          }, false)
          window.dispatchEvent(new CustomEvent('apllywith', { detail: { title: elemTitle } }))
      }, {
              elemTitle: elemTitle,
              arr: [{
                  elemTitle: elemTitle,
                  titleFuncion: this.titleFuncion,
                  name: name
              }]
          })
      return name
  }

  applyer() {
      this.keys = [0]
      let keys = Object.keys(this.agentClass.applicables)
      let arr = [], arr2 = []
      for (let i = 0; i < keys.length; i++) {
          if (keys[i] === this.elemTitle && this.agentClass.applicables[keys[i]].arr.length > 1) {
              arr.push(keys[i])
          }
          if (keys[i] !== this.elemTitle) {
              arr.push(keys[i])
          }
      }
      this.keys = arr
  }

  showBox(event) {
      this.boxShow = true
      this.applicables = [0]
      let arr2 = []
      for (let j = 0; j < this.agentClass.applicables[event.model.__data.key].arr.length; j++) {
          if (this.agentClass.applicables[event.model.__data.key].arr[j].name !== this.name) {
              arr2.push(this.agentClass.applicables[event.model.__data.key].arr[j])
          }
      }
      this.applicables = arr2
      setTimeout(() => {
          this.shouldSellect(this.sellected, this.applicables)
      }, 25)
  }

  shouldSellect(arr1, arr2) {
      let itIs = []
      arr1.map(item => {
          for (let i = 0; i < arr2.length; i++) {
              if (item.name === arr2[i].name && item.titleFuncion === this.titleFuncion) {
                  this.sellect(this.$.listBox.children, arr2[i].name)
              }
              if (item.name !== arr2[i].name && item.titleFuncion === this.titleFuncion) {
                  this.unSellect(this.$.listBox.children, arr2[i].name)
              }
          }
      })
  }

  hidewBox2(event) {
      this.boxShow = false
  }

  sellect(elem, name) {
      if (name === undefined) {
          elem.setAttribute('sellected', true)
          console.log('sellected', elem[name], name)
      } else {
          elem[name].setAttribute('sellected', true)
      }
  }

  unSellect(elem, name) {
      if (name === undefined) {
          elem.removeAttribute('sellected', true)
          console.log('sellected', elem[name], name)
      } else {
          elem[name].removeAttribute('sellected', true)
      }
  }
  popFromArray(item) {
      let arr = []
      for (let i = 0; i < this.sellected.length; i++) {
          if (this.sellected[i].name !== item) {
              arr.push(this.sellected[i])
          }
      }
      this.sellected = arr
      console.log('popfrom', this.sellected, arr)
  }

  hidewBox(event) {
      this.boxShow = false
      let bool = event.model.children[1].hasAttribute('sellected') === true ? false : true
      let name = event.model.__data.applicable.elemTitle + event.model.__data.applicable.titleFuncion.split(' ').join('').toLocaleUpperCase()
      if (bool === true) {
          this.agentClass.setAppliesWith((err) => {
              if (event.model.children[1].innerHTML === event.model.__data.applicable.titleFuncion) {
                 this.sellected.push({ name: name, sellected: true, title: this.elemTitle })
                  this.sellect(event.model.children[1])
              }
          }, { elemTitle: this.elemTitle, name: name, elem: this.children[0], titleFuncion: this.titleFuncion, sellected: true })
    
      }
      if (bool === false) {
          this.agentClass.revoveAppliesWith((err) => {
              if (err) console.error(err)
              this.popFromArray(name)
              this.unSellect(event.model.children[1])
          }, { elemTitle: this.elemTitle, name: name, titleFuncion: this.titleFuncion, sellected: false })
      }
  }
}
window.customElements.define(audioApllyWith.is, audioApllyWith);
