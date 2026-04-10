
const css = `

  @import "./components/global.css";
    
  :host {
    display: flex;
    height: 100px;
    width: 100vw;
    overflow: hidden;
    background: #ffffff;
    padding: 1em;
    border-radius: 20px;
  }

  :host(.big) {
    height: 200px;
  }

  .marquee-container {
    width: 100%;
  }
  
  .marquee-content {
    display: flex;
    animation: marquee 40s linear infinite;
    position: absolute;
    width: max-content;
  }  
  
  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
  
  .marquee-wrapper {
    height: 120px; 
    position: relative;
    width: 100%;
  }
  
  /*.marquee-container:hover .marquee-content {
    animation-play-state: paused;
  }*/ 
 
    
  @media (max-width: 576px) {

    :host {    
      height: 100px !important;
    }
  }
  
`

const html = `  

  <div class="marquee-container">
    <div class="marquee-wrapper">
      <div class="marquee-content">
        <slot name="content" ></slot>
      </div>
    </div>
  </div>

`

class ZyllioMarqueeCarousel extends HTMLElement {

  constructor() {

    super()

    this.attachShadow({ mode: 'open' })

    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html
  }

  connectedCallback() {

    // Duplicate the content of the slot
    const slot = this.shadowRoot.querySelector('slot[name="content"]')

    const marqueeContent = this.shadowRoot.querySelector('.marquee-content')

    // When slot content changes, duplicate it
    // slot.addEventListener('slotchange', () => {

      const nodes = slot.assignedNodes({ flatten: true })
      // marqueeContent.innerHTML = ''

      // Clone each node and append to the secondary container
      nodes.forEach((node) => {
        const clone = node.cloneNode(true);
        marqueeContent.appendChild(clone);
      })

      // nodes.forEach((node) => {
      //   const clone = node.cloneNode(true);
      //   marqueeContent.appendChild(clone);
      // })
    // })
  }

}

customElements.define('zyllio-marquee', ZyllioMarqueeCarousel)