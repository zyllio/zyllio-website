
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
    align-items: center;
    gap: clamp(24px, 4vw, 48px);
    width: min(1180px, 92vw);
    margin: 0 auto;
    margin-top: 0;
    color: #000;
  }

  .container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 21px;
    flex: 1;
    max-width: 620px;
  }

  .prompt {
    flex: 1;
    max-width: 560px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .buttons {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  img {
    border-radius: 6px;
    border: 1px solid #00000038;
    box-shadow: 2px 2px 8px 2px #0000001f;
    width: 400px;
  }

  zyllio-header-stat {
    display: none;
  }

  ::slotted(zyllio-sign-in) {
    align-self: flex-start;
  }

  ::slotted(h1) {
    font-size: clamp(30px, 4vw, 52px);
    line-height: 1.1;
    margin: 0 !important;
    color: #154785;
    text-align: left;
    font-weight: 700;
  }

  ::slotted(h2) {
    font-size: clamp(30px, 3.8vw, 52px);
    line-height: 1.1;
    margin: 0 !important;
    color: #ee8030;
    text-align: left;
    font-weight: 700;
  }

  ::slotted(h3) {
    max-width: 760px;
    font-size: clamp(15px, 1.5vw, 24px);
    line-height: 1.45;
    margin: 0 !important;
    margin-top: 12px !important;
    color: #334155;
    text-align: left;
    font-weight: 600;
  }

  ::slotted(zyllio-ai-prompt) {
    display: block;
    width: 100%;
    margin-top: 0;
    position: relative;
    z-index: 2;
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

    .main {
      flex-direction: column;
      align-items: center;
      gap: 24px;
      width: min(640px, 92vw);
    }

    .container {
      align-items: center;
      max-width: 100%;
    }

    .prompt {
      max-width: 100%;
      justify-content: center;
    }

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3) {
      text-align: center;
    }

    img, zyllio-header-stat {
      display: none;
    }

    .buttons {
      justify-content: center;
      margin-top: 16px;
    }

    ::slotted(zyllio-ai-prompt) {
      width: min(420px, 92vw);
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

    ::slotted(zyllio-ai-prompt) {
      width: 100%;
    }

    img, zyllio-header-stat {
      display: none;
    }
  }

`

const html = `
  <zyllio-header-stat value="5841" label="apps" variant="yellow" left="calc(5% + 300px)" top="22%"></zyllio-header-stat>
  <zyllio-header-stat value="42" unit="k" label="utilisateurs finaux" variant="green" left="calc(max(18px, 3vw) + 100px)" bottom="20%"></zyllio-header-stat>
  <zyllio-header-stat value="3852" label="créateurs d’apps" variant="purple" right="calc(9% + 300px)" top="16%"></zyllio-header-stat>
  <zyllio-header-stat value="154" unit="k" label="requêtes / mois" variant="rose" right="calc(max(18px, 3vw) + 100px)" bottom="16%"></zyllio-header-stat>

  <div class="main">
    <div class="container" >
      <slot name="title" ></slot>
      <slot name="sub-title" ></slot>
      <slot name="message" ></slot>
      <div class="buttons" >
        <slot name="sign-in" ></slot>
        <slot name="hosting" ></slot>
      </div>
    </div>

    <div class="prompt" >
      <slot name="ai-prompt" ></slot>
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