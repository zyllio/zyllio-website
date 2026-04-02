
const css = `

  @import "./components/global.css";

  :host {
    position: relative;
    display: flex;
    flex-direction: column;
    place-items: center;
    width: 100%;
    height: 650px;  
    --align: center;  
    background: radial-gradient(900px 520px at 90% 10%, rgba(249, 115, 22, .12), transparent 55%), radial-gradient(700px 420px at 12% 18%, rgba(29, 78, 216, .12), transparent 58%), radial-gradient(800px 380px at 62% 85%, rgba(13, 148, 136, .12), transparent 60%), linear-gradient(180deg, #ffffff, #e3cee6);
  }

  :host::after {
    content: "";
    position: absolute;
    inset: -20% -5% -10% -5%;
    pointer-events: none;
    opacity: .6;
    background: radial-gradient(350px 200px at 20% 30%, rgba(29, 78, 216, .16), transparent 60%), radial-gradient(300px 200px at 85% 25%, rgba(249, 115, 22, .18), transparent 60%), radial-gradient(260px 180px at 60% 80%, rgba(16, 185, 129, .16), transparent 60%);
  }

  .main {
    display: flex;
    justify-content: var(--align);
    /*justify-content: space-between;*/
    width: var(--global-width);    
    margin-left: 0;
    margin-top: 170px;
    color: #000;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  .buttons {
    display: flex;
    gap: 10px;
    justify-content: var(--align);
  }

  img {
    border-radius: 6px;
    border: 1px solid #00000038;
    box-shadow: 2px 2px 8px 2px #0000001f;
    width: 400px;
  }

  ::slotted(zyllio-sign-in) {
    align-self: var(--align);
  }

  ::slotted(h1) {
    font-size: var(--font-size-header);
    margin: 0 !important;
    color: #154785;
    text-align: var(--align);
    font-weight: 600;
  }

  ::slotted(h2) {
    font-size: var(--font-size-subtitle);
    margin: 0 !important;
    color: #ee8030;
    text-align: var(--align);
    font-weight: 600;
  }

  ::slotted(h3) {
    font-size: var(--font-size-normal);
    margin: 0 !important;
    margin-top: 10px !important;
    color: #00000069;
    text-align: var(--align);
    font-weight: 600;
  }  

  @media (max-width: 1300px) {
      
    :host {
      height: 458px;
    }
  
    .main {
      margin-top: 128px;
    }  

    img {
      display: none;
    }
    
  }

  @media (max-width: 768px) {

    :host {
      height: 353px;
    }
  
    .main {
      margin-top: 84px;
    }

    img, zyllio-header-stat {
      display: none;
    }
  }

  @media (max-width: 576px) {

    :host {
      height: 347px;
    }
  
    .main {
      margin-top: 120px;
      text-align: center;
    }

    img, zyllio-header-stat {
      display: none;
    }
    
  }

`

const html = `
  <div class="main">
    <div class="container" >
      <slot name="title" ></slot>
      <slot name="sub-title" ></slot>
      <slot name="message" ></slot>
      <br><br>
      <div class="buttons" >
        <slot name="sign-in" class="sign-in"></slot>
        <slot name="hosting" ></slot>
      </div>
    </div>    

    <zyllio-header-stat value="5841" label="apps" variant="yellow" left="10%" top="23%"></zyllio-header-stat>
    <zyllio-header-stat value="42" unit="k" label="utilisateurs finaux" variant="green" left="17%" bottom="22%"></zyllio-header-stat>
    <zyllio-header-stat value="3852" label="créateurs d’apps" variant="purple" right="15%" top="17%"></zyllio-header-stat>
    <zyllio-header-stat value="154" unit="k" label="requêtes / mois" variant="rose" right="12%" bottom="18%"></zyllio-header-stat>

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