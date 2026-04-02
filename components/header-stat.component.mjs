const css = `
  :host {
    position: absolute;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    padding: 2px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 10px 30px rgba(2, 6, 23, .10);
    color: #103a78;
    background: #ffffff;
    text-align: center;
    font-weight: 700;
    gap: 2px;
    animation: float 6s ease-in-out infinite;
    will-change: transform;
    user-select: none;
  }

  :host(:hover) {
    filter: brightness(1.03) saturate(1.02);
  }

  :host(.disabled) {
    opacity: .6;
    pointer-events: none;
  }
    
  .value {
    font-size: 16px;
    line-height: 1;
  }

  .label {
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial;
    font-weight: 600;
    font-size: 13px;
    line-height: 1.1;
    color: #475569;
    text-transform: lowercase;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) }
    25% { transform: translate(6px, -4px) }
    50% { transform: translate(0, -8px) }
    75% { transform: translate(-6px, -4px) }
  }
`;

const html = `
  <div class="value"></div>
  <small class="label"></small>
`;


class ZyllioHeaderStat extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html
  }
  connectedCallback() {

    this.init()

    this.registerDragEvents()
  }

  registerDragEvents() {

    this.addEventListener('pointerdown', e => {

      const move = ev => {

        const rect = this.getBoundingClientRect();

        this.style.left = (ev.clientX - rect.width / 2) + 'px'
        this.style.top = (ev.clientY - rect.height / 2) + 'px'
        this.style.right = ''
        this.style.bottom = ''
      }
      const up = () => {
        document.removeEventListener('pointermove', move)
      }

      document.addEventListener('pointermove', move);
      document.addEventListener('pointerup', up, { once: true });
      document.addEventListener('pointercancel', up, { once: true });
    })
  }

  init() {

    const value = parseInt(this.getAttribute('value'), 10)

    const label = this.getAttribute('label')

    this.shadowRoot.querySelector('.value').textContent = value + ' ' + this.getUnit()

    this.shadowRoot.querySelector('.label').textContent = label;

    ['left', 'right', 'top', 'bottom'].forEach(pos => {
      const v = this.getAttribute(pos);
      if (v !== null) { this.style[pos] = v; }
    })

    const v = this.getAttribute('variant').toLowerCase()

    const map = {
      yellow: '#fef9c3',
      blue: '#e0f2fe',
      green: '#dcfce7',
      purple: '#ffffff',
      rose: '#fee2e2',
      white: '#ffffff'
    }

    const bg = map[v] || '#ffffff'

    this.style.backgroundColor = bg

    const randomDelay = (Math.random() * 5).toFixed(2) + 's'

    this.style.animationDelay = randomDelay
  }

  getUnit() {
    return this.getAttribute('unit') || ''
  }
}

customElements.define('zyllio-header-stat', ZyllioHeaderStat)