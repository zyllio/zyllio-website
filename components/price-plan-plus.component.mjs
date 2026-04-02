const css = `

  @import "./components/global.css";

    :host{
      display:block;
      width:100%;
      margin-top: 40px;
    }

    .card{
      border:1px solid rgba(15,23,42,.12);
      border-radius:16px;
      padding:18px;
      background:#fff;
      box-shadow: 0 10px 26px rgba(2, 6, 23, .10);
    }

    .row{
      display:grid;grid-template-columns:1.6fr 1fr;
      gap:16px;
      align-items:start;
    }

    @media (max-width:900px){
      .row{
        grid-template-columns:1fr;
      }
    }

    ::slotted(h2){
      margin:0;
      font-size:20px;
      letter-spacing:-.01em;
      color:#0f172a;
    }

    ::slotted(p){
      margin:8px 0 0;
      color:#475569;
    }

    /* Pills */
    .chips{
      display:flex;
      flex-wrap:wrap;gap:8px;
      margin-top:10px;
    }

    ::slotted([slot="chip"]){
      font-size:15px;
      padding:6px 10px;
      border-radius:999px;
      border:1px solid rgba(15,23,42,.10);
      background:#f8fafc;
      font-weight:800;
      color:#0f172a;
      display:inline-flex;
      align-items:center;
      line-height:1;
    }

    /* Right column */
    ::slotted([slot="right"]){
      display:block;
    }

    ::slotted(.price){
      font-size:26px;
      font-weight:900;
      margin:0;
      letter-spacing:-.02em;
      color:#0f172a;
    }

    ::slotted(.small) {
      margin:6px 0 0;
      color:#475569;
      font-size:13px;
    }

    /* CTA */
    ::slotted([slot="cta"]){
      display:inline-flex;
      justify-content:center;
      align-items:center;
    }

    .
  `

const html = `
    <section class="card" aria-label="Plan Plus">
      <div class="row">
        <div class="left">
          <slot></slot>
          <div class="chips" aria-label="Fonctionnalités clés">
            <slot name="chip"></slot>
          </div>
        </div>
        <aside class="right" aria-label="Tarif">
          <slot name="right"></slot>
          <slot name="cta"></slot>
        </aside>
      </div>
    </section>
  `

class PricePlanPlus extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html
  }
}

customElements.define('zyllio-price-plan-plus', PricePlanPlus)