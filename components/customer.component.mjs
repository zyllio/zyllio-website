
const css = `

  @import "./components/global.css";
    
  :host {
    display: inline-block;    
    height: 60px;
    padding: 20px;
  }

  ::slotted(img) {    
    height: 100%;
  }

  @media (max-width: 576px) {

    :host {      
      height: 40px;
    }
  }

`

const html = `
  <slot></slot>
`

class ZyllioCustomer extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-customer', ZyllioCustomer)