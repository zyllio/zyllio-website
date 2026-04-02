
const css = `

  @import "./components/global.css";
    
  :host {  
    display: flex;  
    flex-direction: column;    
    margin-right: 10px;
    margin-bottom: 10px;
    overflow: hidden;
  } 
  
  ::slotted(iframe) {
    height: 158px;
    width: 280px;
    border: none;
    border-radius: 6px;
  }

  ::slotted(h1) {
    background-position: left center;
    background-size: 18px 14px;
    background-repeat: no-repeat;
    font-size: var(--font-size-normal);
    font-weight: normal;
    padding-left: 22px;
  }

  ::slotted(h1.fr) {
    background-image: url('./flags/fr.png');    
  }

  ::slotted(h1.en) {
    background-image: url('./flags/en.png');    
  }

  ::slotted(h1.ar) {
    background-image: url('./flags/ar.png');    
  }
`

const html = `
  <slot></slot>
`

class ZyllioTutorial extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-tutorial', ZyllioTutorial)