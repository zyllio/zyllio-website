
const css = `

  @import "./components/global.css";
    
  :host {
    display: inline-block;    
    height: 40px;
    padding: 20px;
  }

  ::slotted(img) {    
    height: 100%;
  }

`

const html = `
  <slot></slot>
`

class ZyllioIntegration extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-integration', ZyllioIntegration)