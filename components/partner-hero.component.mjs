const css = `
  @import "./components/global.css";

  :host {
    display: block;
    width: min(860px, 92vw);
    margin: 120px auto 0;
    text-align: center;
  }

  h1 {
    margin: 0;
    font-size: clamp(30px, 4vw, 52px);
    line-height: 1.1;
    font-weight: 700;
  }

  h1 .highlight {
    color: #164785;
  }

  p {
    margin: 22px auto 0;
    max-width: 760px;
    font-size: clamp(15px, 1.5vw, 24px);
    line-height: 1.45;
    color: #000000;
  }

  .actions {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  button {
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
    box-sizing: border-box;
    border: none;
    cursor: pointer;
  }

  .primary {
    color: #ffffff;
    background: #164785;
  }

  button:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    :host {
      margin-top: 34px;
    }

    p {
      font-size: 16px;
    }

    button {
      min-width: 190px;
      min-height: 46px;
      font-size: 16px;
    }
  }
`

const html = `
  <section>
    <h1><span class="title"></span><br><span class="highlight"></span></h1>
    <p class="description"></p>
    <div class="actions">
      <button class="primary" type="button"></button>
    </div>
  </section>
`

class ZyllioPartnerHero extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html

    this.shadowRoot.querySelector('.title').textContent = this.getAttribute('headline') || ''
    this.shadowRoot.querySelector('.highlight').textContent = this.getAttribute('subtitle') || ''
    this.shadowRoot.querySelector('.description').textContent = this.getAttribute('description') || ''
    this.shadowRoot.querySelector('.primary').textContent = this.getAttribute('primary-label') || ''

    this.shadowRoot.querySelector('.primary')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('partner-contact-request', {
        bubbles: true,
        composed: true
      }))
    })
  }
}

customElements.define('zyllio-partner-hero', ZyllioPartnerHero)
