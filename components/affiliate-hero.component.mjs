const css = `

  @import "./components/global.css";

  :host {
    display: block;
    width: min(860px, 92vw);
    margin: 120px auto 0;
    text-align: center;
    color: #0f172a;
  }

  h1 {
    margin: 0;
    font-size: clamp(30px, 4vw, 52px);
    line-height: 1.1;
    font-weight: 700;
  }

  h1 span {
    color: #164785;
  }

  p {
    margin: 22px auto 0;
    max-width: 760px;
    font-size: clamp(15px, 1.5vw, 24px);
    line-height: 1.45;
    color: #334155;
  }

  p b {
    color: #4f46e5;
  }

  .actions {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  ::slotted(p) {
    margin: 22px auto 0;
    max-width: 760px;
    font-size: clamp(15px, 1.5vw, 24px);
    line-height: 1.45;
    color: #334155;
  }

  ::slotted(.cta-primary),
  ::slotted(.cta-secondary) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 210px;
    min-height: 50px;
    padding: 0 20px;
    border-radius: var(--border-radius);
    font-size: 18px;
    font-weight: 600;
    text-decoration: none;
    transition: all .2s ease;
  }

  ::slotted(.cta-primary) {
    color: #ffffff !important;
    background: #164785 !important;    
    text-decoration: none !important;
  }

  ::slotted(.cta-primary.hover) {
    background: #1d58a5 !important;
  }

  ::slotted(.cta-secondary) {
    color: #334155 !important;
    background: #f8fafc;
    border: 1px solid #d0d7e3;
    text-decoration: none !important;
  }

  ::slotted(.cta-secondary):hover {
    text-decoration: none !important;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    :host {
      margin-top: 34px;
    }

    ::slotted(p) {
      font-size: 16px;
    }

    ::slotted(.cta-primary),
    ::slotted(.cta-secondary) {
      min-width: 190px;
      min-height: 46px;
      font-size: 16px;
    }
  }

`

const html = `
  <h1>
    <slot name="title"></slot><br>
    <span><slot name="highlight"></slot></span>
  </h1>
  <slot name="description"></slot>
  <div class="actions">
    <slot name="cta-primary"></slot>
    <slot name="cta-secondary"></slot>
  </div>
`

class ZyllioAffiliateHero extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html
  }

  connectedCallback() {
    const primaryBtn = this.querySelector('[slot="cta-primary"]')
    if (primaryBtn) {
      primaryBtn.addEventListener('mouseenter', () => {
        primaryBtn.classList.add('hover')
      })
      primaryBtn.addEventListener('mouseleave', () => {
        primaryBtn.classList.remove('hover')
      })
    }
  }
}

customElements.define('zyllio-affiliate-hero', ZyllioAffiliateHero)
