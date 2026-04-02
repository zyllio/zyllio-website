const css = `

  @import "./components/global.css";
  
  :host() { 
    display: block;
    width: 100%;
    transition: all 0.2s ease-out;
  }  

  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: var(--shadow);
  }

  @media (max-width: 1300px) {
  :host {
    transform: none !important;
}
  }

  @media (max-width: 768px) {
  :host {
    transform: none !important;
}    
  }  

  @media (max-width: 576px) {
  :host {
    transform: none !important;
}    
  }

`

const html = `
  <img alt="demo" src="./image/demo.gif">
`

class ZyllioDemo extends HTMLElement {

  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }

  connectedCallback() {

    window.addEventListener('scroll', () => {

      const demoElement = this;       

      const rect = demoElement.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      let visibilityRatio = 1 - Math.abs(rect.top / windowHeight);

      visibilityRatio = Math.min(Math.max(visibilityRatio, 0), 0.62); 

      const scaleValue = 1 + (visibilityRatio * 0.5); 

      demoElement.style.transform = `scale(${scaleValue})`;
    })
  }
}

customElements.define('zyllio-demo', ZyllioDemo)