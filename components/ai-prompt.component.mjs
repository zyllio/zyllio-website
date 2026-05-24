const css = `

  @import "./components/global.css";

  :host {
    display: block;
    width: min(532px, 64vw);
    margin-top: 0;
  }

  .panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
    border: 2px solid transparent;
    border-radius: 20px;
    background:
      linear-gradient(155deg, rgba(255, 255, 255, 0.96), rgba(250, 252, 255, 0.92)) padding-box,
      linear-gradient(120deg, #1f6ec7, #22d3ee, #60a5fa, #f59e0b, #1f6ec7) border-box;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.8);
    padding: 14px;
    backdrop-filter: blur(5px);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    gap: 0;
    align-items: flex-start;
    justify-content: center;
    min-height: 44px;
  }

  .ai-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 6px;
    box-sizing: border-box;
    border-radius: 50%;
    background: linear-gradient(145deg, #0f172a 0%, #1d4ed8 50%, #06b6d4 100%);
    border: 0;
    box-shadow: 0 14px 30px rgba(14, 26, 61, 0.28);
    color: #fff;
    transition: background .2s ease;
    flex-shrink: 0;
  }

  .ai-logo:hover {
    background: linear-gradient(145deg, #111827 0%, #2563eb 50%, #22d3ee 100%);
  }

  .ai-logo-mark {
    color: inherit;
    width: 16px;
    height: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .ai-logo-mark svg {
    width: 16px;
    height: 16px;
    display: block;
  }

  .label {
    color: #164785;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 1.25;
  }

  .prompt-area {
    width: 100%;
    min-height: 98px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    border-radius: 14px;
    background: #ffffff;
    resize: vertical;
    padding: 14px;
    box-sizing: border-box;
    font-size: 15px;
    font-family: var(--font-family);
    font-weight: 500;
    letter-spacing: 0.1px;
    line-height: 1.4;
    color: #0f172a;
    outline: none;
    transition: border-color .2s ease, box-shadow .2s ease;
  }

  .prompt-area::placeholder {
    color: #64748b;
    font-weight: 400;
  }

  .prompt-area:focus {
    border-color: #1f6ec7;
    box-shadow: 0 0 0 4px rgba(31, 110, 199, 0.12);
  }

  .footer {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .run {
    border: none;
    border-radius: 999px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    background: linear-gradient(135deg, #164785, #1f6ec7);
    cursor: pointer;
    transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
  }

  .run:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(31, 110, 199, 0.24);
    filter: saturate(1.04);
  }

  .run:active {
    transform: translateY(0);
  }

  .run:focus-visible {
    outline: 2px solid rgba(31, 110, 199, 0.35);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    :host {
      width: min(420px, 66vw);
      margin-top: 0;
    }

    .prompt-area {
      min-height: 86px;
      font-size: 14px;
    }

    .footer {
      gap: 8px;
    }
  }

`;

const html = `
  <div class="panel">
    <div class="header">
      <div class="ai-logo" aria-hidden="true">
        <span class="ai-logo-mark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19,1L17.74,3.75L15,5L17.74,6.26L19,9L20.25,6.26L23,5L20.25,3.75Z"/>
            <path fill="currentColor" d="M9,4L6.5,9.5L1,12L6.5,14.5L9,20L11.5,14.5L17,12L11.5,9.5Z"/>
            <path fill="currentColor" d="M19,15L17.74,17.74L15,19L17.74,20.25L19,23L20.25,20.25L23,19L20.25,17.74Z"/>
          </svg>
        </span>
      </div>
      <div class="header-content">
        <span class="label"></span>
      </div>
    </div>

    <textarea class="prompt-area" maxlength="280"></textarea>

    <div class="footer">
      <div class="actions">
        <button class="run" type="button"></button>
      </div>
    </div>
  </div>
`;

class ZyllioAiPrompt extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html;
  }

  connectedCallback() {
    const area = this.shadowRoot.querySelector('.prompt-area');
    const runBtn = this.shadowRoot.querySelector('.run');
    const label = this.shadowRoot.querySelector('.label');

    area.placeholder = this.getAttribute('placeholder') || '';
    label.textContent = this.getAttribute('label') || '';
    runBtn.textContent = this.getAttribute('button-label') || '';

    runBtn.addEventListener('click', () => {
      const prompt = area.value.trim();

      if (!prompt) {
        return;
      }

      const params = new URLSearchParams({ prompt });
      const targetUrl = `https://www.zyllio.one/?${params.toString()}`;

      window.open(targetUrl, '_blank');
    });
  }
}

customElements.define('zyllio-ai-prompt', ZyllioAiPrompt);
