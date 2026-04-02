
const css = `

  @import "./components/global.css";

  :host {
    display: flex;
    flex-direction: row;
    margin-top: 0;
    margin-bottom: 30px;
    place-items: center;
    align-items: flex-start;
    gap: 50px;
  }

  :host(.style1) {
    background-color: #2456a81f;
    padding: 20px;
    border-radius: 20px;
  }


  :host(.style2) {
    background-color: #ee813142;
    padding: 20px;
    border-radius: 20px;
  }

  @media (max-width: 576px) {

    :host {
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;
      gap: 0;
    }
  }

`

const html = `
  <slot></slot>
`

class ZyllioCard extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-card', ZyllioCard)