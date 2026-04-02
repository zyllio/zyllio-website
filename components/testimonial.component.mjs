
const css = `

  @import "./components/global.css";
  
  :host {
    display: inline-flex;
    flex-direction: column;
    margin: 20px 20px 20px 0;
    background-color: #fff7f5;
    padding: 20px;
    border-radius: 12px;
    gap: 10px;
    box-sizing: border-box;
  }

  
  .profile {
    display: flex;
    gap: 10px;    
    width: fit-content;
    margin-top: 10px;
    padding-left: 20px;
  }

  .container {
    display: flex;
    flex-direction: column;
  }
    
  ::slotted(img) {
    width: 40px;
    height: 40px;
  }

  ::slotted(h1) {
    display: none; /* Used by carousel */
  }

  ::slotted(h2) {
    position: relative;
    max-width: 625px;
    font-size: 0.9em;
    font-weight: 200;
    margin: 0;
    padding-left: 20px;
    padding-top: 20px;
  }

  ::slotted(h2)::before {
    content: "“";
    position: absolute;
    left: -12px;
    top: -8px;
    font-size: 72px;
    line-height: 1;
    color: #f59e0b;
    font-family: Georgia, Cambria, "Times New Roman", Times, serif;
    opacity: .9;
  }

  ::slotted(h3) {
    font-weight: normal;
    margin: 0;
    font-size: 0.9em;
    color: #000;
  }

  ::slotted(h4) {
    font-weight: normal;
    margin: 0;
    font-size: 0.8em;
    color: #858585;
  }

  @media (max-width: 1300px) {
    
    ::slotted(h2) {
      max-width: 594px;
    }

  }

  @media (max-width: 768px) {

    ::slotted(h2) {
      max-width: 404px;
    }

    ::slotted(h2)::before {
      font-size: 47px;
      left: -2px;
      top: -4px;
    }
  }  

  @media (max-width: 576px) {

    :host {
      padding: 5px;
    }

    ::slotted(h2) {
      max-width: 205px;
      font-size: 0.8em;
      font-weight: normal;
      margin: 0;
    }
  }

`

const html = `
  <slot name="message" ></slot>
  <div class="profile" >
    <slot name="profile" ></slot>    
    <div class="container" >
      <slot name="name" ></slot>
      <slot name="position" ></slot>
    </div>
  </div>

`

class ZyllioTestimonial extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }
}

customElements.define('zyllio-testimonial', ZyllioTestimonial)