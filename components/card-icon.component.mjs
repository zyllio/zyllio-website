const css = `
  @import "./components/global.css";

  :host {
    display: block;
    margin: 0 1.5em 0 0;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5em;
    color: #000;
    font-weight: 200;
    width: 100%;
    margin: 0;
    padding: .4em;
    text-align: center;
    font-size: var(--font-size-normal);
    border-radius: 20px;
    border: 1px solid rgba(15, 19, 32, 0.12);
    box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 8px 20px rgba(15,19,32,.05);
  }

  ::slotted(h1) {
    margin: 0;
    padding: 0;
    font: inherit;
    font-weight: 200;
  }

  .dot {
    display: inline-block;  
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(180deg, #ff9f61, #ff8a3d);
  }
`;

const html = `
  <div class="wrapper">
    <span class="dot"></span>
    <slot></slot>
  </div>
`;

class ZyllioCardIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html;
  }
}

customElements.define('zyllio-card-icon', ZyllioCardIcon);
