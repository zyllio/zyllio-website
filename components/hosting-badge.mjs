
const css = `
  @import "./components/global.css";

  :host { 
    display: inline-block; 
  }

  .badge{
    display: inline-flex; 
    align-items: center; 
    gap: 10px;
    padding: 0.6em 1.2em;
    border-radius: var(--border-radius);
    background: #ffffff; 
    border: 1px solid #e2e8f0; 
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
  }

  .flag{
    width: 36px;
    height: 25px;
    border-radius: 4px;
    background: linear-gradient(90deg,#002395 0 33.333%, #ffffff 33.333% 66.666%, #ed2939 66.666% 100%);
    border: 1px solid #cbd5e1;
    background-clip: padding-box;
  }
`;

const html = `
  <div class="badge" >
    <span class="flag" ></span>
    <span class="label"</span>
  </div>
`;

class ZyllioHostingBadge extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html

    setTimeout(() => {
      this.init()
    })
  }
  
  init() {

    const label = this.getAttribute('label')

    const labelEl = this.shadowRoot.querySelector('.label')

    labelEl.textContent = label;
  }  
}

customElements.define('zyllio-hosting-badge', ZyllioHostingBadge)

