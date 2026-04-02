
const css = `

  @import "./components/global.css";
    
  :host {
    display: block;
    background-color: white;
    text-align: center;
    width: 30%;
    border-radius: 20px;
    box-shadow: 0 10px 26px rgba(2, 6, 23, .10);
    overflow: hidden;
  }

  :host(.i0) {
    border: 1px solid #cacaca;;
  }

  :host(.i1) {
    border: 1px solid #cacaca;;
  }

  :host(.i2) {
    border: 4px solid #103564;
  }

  ::slotted(h1) {
    font-size: var(--font-card-title);
    font-weight: 400;
    padding: 10px 10px 0 10px;
    margin: 0;
  }
    
  ::slotted(h2) {
    font-size: var(--font-card-title);
    font-weight: 400;
    padding: 4px 20px 6px 20px;
    margin: 0;
  }

  :host(.i0) ::slotted(h1), :host(.i0) ::slotted(h2) {    
  }

  :host(.i2) ::slotted(h1), :host(.i2) ::slotted(h2) {    
  }

  @media (max-width: 576px) {
    :host {
      width: 100%;
      margin-bottom: 2em;
    }
  }

`

const html = `
  <slot></slot>
`

class ZyllioPricePlan extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html
  }

  connectedCallback() {

    const index = this.getAttribute('index') 

    this.classList.add('i' + index)
  }
}

customElements.define('zyllio-price-plan', ZyllioPricePlan)