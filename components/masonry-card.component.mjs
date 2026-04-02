// components/zyllio-mansory-card.js

const css = `
  @import "./components/global.css";

  :host {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 6px 18px rgba(2, 6, 23, 0.08);
    color: #ffffff;
    break-inside: avoid;
    transition: transform 0.18s ease;
  }

  :host(:hover) {
    transform: translateY(-3px);
  }

  :host(.style1) {
    background-color: rgba(22, 71, 133, 0.75);
  }
  :host(.style2) {
    background-color: rgba(238, 128, 48, 0.78);
  }
  :host(.style3) {
    background-color: #797dcf;
  }
  :host(.style4) {
    background-color: rgba(99, 102, 241, 0.70);
  }
  :host(.style5) {
    background-color: #c8641ed9;
  }
  :host(.style6) {
    background-color: #143156bf;
  }

  ::slotted([slot="title"]) {
    margin: 0;
    font-size: var(--font-size-text);
    font-weight: 600;
    color: #ffffff;
  }

  ::slotted([slot="subtitle"]) {
    font-size: var(--font-size-normal);
    color: rgba(255, 255, 255, 0.92);
  }

  ::slotted([slot="image"]) {
    border-radius: 8px;
    width: 100%;
  }

`;

const html = `
  <slot name="title"></slot>
  <slot name="subtitle"></slot>
  <slot name="image"></slot>
`;

class ZyllioMasonryCard extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>${css}</style>${html}`;
  }
}

customElements.define("zyllio-masonry-card", ZyllioMasonryCard)
