/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class audioSvgProgress extends PolymerElement {
  static get template() {
    return html`
        <style>
            .svg {
                height: 30px;
                width: 150px;
            }

            circle {
                cx: 5;
                cy: 10;
                r: 5;
                fill: rgb(229, 233, 226);
                transition: all 0.5s ease-in 0s
            }

            .circle[hover] {
                fill: rgb(170, 170, 170);
                transition: fill 0.5 ease-out 0s
            }

            .circle[Hover] {
                cursor: e-resize;
                cy: 10;
                r: 10;
                fill: rgb(58, 235, 14);
                transition: r 0.5s ease-out 0s
            }

            .rect1 {
                x: 10;
                y: 10;
                fill: rgb(117, 117, 117);
                width: 114px;
                height: 5px;
                transition: height 0.5s ease-in, y 0.5s ease-in 0s
            }

            .rect2 {
                x: 10;
                y: 10;
                fill: rgb(58, 210, 236);
                height: 5px;
                transition: all 0.5s ease-in 0s
            }

            .rect1[hover] {
                y: 5;
                height: 10px;
                fill: rgb(255, 255, 255);
            }

            .rect2[hover] {
                y: 5;
                height: 10px;
            }


            paper-button {
                color: var(--app-color)
            }
        </style>
        <svg class="svg" on-click="goToX">
            <g id="shape">
                <rect id="rect1" class="rect1" hover\$="[[hover]]"></rect>
                <rect id="rect2" class="rect2" hover\$="[[hover]]"></rect>
                <circle id="circle" class="circle" hover\$="[[hover]]" on-mousedown="move"></circle>
            </g>
        </svg>
`;
  }

  static get is() {
      return 'audio-svg-progress';
  }
  constructor() {
      super();
  }
  ready() {
      super.ready()
      var hover = event => {
          this.hover = true
      }
      var unHover = event => {
          this.hover = false
      }
      this.$.rect1.onmouseover = hover
      this.$.rect2.onmouseover = hover
      this.$.circle.onmouseover = hover
      this.$.rect1.onmouseout = unHover
      this.$.rect2.onmouseout = unHover
      this.$.circle.onmouseout = unHover
  }
  static get properties() {
      return {
          hover: {
              type: Boolean,
              value: false,
              notify: true,
              reflectToAttribute: true
          },
          moving: {
              type: Boolean,
              value: false
          },
          timeNow: {
              type: String,
              notify: true
          },
          percentage: {
              type: Number,
              value: 0,
              notify: true
          }
      }
  }

  changeThis() {
      this.change = !this.change
  }

  getposition(evt) {
      let CTM = evt.target.getScreenCTM()
      return {
          x: (evt.clientX - CTM.e) / CTM.a,
          // y: (evt.clientY - CTM.f) / CTM.d,
      }
  }

  getPercentage(coord) {
      let goTo = (coord.x / 125 * 100)
      this.percentage = goTo >= 100 ? 100 : goTo
  }

  goToX(evt) {
      let radius = parseInt(getComputedStyle(this.$.circle, null).r.split('px')[0])
      let coord = this.getposition(evt)
      let parse = parseInt(coord.x - radius)
      if (coord.x >= 3.5 && parse <= 120) {
          this.$.rect2.style.width = (coord.x - radius) + 'px'
          this.$.circle.style.cx = coord.x
          this.getPercentage(coord)
      }
  }

  progressToX(percentage, duration) {
      if (this.moving === false) {
          let x = duration >= 100 ? percentage / 100 * 189 : percentage / 100 * 130
          let rectx = duration >= 100 ? percentage / 100 * 189 : percentage / 100 * 125
          let radius = parseInt(getComputedStyle(this.$.circle, null).r.split('px')[0])
          this.$.circle.style.cx = parseInt(x) + radius
          this.$.rect2.style.width = parseInt(rectx) + 'px'                    
          //this.Hover = false
      }
  }

  move(evt) {
      evt.preventDefault()
      //kinda morbid i know
      var alive = event => {
          event.preventDefault()
          this.goToX(event)
          this.moving = true
      }

      var dead = event => {
          event.preventDefault()
          event.target.onmousemove = {}
          this.moving = false
      }
      evt.target.onmouseover()
      evt.target.onmousemove = alive
      evt.target.onmouseup = dead
      evt.target.onmouseleave = dead

  }
}
window.customElements.define(audioSvgProgress.is, audioSvgProgress);
