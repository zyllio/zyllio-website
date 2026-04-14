
const css = `

  @import "./components/global.css";
    
  :host {
    display: flex;
    place-content: center;
    place-items: center;
    color: white;
    height: 5em;
    background-color: #154785;
    padding: 0 1em;
  }

  .main {
    width: var(--global-width);
  }

  ::slotted(a) {
    color: #fff !important;
    font-weight: 200 !important;
  }
`

const html = `
  <div class="main" >
    © 2026 Zyllio SAS - 
    <slot></slot>
  </div>
`

class ZyllioFooter extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-footer', ZyllioFooter)