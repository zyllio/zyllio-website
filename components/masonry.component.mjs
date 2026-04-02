const masonryCss = `
  @import "./components/global.css";

  :host {
    display: block;
    width: 100%;
    container-type: inline-size;
  }

  .masonry {
    column-count: 2;
    column-gap: 20px;
  }

  @container (max-width: 578px) {
    .masonry {
      column-count: 1;
    }
  }

  ::slotted(*) {
    margin-bottom: 20px;
  }
`;

const masonryHtml = `
    <div class="masonry">
      <slot></slot>
    </div>
  `;

class ZyllioMasonry extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${masonryCss}</style>${masonryHtml}`;
  }
}

customElements.define('zyllio-masonry', ZyllioMasonry);
