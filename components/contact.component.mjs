
const css = `

  @import "./components/global.css";
  
  :host {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    max-width: 25%;
    text-align: center;
    place-content: space-around;
    place-items: center;
    background-color: white;
    border-radius: var(--border-radius);
    padding: 10px;
    border: 1px solid #e6e6e6;
    padding: 1em;

        background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    box-shadow: 0 10px 25px rgba(2, 8, 23, 0.08);
  }

  .container {
    display: flex;
    gap: 5px;
  }

  ::slotted(h1) {
    margin: 0;
    color: #154785;
    font-weight: bold;
    font-size: var(--font-size-text);
    margin: 0.1em 0;
  }

  ::slotted(h2) {
    margin: 0;
    font-weight: 200;
    font-size: calc(var(--font-size-normal) * 0.8);
  }

  ::slotted(a) {
    display: inline-block;
    border-radius: 20px;
    padding: 0.6em;
    font-size: calc(var(--font-size-normal) * 0.80);
    color: #000;
    text-decoration: underline !important;
  }

  ::slotted(img) {
    display: inline-block;
    width: 30px;
    height: 30px;
  }


  @media (max-width: 576px) {

    :host {
      width: 100%;
      max-width: 100%;
      margin: 10px;
    }
  }

  
`

const html = `
  <div class="container" >
    <slot name="icon"></slot>
    <slot name="message" ></slot>
  </div>
  <slot name="badge"></slot>
`

class ZyllioContact extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-contact', ZyllioContact)