
const css = `

  @import "./components/global.css";
  
  :host {
    display: flex;
    align-items: center;
    width: 40px;
    gap: 4px;
    cursor: pointer;
    --color: inherit;
  }

  img {
    width: 24px;
    height: 16px;
    padding: 2px 0;
  }
  
  .arrow {
    border: solid var(--color);
    border-width: 0 3px 3px 0;
    padding: 3px;
    transform: rotate(45deg) translateY(-3px);
  }
  
`

const html = (lg) => `
  <img alt="flag ${lg}" src="./flags/${lg}.png" >
  <div class="arrow" ></div>
`

class ZyllioBlog extends HTMLElement {

  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
  }
  
  connectedCallback() {
    
    const language = this.getAttribute('language')
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html(language)

  }
}

customElements.define('zyllio-language-selector', ZyllioBlog)