
const css = `

  @import "./components/global.css";
    
  :host {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: var(--global-width);
    background: #ffffff;
    /*border: 1px solid #e2e8f0;
    border-radius: 18px;
    box-shadow: 0 10px 25px rgba(2, 8, 23, 0.08);
    padding: 1em;*/
  }

  :host(.horizontal) {
    flex-direction: row;
  }
  
  .container {
    display: flex;
    flex-direction: column;    
  }

  ::slotted(*) {
    scroll-snap-align: start;
    min-width: var(--global-width);
  }

  .menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    border-radius: 20px;    
  }

  :host(.horizontal) .menu {
    min-width: 120px;
  }

  .menu-item {
    display: flex;
    height: 30px;    
    padding: 2px 10px;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    font-size: 1em;
    border-radius: 20px;    
    color: #154785;
    background-color: #15478512;
    border: 1px solid #1547851a;
  }

  :host(.horizontal) .menu-item {
    width: 120px;
  }

  .menu-item:hover {
    background-color: #15478526;
  }

  .menu-item.selected {
    color: #fff;
    background-color: #154785;
  }
  
  .slides {
    display: flex;
    overflow: hidden;
    scroll-snap-type: x mandatory;
  }

  a:hover {
    text-decoration: none;
  }

  .previous, .next {
    background-repeat: no-repeat;    
    min-width: 50px;
    min-height: 50px;
  }

  .previous {
    background-image: url('./image/arrow-left-bold-circle.svg')
  }

  .next {
    background-image: url('./image/arrow-right-bold-circle.svg')
  }
  
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
  }

  ::-webkit-scrollbar-thumb {
    background-clip: content-box;
    background-color: white;
    border: 4px solid transparent;
    border-radius: 14px !important;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  @media (max-width: 576px) {

    :host {    
      gap: 5px;
    }

    .menu-item {
      padding: 1px 5px;
      font-size: 0.65rem;
    }
  }
`

const html = `
  <div class="menu" >
  </div>
    
  <div class="slides" >
    <slot></slot>
  </div>    
`

class ZyllioCarousel extends HTMLElement {

  selection = ''

  constructor() {

    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html
  }

  connectedCallback() {

    setTimeout( () => {
      this.initMenu()
    }, 200)
  }

  initMenu() {

    const slots = this.shadowRoot.querySelector('slot').assignedElements()

    const menu = this.shadowRoot.querySelector('.menu')

    const slides = this.shadowRoot.querySelector('.slides')

    menu.onclick = (event) => {

      const menuItem = event.target

      const href = menuItem.getAttribute('href')

      if (href) {

        menu.querySelectorAll('.menu-item').forEach(item => {
          item.classList.remove('selected')
        })

        menuItem.classList.add('selected')

        const id = href.substring(1)

        const slide = document.getElementById(id)

        const index = Array.from(slots).indexOf(slide)

        const left = slide.scrollWidth * index

        slides.scrollTo(left, 0)
      }
    }

    let menuContent = ''

    for (let slot of slots) {

      const title = slot.querySelector('h1').innerText

      const id = slot.id

      menuContent += `<div class="menu-item" href="#${id}" >${title}</div>`
    }

    menu.innerHTML = menuContent

    menu.querySelector('.menu-item').classList.add('selected')
  }
}

customElements.define('zyllio-carousel', ZyllioCarousel)