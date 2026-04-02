const css = `

  @import "./components/global.css";

  :host {
    display: block;
    width: 100%;
  }

  .wrap {
    width: 100%;
  }

  .heading {
    text-align: center;
    margin: 8px 0 34px;
  }

  .heading h2 {
    margin: 0;
    color: #0f172a;
    font-size: clamp(22px, 2.5vw, 34px);
    font-weight: 700;
  }

  .heading p {
    margin: 10px 0 0;
    color: #64748b;
    font-size: clamp(13px, 1.2vw, 16px);
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }

  .card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);
  }

  .plan {
    margin: 0;
    color: #164785;
    font-size: 15px;
    font-weight: 600;
  }

  .price {
    margin: 6px 0 0;
    color: #0f172a;
    font-size: 32px;
    line-height: 1;
    font-weight: 700;
  }

  .per {
    font-size: 16px;
    font-weight: 500;
    color: #64748b;
  }

  .sep {
    margin: 18px 0;
    border: none;
    border-top: 1px solid #e2e8f0;
  }

  .label {
    margin: 0;
    color: #64748b;
    font-size: 13px;
  }

  .commission {
    margin: 4px 0 0;
    color: #16a34a;
    font-size: 36px;
    line-height: 1;
    font-weight: 700;
  }

  .recurring {
    margin: 2px 0 0;
    color: #94a3b8;
    font-size: 13px;
  }

  .clients {
    margin-top: 18px;
    display: grid;
    gap: 10px;
  }

  .slider-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .clients label {
    color: #334155;
    font-weight: 500;
    font-size: 16px;
  }

  .count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 28px;
    border-radius: 8px;
    background: #164785;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    padding: 0 8px;
  }

  .clients input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #e2e8f0;
    outline: none;
    cursor: pointer;
    border: none;
    padding: 0;
  }

  .clients input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #164785;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(22, 71, 133, 0.35);
    transition: transform 0.15s ease;
  }

  .clients input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  .clients input[type="range"]::-moz-range-thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #164785;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(22, 71, 133, 0.35);
  }

  .clients input[type="range"]::-moz-range-progress {
    background: #164785;
    height: 6px;
    border-radius: 3px;
  }

  .subtotal {
    margin: 4px 0 0;
    color: #1e293b;
    font-size: 13px;
  }

  .total {
    margin-top: 22px;
    border-radius: 14px;
    background: linear-gradient(120deg, #eef2ff, #f8fafc);
    border: 1px solid #c7d2fe;
    padding: 16px 20px;
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
  }

  .total-label {
    color: #334155;
    font-size: 15px;
    font-weight: 500;
  }

  .total-value {
    color: #164785;
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
  }

  @media (max-width: 1300px) {
    .price {
      font-size: 28px;
    }

    .commission {
      font-size: 30px;
    }
  }

  @media (max-width: 900px) {
    .cards {
      grid-template-columns: 1fr;
    }

    .card {
      padding: 16px;
    }

    .commission {
      font-size: 28px;
    }

    .total-value {
      font-size: 24px;
    }
  }

`

const html = (t) => `
  <div class="wrap">
    <div class="heading">
      <h2>${t.heading}</h2>
      <p>${t.subheading}</p>
    </div>

    <div class="cards">
      <article class="card" data-plan="starter">
        <h3 class="plan">${t.plans.starter}</h3>
        <p class="price">39 <span class="per">${t.currencySymbol}/${t.month}</span></p>
        <hr class="sep">
        <p class="label">${t.commissionLabel}</p>
        <p class="commission" data-commission="starter"></p>
        <p class="recurring">${t.recurring}</p>
        <div class="clients">
          <div class="slider-header">
            <label>${t.clientsLabel}</label>
            <span class="count-badge" data-count="starter">0</span>
          </div>
          <input type="range" min="0" max="20" step="1" value="0" data-input="starter">
          <p class="subtotal">${t.subtotal}: <span data-subtotal="starter"></span></p>
        </div>
      </article>

      <article class="card" data-plan="business">
        <h3 class="plan">${t.plans.business}</h3>
        <p class="price">79 <span class="per">${t.currencySymbol}/${t.month}</span></p>
        <hr class="sep">
        <p class="label">${t.commissionLabel}</p>
        <p class="commission" data-commission="business"></p>
        <p class="recurring">${t.recurring}</p>
        <div class="clients">
          <div class="slider-header">
            <label>${t.clientsLabel}</label>
            <span class="count-badge" data-count="business">0</span>
          </div>
          <input type="range" min="0" max="20" step="1" value="0" data-input="business">
          <p class="subtotal">${t.subtotal}: <span data-subtotal="business"></span></p>
        </div>
      </article>

      <article class="card" data-plan="agency">
        <h3 class="plan">${t.plans.agency}</h3>
        <p class="price">289 <span class="per">${t.currencySymbol}/${t.month}</span></p>
        <hr class="sep">
        <p class="label">${t.commissionLabel}</p>
        <p class="commission" data-commission="agency"></p>
        <p class="recurring">${t.recurring}</p>
        <div class="clients">
          <div class="slider-header">
            <label>${t.clientsLabel}</label>
            <span class="count-badge" data-count="agency">0</span>
          </div>
          <input type="range" min="0" max="20" step="1" value="0" data-input="agency">
          <p class="subtotal">${t.subtotal}: <span data-subtotal="agency"></span></p>
        </div>
      </article>
    </div>

    <div class="total">
      <span class="total-label">${t.totalLabel}</span>
      <span class="total-value" data-total></span>
    </div>
  </div>
`

class ZyllioAffiliateSimulator extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    this.planCommissions = {
      starter: 7.8,
      business: 15.8,
      agency: 57.8
    }
  }

  connectedCallback() {
    const s = (name) => this.querySelector(`[slot="${name}"]`)?.textContent.trim() ?? ''
    this.t = {
      heading:         s('heading'),
      subheading:      s('subheading'),
      plans: {
        starter:       s('plan-starter'),
        business:      s('plan-business'),
        agency:        s('plan-agency'),
      },
      commissionLabel: s('commission-label'),
      recurring:       s('recurring'),
      clientsLabel:    s('clients-label'),
      subtotal:        s('subtotal'),
      totalLabel:      s('total-label'),
      month:           s('month'),
      locale:          document.documentElement.lang === 'fr' ? 'fr-FR' : 'en-US',
      currency:        document.documentElement.lang === 'fr' ? 'EUR' : 'USD',
      currencySymbol:  document.documentElement.lang === 'fr' ? '€' : '$',
    }
    this.formatter = new Intl.NumberFormat(this.t.locale, {
      style: 'currency',
      currency: this.t.currency,
      minimumFractionDigits: 2
    })

    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html(this.t)

    Object.entries(this.planCommissions).forEach(([plan, commission]) => {
      const commissionEl = this.shadowRoot.querySelector('[data-commission="' + plan + '"]')
      if (commissionEl) commissionEl.textContent = this.formatter.format(commission)
    })

    const inputs = this.shadowRoot.querySelectorAll('[data-input]')
    inputs.forEach((input) => {
      input.addEventListener('input', () => this.updateTotals())
    })

    this.updateTotals()
  }

  updateTotals() {
    let total = 0

    Object.entries(this.planCommissions).forEach(([plan, commission]) => {
      const input = this.shadowRoot.querySelector('[data-input="' + plan + '"]')
      const subtotalEl = this.shadowRoot.querySelector('[data-subtotal="' + plan + '"]')
      const countEl = this.shadowRoot.querySelector('[data-count="' + plan + '"]')

      const count = Math.max(0, Number.parseInt(input.value || '0', 10) || 0)
      const subtotal = count * commission
      const pct = (count / Number(input.max)) * 100

      input.style.background = `linear-gradient(to right, #164785 ${pct}%, #e2e8f0 ${pct}%)`
      countEl.textContent = count
      subtotalEl.textContent = this.formatter.format(subtotal) + ' / ' + this.t.month
      total += subtotal
    })

    const totalEl = this.shadowRoot.querySelector('[data-total]')
    totalEl.textContent = this.formatter.format(total) + ' / ' + this.t.month
  }
}

customElements.define('zyllio-affiliate-simulator', ZyllioAffiliateSimulator)
