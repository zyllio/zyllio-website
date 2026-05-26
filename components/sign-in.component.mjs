
const css = `

  @import "./components/global.css";

  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: white;
    font-size: var(--font-size-normal);
    height: 44px;
    padding: 0 1.2em;
    border-radius: var(--border-radius);
    box-sizing: border-box;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    text-align: center;
    transition: all .2s ease;
    background-color: var(--sign-in-bg, #164785)
  }

  :host(:hover) {
    background-color: var(--sign-in-hover-bg, #1d58a5)
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

    this.onclick = () => {
      if (!href || href === '#') {
        return
      }

      window.open(href, '_blank')
    }
  }
}

customElements.define('zyllio-sign-in', ZyllioSignIn)
