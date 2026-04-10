
const css = `

  @import "./components/global.css";

  :host {
    position: relative;
    display: block;
    width: 100%;
    margin: 0;
    padding: 300px 0 164px;
    overflow: hidden;
    background: transparent;
    text-align: center;
    color: #0f172a;
  }

  :host::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(180deg, rgba(255, 255, 255, .18), rgba(255, 255, 255, 0) 28%, rgba(255, 255, 255, .18) 100%);
  }

  .main {
    display: flex;
    justify-content: center;
    width: min(920px, 92vw);
    margin: 0 auto;
    margin-top: 0;
    color: #000;
  }

  .container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  img {
    border-radius: 6px;
    border: 1px solid #00000038;
    box-shadow: 2px 2px 8px 2px #0000001f;
    width: 400px;
  }

  ::slotted(zyllio-sign-in) {
    align-self: center;
  }

  ::slotted(h1) {
    font-size: clamp(30px, 4vw, 52px);
    line-height: 1.1;
    margin: 0 !important;
    color: #154785;
    text-align: center;
    font-weight: 700;
  }

  ::slotted(h2) {
    font-size: clamp(30px, 3.8vw, 52px);
    line-height: 1.1;
    margin: 0 !important;
    color: #ee8030;
    text-align: center;
    font-weight: 700;
  }

  ::slotted(h3) {
    max-width: 760px;
    font-size: clamp(15px, 1.5vw, 24px);
    line-height: 1.45;
    margin: 0 !important;
    margin-top: 12px !important;
    color: #334155;
    text-align: center;
    font-weight: 600;
  }

  @media (max-width: 1300px) {
    :host {
      padding-top: 162px;
    }

    img, zyllio-header-stat {
      display: none;
    }
  }

  @media (max-width: 768px) {

    :host {
      padding-top: 108px;
    }

    img, zyllio-header-stat {
      display: none;
    }

    .buttons {
      margin-top: 16px;
    }
  }

  @media (max-width: 576px) {

    :host {
      padding-top: 84px;
    }

    .main {
      width: min(340px, 92vw);
      text-align: center;
    }

    img, zyllio-header-stat {
      display: none;
    }
  }

`

const html = `
  <zyllio-header-stat value="5841" label="apps" variant="yellow" left="calc(5% + 300px)" top="22%"></zyllio-header-stat>
  <zyllio-header-stat value="42" unit="k" label="utilisateurs finaux" variant="green" left="calc(10% + 300px)" bottom="20%"></zyllio-header-stat>
  <zyllio-header-stat value="3852" label="créateurs d’apps" variant="purple" right="calc(9% + 300px)" top="16%"></zyllio-header-stat>
  <zyllio-header-stat value="154" unit="k" label="requêtes / mois" variant="rose" right="calc(5% + 300px)" bottom="16%"></zyllio-header-stat>

  <div class="main">
    <div class="container" >
      <slot name="title" ></slot>
      <slot name="sub-title" ></slot>
      <slot name="message" ></slot>
      <div class="buttons" >
        <slot name="sign-in" class="sign-in"></slot>
        <slot name="hosting" ></slot>
      </div>
    </div>    

    <div class="illustration" >
      <!-- <img src="./image/dashboard.png" > -->
    </div>
  </div>
  

`

class ZyllioHeader extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html
  }
}

customElements.define('zyllio-header', ZyllioHeader)