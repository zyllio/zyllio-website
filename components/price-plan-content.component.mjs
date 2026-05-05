
const css = `

  @import "./components/global.css";
    
  :host {    
    display: flex;
    flex-direction: column;
    padding: 0.8em;
    text-align: left;
    color: var(--plan-body-color, inherit);
  }

  ::slotted(h1) {
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    color: var(--plan-title-color, #154785);
  }

  ::slotted(h2) {
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    color: var(--plan-subtitle-color, #858a8f);
    margin: 0;
  }

  ::slotted(.small) {
    font-size: 12px;
    line-height: 1.5;
    text-align: center;
    margin: 0.4rem 0 0;
  }
  
  @media (max-width: 576px) {
    
    :host {      
    }
  }

`

const html = `
  <slot></slot>
`

class ZyllioPricePlanContent extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-price-plan-content', ZyllioPricePlanContent)
