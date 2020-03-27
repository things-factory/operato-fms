import { LitElement, html, css } from 'lit-element'
import '@material/mwc-linear-progress'
import { provider } from '@things-factory/board-ui'
import { sleep } from '@things-factory/utils'

/**
 * 구글맵 마커 인포윈도우용 컨텐트
 * - 인포윈도우에 things-scene을 활용한다.
 * - 해당보드 인스턴스 하나를 모든 인포윈도우에서 공유한다. (provider를 사용하기 때문)
 * - 즉, MarkerInfoContent는 마커당 하나의 인스턴스가 만들어지지만, scene은 하나의 인스턴스를 공유한다.
 * - 만약, 여러 인스턴스 scene을 사용하고 싶다면, 다른 방법을 사용해야 한다.
 */
export class MarkerInfoContent extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          position: relative;
        }

        #target {
          width: 100%;
          height: 100%;
        }

        mwc-linear-progress {
          margin: 13px;
          width: 200px;
        }
      `
    ]
  }

  static get properties() {
    return {
      data: Object,
      scene: Object,
      boardId: String
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this.show()
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.hide()
  }

  get targetEl() {
    return this.renderRoot.getElementById('target')
  }

  render() {
    return html`
      ${this.scene
        ? html``
        : html`
            <mwc-linear-progress indeterminate></mwc-linear-progress>
          `}
      <div id="target"></div>
    `
  }

  /*
   * FIXME
   * __scene_about_to_be_desctroied__ 를 사용하는 이유는
   * things-scene의 reference-map이 async 대응에 문제가 있어서 (같은 아이디의 scene을 빠르게 중복 요청하는 경우)
   * 임시 대응함.
   */
  async hide() {
    if (this.scene && !this.__scene_about_to_be_desctroied__) {
      this.__scene_about_to_be_desctroied__ = true
      this.scene.target = null

      await sleep(1000)

      if (this.__scene_about_to_be_desctroied__ && this.scene) {
        this.scene.release()
        this.scene = null
      }

      this.__scene_about_to_be_desctroied__ = false
    }
  }

  async show() {
    if (!this.boardId) {
      return
    }

    try {
      if (!this.scene) {
        this.scene = await provider.get(this.boardId, true)
        let { width, height } = this.scene.model
        this.setAttribute('style', `width:${width}px;height:${height}px`)
      }

      this.__scene_about_to_be_desctroied__ = false

      this.scene.target = this.targetEl
      this.scene.data = this.data

      this.scene.fit()
    } catch (e) {
      console.error(e)
    }
  }
}

customElements.define('marker-info-content', MarkerInfoContent)
