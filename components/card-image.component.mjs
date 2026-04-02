
const css = `

  @import "./components/global.css";

  img {
    border-radius: 10px;
    width: 500px;
  }

  @media (max-width: 1300px) {

    img {
      width: 340px;
    }    
  }

  @media (max-width: 768px) {

    img {
      width: 230px;
    }
  }

  @media (max-width: 576px) {

    img {
      width: 300px;
    }
    
  }
`

const html = `
  <img alt="" src="" >
`

class ZyllioCardImage extends HTMLElement {
  constructor() {

    super()

    this.attachShadow({ mode: 'open' })
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html
  }

  connectedCallback() {

    const orientation = this.getAttribute('orientation')

    this.classList.add(orientation)

    const src = this.getAttribute('src')

    this.shadowRoot.querySelector('img').src = src

    this.shadowRoot.querySelector('img').alt = src
  }
}

customElements.define('zyllio-card-image', ZyllioCardImage)