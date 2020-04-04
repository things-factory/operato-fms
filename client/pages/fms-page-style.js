import { css } from 'lit-element'

export const FMSPageStyles = css`
  :host {
    display: flex;
    flex-direction: column;

    /* grist의 수평 스크롤이 나오도록 */
    overflow: hidden;

    --mdc-theme-primary: var(--secondary-color);
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
    --mdc-text-field-fill-color: transparent;
    --mdc-text-field-ink-color: var(--secondary-color);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 15px;
    box-shadow: inset 0px 3px 3px 0px rgba(0, 0, 0, 0.2);
    background-color: var(--main-section-background-color);
  }

  [search] * {
    flex: none;
    max-width: 220px;
    margin: 0 20px 0 0;
  }
`
