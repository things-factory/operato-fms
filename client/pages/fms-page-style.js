import { css } from 'lit-element'

export const FMSPageStyles = css`
  :host {
    display: flex;
    flex-direction: column;

    /* grist의 수평 스크롤이 나오도록 */
    overflow: hidden;
  }

  [main] {
    flex: 1;

    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;

    /* sidebar의 스크롤이 나오도록 */
    overflow: hidden;
  }

  [sidebar] {
    width: 280px;
    height: 100%;
  }

  data-grist,
  common-map {
    flex: 1 1 0;
  }

  data-grist {
    overflow: auto;
  }

  [search] {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    padding: 0 10px 2px 10px;
  }

  [search] * {
    flex: none;
    max-width: 220px;
    margin: 0 20px 0 0;
  }
`
