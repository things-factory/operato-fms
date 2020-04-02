import { css } from 'lit-element'

export const ReportStyles = css`
  :host {
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

  [search] {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    padding: 10px;
  }

  [search] * {
    flex: none;
    margin: 0 20px 0 0;
  }
`
