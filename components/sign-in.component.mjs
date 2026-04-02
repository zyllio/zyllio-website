
const css = `

  @import "./components/global.css";

  :host {
    display: inline-block;
    border: none;
    color: white;
    font-size: var(--font-size-normal);
    padding: 0.6em 1.2em;
    border-radius: var(--border-radius);
    cursor: pointer;
    outline: none;
    text-align: center;
    transition: all .2s ease;
    background-color: #164785
  }

  :host(:hover) {
    background-color: #1d58a5
  }
  
  :host(.disabled) {
    background-color: #888585;
  }  

`

const html = `
  <slot></slot>
`

class ZyllioSignIn extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html

    setTimeout(() => {
      this.init()
    })
  }

  init() {

    const href = this.getAttribute('href')

    this.onclick = () => window.open(href, '_blank')
  }
}

customElements.define('zyllio-sign-in', ZyllioSignIn)