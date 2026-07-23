const css = `
  @import "./components/global.css";

  :host {
    display: block;
    width: 100%;
  }

  .body {
    display: grid;
    grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(28px, 5vw, 64px);
    align-items: start;
  }

  .left,
  .right {
    padding: 0;
  }

  .left {
    background: transparent;
  }

  .price-block {
    background: #ffffff;
    border-radius: var(--border-radius);
    padding: 24px;
    border-bottom: 1px solid #edf2f7;
    margin-bottom: 30px;
  }

  .price-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
  }

  .price {
    font-size: clamp(40px, 5vw, 58px);
    line-height: 1;
    font-weight: 900;
    color: #2a4382;
    letter-spacing: 0;
  }

  .period {
    font-size: 18px;
    color: #000000;
    font-weight: 700;
  }

  .extra {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #edf2f7;
    color: #000000;
    font-size: 14px;
    line-height: 1.6;
  }

  h3 {
    margin: 0 0 18px;
    font-size: 24px;
    font-weight: 800;
    color: #2a4382;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 16px;
  }

  li {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 12px;
    align-items: start;
    color: #000000;
    font-size: 16px;
    line-height: 1.6;
  }

  .plan-pill {
    display: inline-flex;
    align-items: center;
    min-height: 26px;
    padding: 2px 10px;
    border-radius: 999px;
    background: #ffffff;
    border: 1px solid #edf2f7;
    color: #2a4382;
    font-weight: 800;
    white-space: nowrap;
  }

  .benefit .icon {
    color: #f28c28;
    font-size: 22px;
    line-height: 1;
    margin-top: 2px;
  }

  .included .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: rgba(242, 140, 40, 0.14);
    color: #f28c28;
    font-size: 14px;
    line-height: 1;
    margin-top: 2px;
  }

  .note {
    position: relative;
    margin-top: 30px;
    padding: 20px 20px 20px 22px;
    border-radius: 0 18px 18px 0;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
  }

  .note::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 6px;
    height: 100%;
    border-radius: 22px 0 0 22px;
    background: #2a4382;
  }

  .note h4 {
    margin: 0 0 8px;
    color: #2a4382;
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .note p {
    margin: 0;
    color: #000000;
    font-size: 14px;
    line-height: 1.7;
  }

  @media (max-width: 860px) {
    .body {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 576px) {
    .left,
    .right {
      padding-left: 18px;
      padding-right: 18px;
    }

    h3 {
      font-size: 22px;
    }
  }
`

const html = `
  <div class="body">
    <section class="left">
      <div class="price-block">
        <div class="price-row">
          <span class="price"></span>
          <span class="period"></span>
        </div>
        <p class="extra"></p>
      </div>

      <h3 class="benefits-title"></h3>
      <ul class="benefits"></ul>
    </section>

    <section class="right">
      <h3 class="included-title"></h3>
      <ul class="included"></ul>

      <div class="note">
        <h4></h4>
        <p></p>
      </div>
    </section>
  </div>
`

const appendHighlightedText = (element, text, highlight) => {
  const highlightIndex = highlight ? text.indexOf(highlight) : -1

  if (highlightIndex === -1) {
    element.textContent = text
    return
  }

  const before = text.slice(0, highlightIndex)
  const after = text.slice(highlightIndex + highlight.length)

  element.append(document.createTextNode(before))

  const pill = document.createElement('span')
  pill.className = 'plan-pill'
  pill.textContent = highlight
  element.append(pill)

  element.append(document.createTextNode(after))
}

const createListItem = (item, variant) => {
  const li = document.createElement('li')
  li.className = variant

  const icon = document.createElement('span')
  icon.className = 'icon'
  icon.setAttribute('aria-hidden', 'true')
  icon.innerHTML = '&#10003;'

  const label = document.createElement('span')
  appendHighlightedText(label, item.text, item.highlight)

  li.append(icon, label)

  return li
}

class ZyllioPartnerOffer extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html

    this.shadowRoot.querySelector('.price').textContent = this.getAttribute('price') || ''
    this.shadowRoot.querySelector('.period').textContent = this.getAttribute('period') || ''
    this.shadowRoot.querySelector('.extra').textContent = this.getAttribute('extra-seats') || ''
    this.shadowRoot.querySelector('.benefits-title').textContent = this.getAttribute('benefits-title') || ''
    this.shadowRoot.querySelector('.included-title').textContent = this.getAttribute('included-title') || ''
    this.shadowRoot.querySelector('.note h4').textContent = this.getAttribute('note-title') || ''
    this.shadowRoot.querySelector('.note p').textContent = this.getAttribute('note') || ''

    this.renderItems('benefit', 'benefits')
    this.renderItems('included', 'included')
  }

  getItems(attributePrefix) {
    const items = []

    for (let index = 1; this.hasAttribute(`${attributePrefix}-${index}`); index++) {
      items.push({
        text: this.getAttribute(`${attributePrefix}-${index}`) || '',
        highlight: this.getAttribute(`${attributePrefix}-${index}-highlight`) || ''
      })
    }

    return items
  }

  renderItems(variant, listClass) {
    const list = this.shadowRoot.querySelector(`.${listClass}`)
    const items = this.getItems(variant)

    items.forEach((item) => {
      list.append(createListItem(item, variant))
    })
  }
}

customElements.define('zyllio-partner-offer', ZyllioPartnerOffer)
