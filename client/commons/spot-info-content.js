import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { provider } from '@things-factory/board-ui'

const INFOWINDOW_BOARD = 'infowindow'

export class SpotInfoContent extends connect(store)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
        }

        div {
          width: 100%;
          height: 100%;
        }
      `
    ]
  }

  static get properties() {
    return {
      data: Object,
      scene: Object,
      _refresh: Number
    }
  }

  stateChanged(state) {
    this._boardId = (state.boardSetting[INFOWINDOW_BOARD] || { board: {} }).board.id
  }

  updated(changes) {
    if (changes.has('_refresh')) {
      this._onRefresh()
    }

    if (changes.has('scene') && this.scene) {
      this.scene.fit()
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this._refresh = (this._refresh || 0) + 1
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this._releaseRef()
  }

  get targetEl() {
    return this.renderRoot.getElementById('target')
  }

  render() {
    return html`
      <div id="target"></div>
    `
  }

  _releaseRef() {
    if (this.scene) {
      this.scene.target = null
      this.scene.release()
      this.scene = null
    }
  }

  async _onRefresh() {
    if (!this._boardId) return

    try {
      var scene = await provider.get(this._boardId, true)
      let { width, height } = scene.model
      this.setAttribute('style', `width:${width}px;height:${height}px`)

      scene.target = this.targetEl
      scene.data = this.data

      this.scene = scene
    } catch (e) {
      console.error(e)
    }
  }
}

customElements.define('spot-info-content', SpotInfoContent)
