/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import './lazy-resources.js';

import './audio-mixtable.js';
import '../public/components/audio-agent-analizer.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class AudioApp extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        position: relative;
        min-height: 100vh;
      }

      app-toolbar {
        transform: translate3d(0px, 0px, 0px);
        background-color: var(--app-toolbar-background-color);
        box-shadow: var(--app-toolbar-box-shadow);
      }

      app-toolbar div[main-title] {
        margin-left: 50px;
        color: var(--app-title);
      }

      app-header div[main-area] {
        background-color: var(--app-main-area-background-color)
      }

      audio-mixtable nav {
        display: inline-flex;
        width: 99.4%;
      }
      div[main-area]{
        padding: 3px;
        padding-top: 4px
      }
      .column {
        display: flex;
        flex-flow: column;
      }
     /* audio-mixtable nav[slot="agentArea"]{
        display: table;
      }*/
    </style>

    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"></app-route>
    <app-header-layout fullbleed="">
      <app-header slot="header" reveals="">
        <app-toolbar>
          <div main-title="">
            <h1>[[appTitle]] </h1>
          </div>
        </app-toolbar>

        <div main-area="">
          <audio-mixtable id="mixTable" elem-title="{{elemTitle}}" ocupied="{{ocupied}}">
            <nav slot="analizerArea">
            </nav>
            <nav slot="agentArea"></nav>
            <nav class="column" slot="sourceArea">
            </nav>
            <nav class="column" slot="connectorArea"></nav>
          </audio-mixtable>
        </div>

      </app-header>
    </app-header-layout>
`;
  }

  static get is() {
    return 'audio-app';
  }

  /*   connectedCallback() {
       super.connectedCallback();
       this.isAttached = true;
     }*/

  static get properties() {
    return {
      ocupied: {
        type: Boolean,
        value: false,
        notify: true
      },
      appTitle: {
        type: String,
        notify: true
      },

      elemTitle: {
        type: String,
        notify: true,
        observer: '_log'
      },
    }
  }

  _log(data) {
    console.log('app log', data)
  }

  ready() {
    super.ready();
    this.removeAttribute('unresolved');
    let cMatch = navigator.userAgent.match(/Android.*Chrome[\/\s](\d+\.\d+)/);

    afterNextRender(this, () => {
      this.addEventListener('refresh-data', (e) => this._refreshData(e));
    });

    window.addEventListener('elemem-title', () => {
      this.ocupied = false
    }, false)

  }
  _pageLoaded(shouldResetLayout) {
    this._ensureLazyLoaded();
  }

  _ensureLazyLoaded() {
    // load lazy resources after render and set `loadComplete` when done.
    if (!this.loadComplete) {
     console.log('load complete')
    }
  }

  /*_notifyNetworkStatus() {
    let oldOffline = this.offline;
    this._setOffline(!window.navigator.onLine);
    // Show the snackbar if the user is offline when starting a new session
    // or if the network status changed.
    if (this.offline || (!this.offline && oldOffline === true)) {
      if (!this._networkSnackbar) {
        this._networkSnackbar = document.createElement('news-snackbar');
        this.root.appendChild(this._networkSnackbar);
      }
      this._networkSnackbar.textContent == this.offline ?
        'You are offline' : 'You are online';
      this._networkSnackbar.open();
    }
  }*/

  _refreshData() {
    this.$.data.refresh();
  }
}

customElements.define(AudioApp.is, AudioApp);
