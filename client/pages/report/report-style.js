import { css } from 'lit-element'

export const ReportStyles = css`
  :host {
    flex: 1;

    display: flex;
    flex-direction: column;

    /* grist의 수평 스크롤이 나오도록 */
    overflow: hidden;
  }

  data-grist {
    flex: 1;

    overflow: auto;
  }

  [search] {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding: 0 10px 2px 10px;
  }

  [search] * {
    flex: none;
    max-width: 220px;
    margin: 0 20px 0 0;
  }
`
