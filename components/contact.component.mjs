
const css = `

  @import "./components/global.css";

  :host {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex: 1;
    min-width: 220px;
    max-width: 340px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    box-shadow: 0 10px 25px rgba(2, 8, 23, 0.08);
    padding: 1.6em;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 54px;
    border-radius: 14px;
    background: var(--icon-bg, #EEF2FF);
    flex-shrink: 0;
  }

  ::slotted(img) {
    display: block;
    width: 28px;
    height: 28px;
    object-fit: contain;
  }

  ::slotted(h1) {
    margin: 0;
    font-weight: 700;
    font-size: 1.1em;
    color: #1a1a2e;
  }

  ::slotted(h2) {
    margin: 0;
    font-weight: 400;
    font-size: 0.88em;
    color: #64748b;
    line-height: 1.55;
    flex: 1;
  }

  ::slotted(a) {
    display: inline-block;
    font-size: 0.78em;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--link-color, #4F6AD4);
    text-decoration: none !important;
    margin-top: auto;
  }

  ::slotted(a:hover) {
    text-decoration: underline !important;
  }

  @media (max-width: 576px) {
    :host {
      width: 100%;
      max-width: 100%;
    }
  }

`

const html = `
  <div class="icon-wrapper">
    <slot name="icon"></slot>
  </div>
  <slot name="title"></slot>
  <slot name="message"></slot>
  <slot name="badge"></slot>
`

class ZyllioContact extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-contact', ZyllioContact)