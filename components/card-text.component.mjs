
const css = `

  @import "./components/global.css";

  :host {
    margin: 0.2em 0;
    flex-grow: 1;
  }

  ::slotted(h1)  {
    color: var(--color, #154785);
    font-weight: bold;
    font-size: var(--font-size-text);
    margin: 0.1em 0;
    font-weight: 600;
  }

  ::slotted(span) {
    display: block;
    padding-bottom: 1em;
  }

  @media (max-width: 576px) {

    :host {
      flex-grow: unset;
      align-self: left;
    }
  }

`

const html = `
  <slot></slot>
`

class ZyllioCardText extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-card-text', ZyllioCardText)