
const css = `

  @import "./components/global.css";
    
  :host {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 26%;
    padding: 10px;
    height: 120px;
    justify-content: center;
    border: 1px solid #e6e6e6;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    box-shadow: 0 10px 25px rgba(2, 8, 23, 0.08);
  }

  ::slotted(h1) {
    font-size: 2em;
    text-align: center;
    color: #ee8030;
    font-weight: bold;
    margin: 0;
  }

  ::slotted(h2) {
    font-size: 1.2em;
    text-align: center;
    color: #154785;
    margin: 0;
    font-weight: normal;
  }

`

const html = `
  <slot></slot>
`

class ZyllioStat extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-stat', ZyllioStat)