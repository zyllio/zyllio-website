
const css = `

  @import "./components/global.css";

  :host {  
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    place-content: center;
    z-index: 1000;
    transition: background-color 0.2s;
    background-color: transparent;
  }

  :host(.overlaid), :host(.always-overlaid) {
    box-shadow: var(--shadow);
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, .8);
  }

  .main {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: transparent;
    padding: 0.4em 0;
    color: white;    
    transition: background-color 200ms;
    width: var(--global-width);
    gap: 1rem;
  }

  .hamburger {
    display: none;    
    width: 30px;
    height: 30px;
    margin: 10px 0;
    color: #154785 !important;    
  }

  .close {
    display: none;
    color: #154785;
    width: 30px;
    height: 30px;
    margin: 10px 0;
    z-index: 1000;
  }

  .logo {
    display: flex;
    margin-left: 0;
    flex-direction: row;
    place-items: center;
    flex-grow: 1;
    transition: margin-left 200ms;
  }

  .logo .image {
    background-image: url("./image/logo-light.png");
    background-size: 100%;
    width: 5em;
    height: 2.5em;
  }

  .navbar {
    display: flex;
    flex-direction: row;
    place-items: center;
  }

  .menu {
    position: absolute;
    top: 3.5em;
    left: -1000px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 280px;
    padding: 10px;
    color: #154785;
    background-color: #fff;
    box-shadow: var(--shadow);
    border-radius: 6px;
    border: 1px solid #cbcbcb;
    gap: 4px;
  }

  .menu a {
    color: #154785;    
    padding: 8px;
    border-radius: 8px;
  }

  .menu a:hover {
    background-color: #00000010;
    text-decoration: none !important;
  }

  ::slotted(a) {
    display: flex;
    padding: 0.5em 0.65em;
    font-size: var(--font-size-normal);
    font-weight: 600;
    cursor: pointer;
    text-transform: uppercase;
    border-radius: 8px;
    color: #154785 !important;
    --color: #154785 !important;
  }

  ::slotted(a:hover) {
    text-decoration: none !important;  
    background-color: #00000010 !important;    
  }

  @media (max-width: 576px) {
    
    .navbar {
      position: absolute;
      left: -10px;
      top: 0;
      display: none;
      flex-direction: column;
      width: 100vw;
      height: 100vh;
      background-color: #fff;
      color: #154785;
      padding-top: 40px;
    }

    .hamburger {
      display: block;
    }

    .menu {
      display: none;
    }

    ::slotted(a) {
      padding: 0.5em 0.65em;
      font-size: 24px;
      cursor: pointer;
      text-transform: uppercase;
    }

    ::slotted(a:hover) {
      text-decoration: none !important;  
      background-color: #ffffff2b;
    }

    ::slotted(zyllio-sign-in) {
      display: none;
    }
  }

`

const html = `
  <div class="main">
    <a class="logo" href="./index.html">
      <div class="image"></div>
    </a>
    <svg class="hamburger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
    <div class="navbar">
    <slot name="link" ></slot>
    </div>
    <svg class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>  
    <slot name="sign-in" ></slot>
    <div class="menu" ></div>
  </div>
`

class ZyllioNav extends HTMLElement {

  constructor() {

    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html

    window.onscroll = () => {
      this.refresh()
    }
  }

  connectedCallback() {

    setTimeout(() => {
      this.init()
    })
  }

  init() {

    const alwaysOverlaid = this.hasAttribute('always-overlaid')

    if (alwaysOverlaid) {
      this.classList.add('always-overlaid')
    }

    this.initMenu()

    this.initHamburger()
  }

  initHamburger() {

    const hamburger = this.shadowRoot.querySelector(`.hamburger`)

    if (hamburger === undefined) {
      return
    }

    hamburger.onclick = () => {

      const navbar = this.shadowRoot.querySelector('.navbar');

      navbar.style.display = 'flex';

      const close = this.shadowRoot.querySelector('.close');

      close.style.display = 'block';

      close.onclick = () => {
        navbar.style.display = 'none';
        close.style.display = 'none';
      }
    }
  }

  initMenu() {

    this.onmouseleave = async () => {

      const menu = this.shadowRoot.querySelector('.menu')

      menu.innerHTML = ''

      menu.style.left = '-1000px'
    }

    const slot = this.shadowRoot.querySelector(`slot[name='link']`);

    const links = slot.assignedNodes()

    links
      .filter(link => link.text !== '') /* ignore language button */
      .forEach(link => {

        link.onmouseenter = async () => {

          const page = await (await fetch(link.href)).text()

          const doc = new DOMParser().parseFromString(page, 'text/html')

          const sections = Array.from(doc.querySelectorAll('zyllio-section')).slice(0, 9)

          const menu = this.shadowRoot.querySelector('.menu')

          const main = this.shadowRoot.querySelector('.main')

          const left = (link.getBoundingClientRect().left - main.getBoundingClientRect().left) + 'px'

          menu.style.left = left

          let subMenus = ''

          for (let section of sections) {

            const titleElement = section.querySelector('h1')

            if (!titleElement || !section.id) {
              continue
            }

            const title = titleElement.textContent.trim()

            if (!title) {
              continue
            }

            subMenus += `<a href="${link.href}#${section.id}" >${title}</a>`
          }

          menu.innerHTML = subMenus
        }
      })

  }

  refresh() {

    if (window.scrollY > 50) {
      this.classList.add('overlaid');
    } else {
      this.classList.remove('overlaid');
    }
  }

}

customElements.define('zyllio-nav', ZyllioNav)