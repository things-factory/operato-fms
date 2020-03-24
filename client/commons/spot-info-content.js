import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '@things-factory/shell'
import { provider } from '@things-factory/board-ui'
import { sleep } from '@things-factory/utils'

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

  async _releaseRef() {
    if (this.scene) {
      this.scene.target = null
      await sleep(1000)

      if (!this.scene?.target) {
        this.scene.release()
        this.scene = null
      }
    }
  }

  async _onRefresh() {
    if (!this._boardId) {
      return
    }

    try {
      if (!this.scene) {
        this.scene = await provider.get(this._boardId, true)
        let { width, height } = this.scene.model
        this.setAttribute('style', `width:${width}px;height:${height}px`)
      }

      this.scene.target = this.targetEl
      this.scene.data = this.data

      this.scene.fit()
    } catch (e) {
      console.error(e)
    }
  }
}

customElements.define('spot-info-content', SpotInfoContent)
