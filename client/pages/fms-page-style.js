import { css } from 'lit-element'

export const FMSPageStyles = css`
  :host {
    display: flex;
    flex-direction: row;
  }

  [sidebar] {
    width: 300px;
  }

  [main] {
    flex: 1;

    display: flex;
    flex-direction: column;

    /* grid의 horizontal scroll을 나타나게 함 */
    width: 0;
  }

  data-grist {
    flex: 1;

    overflow: auto;
  }

  [header] {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  [header] mwc-button {
    align-self: flex-end;
  }
`
