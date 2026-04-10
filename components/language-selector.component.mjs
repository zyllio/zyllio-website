
const css = `

  @import "./components/global.css";
  
  :host {
    position: relative;
    display: inline-flex;
    align-items: center;
    --color: inherit;
  }

  button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    font: inherit;
  }

  img {
    width: 24px;
    height: 16px;
    padding: 2px 0;
  }
  
  .arrow {
    border: solid var(--color);
    border-width: 0 3px 3px 0;
    padding: 3px;
    transform: rotate(45deg) translateY(-3px);
    transition: transform 0.2s ease;
  }

  :host(.open) .arrow {
    transform: rotate(-135deg) translateY(-1px);
  }

  .menu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    display: flex;
    flex-direction: column;
    min-width: 156px;
    padding: 8px;
    border: 1px solid #cbcbcb;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: var(--shadow);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-8px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 20;
    gap: 4px;
  }

  :host(.open) .menu {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 10px;
    border-radius: 8px;
    color: #154785;
    white-space: nowrap;
  }

  .option:hover {
    background-color: #00000010;
  }

  .option.active {
    background-color: #15478512;
    cursor: default;
  }

  .option.active:hover {
    background-color: #15478512;
  }

  .label {
    font-size: 14px;
    font-weight: 600;
  }
  
`

const html = (language, options) => `
  <button class="trigger" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Select language">
    <img alt="flag ${language}" src="./flags/${language}.png" >
    <div class="arrow" ></div>
  </button>
  <div class="menu" role="menu">
    ${options.map(option => `
      <button
        class="option${option.active ? ' active' : ''}"
        type="button"
        role="menuitem"
        data-href="${option.href}"
        ${option.active ? 'disabled' : ''}
      >
        <img alt="flag ${option.code}" src="./flags/${option.code}.png" >
        <span class="label">${option.label}</span>
      </button>
    `).join('')}
  </div>
`

const labels = {
  en: 'English',
  fr: 'Francais'
}

const getCurrentFileName = () => {

  const pathName = window.location.pathname.split('?')[0]
  const fileName = pathName.split('/').pop()

  return fileName || 'index.html'
}

const getCurrentLanguage = (fallbackLanguage) => {

  const fileName = getCurrentFileName()

  if (fileName.endsWith('-fr.html')) {
    return 'fr'
  }

  if (fileName.endsWith('.html')) {
    return 'en'
  }

  return fallbackLanguage === 'fr' ? 'en' : 'fr'
}

const getLanguageHref = (language) => {

  const fileName = getCurrentFileName()
  const suffix = window.location.search + window.location.hash

  if (language === 'fr') {
    if (fileName.endsWith('-fr.html')) {
      return fileName + suffix
    }

    return fileName.replace(/\.html$/, '-fr.html') + suffix
  }

  if (fileName.endsWith('-fr.html')) {
    return fileName.replace('-fr.html', '.html') + suffix
  }

  return fileName + suffix
}

const getLanguageOptions = (fallbackLanguage) => {

  const currentLanguage = getCurrentLanguage(fallbackLanguage)

  return ['fr', 'en'].map(language => ({
    code: language,
    label: labels[language],
    href: getLanguageHref(language),
    active: language === currentLanguage
  }))
}

class ZyllioBlog extends HTMLElement {

  constructor() {

    super()

    this.attachShadow({ mode: 'open' })

    this.onDocumentClick = this.onDocumentClick.bind(this)
  }
  
  connectedCallback() {
    
    const language = this.getAttribute('language') || 'en'
    const options = getLanguageOptions(language)
    
    this.shadowRoot.innerHTML = '<style>' + css + '</style>'  + html(language, options)

    this.init()

    document.addEventListener('click', this.onDocumentClick)

  }

  disconnectedCallback() {

    document.removeEventListener('click', this.onDocumentClick)
  }

  init() {

    const trigger = this.shadowRoot.querySelector('.trigger')
    const options = Array.from(this.shadowRoot.querySelectorAll('.option'))

    trigger.onclick = (event) => {

      event.preventDefault()
      event.stopPropagation()

      this.toggleMenu()
    }

    options.forEach(option => {
      option.onclick = (event) => {

        event.preventDefault()
        event.stopPropagation()

        const href = option.dataset.href

        if (!href || option.disabled) {
          this.closeMenu()
          return
        }

        window.location.href = href
      }
    })
  }

  toggleMenu() {

    const willOpen = !this.classList.contains('open')

    this.classList.toggle('open', willOpen)

    const trigger = this.shadowRoot.querySelector('.trigger')

    trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false')

  }

  closeMenu() {

    this.classList.remove('open')

    const trigger = this.shadowRoot.querySelector('.trigger')

    trigger.setAttribute('aria-expanded', 'false')
  }

  onDocumentClick(event) {

    if (event.composedPath().includes(this)) {
      return
    }

    this.closeMenu()

  }
}

customElements.define('zyllio-language-selector', ZyllioBlog)