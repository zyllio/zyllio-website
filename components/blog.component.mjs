
const css = `

  @import "./components/global.css";
  
  :host() {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    margin: 120px 0 0 0;
    flex-direction: column;
  }
  
  ::slotted(h1)  {
    margin: 6px 0 !important;
    font-weight: bold;
    font-size: var(--font-size-normal);
    color: #a3a3a3;
  }

  ::slotted(img) {
    width: min(100%, 600px);
    margin: 10px 0;
    border-radius: 12px;
  }
  
  ::slotted(h2) {
    width: 70%;
    padding-right: 30px;
    font-size: var(--font-size-normal);
    font-weight: 200;
  }

  @media (max-width: 576px) {

    ::slotted(h2) {
      width: 100%;
    }

    ::slotted(img) {
      width: 100%;
    }    
  }

  
`

const html = `
  <slot></slot>
`

class ZyllioBlog extends HTMLElement {

  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-blog', ZyllioBlog)