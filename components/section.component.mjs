
const css = `

  @import "./components/global.css";

  :host {
    display: flex;
    place-content: center;
    padding-bottom: 70px;
    transition: opacity 0.5s 0.25s ease-out;    
  }  

  :host(.small-title) {
    background-color: unset;
    padding-bottom: 0;
  }

  .main {
    width: var(--global-width);
  }

  .content {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .content.row {
    flex-direction: row;
  }

  .content.column {
    flex-direction: column;
  }

  .content.wrap {
    flex-wrap: wrap;
    gap: 10px;
  }

  .content.space-between {
    place-content: space-between;
  }

  .content.space-around {
    place-content: space-around;
  } 

  ::slotted(h1) {
    color: #154785;
    font-size: var(--font-section-title);
    font-weight: 400;
    margin: 50px 0 50px 0 !important;
  }

  :host(.dark) ::slotted(h1) {
    color: white;
  }

  :host(.small-title) ::slotted(h1) {
    margin: 70px 0 0 0 !important;
  }

  ::slotted(h1):after {
    display: block;
    content: "";
    position: relative;
    left: 2px;
    top: 0px;
    max-width: 65px;
    height: 6px;
    background-color: #ee8030;
    border-radius: 4px;
  }

  ::slotted(img) {
    width: 100%;
    border-radius: 10px;
    box-shadow: var(--shadow);
  }

  @media (max-width: 576px) {

    :host(:nth-child(2n+1)) {      
      background-color: transparent;
    }

    :host(.dark) {
      background-color: black;
    }

    .title {
      margin: 30px 0 20px 0;
    }

  }
`

const html = (layout) => `
  <div class="main">
    <slot name="title" ></slot>
    <div class="content ${layout}">
      <slot name="content" ></slot>
    </div>
  </div>
`

class ZyllioSection extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })

  }

  connectedCallback() {

    const layout = this.getAttribute('layout') || ''

    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html(layout)

    const smallTitle = this.hasAttribute('small-title')

    if (smallTitle) {
      this.classList.add('small-title')
    }

    const dark = this.hasAttribute('dark')

    if (dark) {
      this.classList.add('dark')
    }
  }
}

customElements.define('zyllio-section', ZyllioSection)