import {
  getContactFormLocale,
  getContactFormMessages,
  submitContactPayload
} from './contact-form-api.mjs'

const css = `

  @import "./components/global.css";

  :host {
    display: block;
  }

  .dialog {
    width: min(760px, calc(100vw - 32px));
    max-width: 760px;
    padding: 0;
    border: none;
    background: transparent;
  }

  .dialog::backdrop {
    background: rgba(15, 23, 42, 0.52);
    backdrop-filter: blur(4px);
  }

  .success-dialog {
    width: min(420px, calc(100vw - 32px));
    padding: 0;
    border: none;
    background: transparent;
  }

  .success-dialog::backdrop {
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(3px);
  }

  .panel {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    box-shadow: 0 24px 70px rgba(2, 8, 23, 0.18);
    padding: 24px;
    display: grid;
    gap: 16px;
    position: relative;
  }

  .success-panel {
    text-align: center;
    justify-items: center;
    gap: 18px;
    padding: 32px 24px;
  }

  .header {
    display: grid;
    gap: 8px;
  }
  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: #e2e8f0;
    color: #0f172a;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .close:hover {
    background: #cbd5e1;
  }

  ::slotted([slot="title"]) {
    margin: 0;
    color: #154785;
    font-size: clamp(24px, 2vw, 30px);
    font-weight: 500;
  }

  ::slotted([slot="intro"]) {
    margin: 0;
    color: #334155;
    font-size: 15px;
    line-height: 1.6;
  }

  .form {
    background: transparent;
    padding: 0;
    display: grid;
    gap: 16px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .field {
    display: grid;
    gap: 8px;
  }

  .field.full {
    grid-column: 1 / -1;
  }

  .label {
    color: #0f172a;
    font-size: 14px;
    font-weight: 600;
  }

  input,
  textarea {
    width: 100%;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 15px;
    color: #0f172a;
    background: #ffffff;
    font-family: inherit;
    box-sizing: border-box;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #164785;
    box-shadow: 0 0 0 3px rgba(22, 71, 133, 0.18);
  }

  textarea {
    min-height: 130px;
    resize: vertical;
  }

  .submit {
    justify-self: start;
    border: none;
    background: #164785;
    color: #ffffff;
    border-radius: 999px;
    padding: 11px 20px;
    font-weight: 700;
    font-size: 15px;
    margin-top: 12px;
    cursor: pointer;
  }

  .submit:hover {
    background: #123c6f;
  }

  .success-button {
    border: none;
    background: #164785;
    color: #ffffff;
    border-radius: 999px;
    padding: 11px 22px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
  }

  .success-button:hover {
    background: #123c6f;
  }

  .submit:disabled {
    opacity: 0.7;
    cursor: wait;
  }

  .status {
    margin: 0;
    min-height: 22px;
    font-size: 14px;
    line-height: 1.5;
    color: #334155;
  }

  .status[data-state="success"] {
    color: #166534;
  }

  .status[data-state="error"] {
    color: #b91c1c;
  }

  .success-message {
    margin: 0;
    color: #0f172a;
    font-size: 16px;
    line-height: 1.6;
  }

  @media (max-width: 700px) {
    .panel {
      padding: 16px;
    }

    .grid {
      grid-template-columns: 1fr;
    }
  }

`

const html = `
  <dialog class="dialog">
    <div class="panel">
      <button class="close" type="button" aria-label="Close">×</button>
      <div class="header">
        <slot name="title"></slot>
        <slot name="intro"></slot>
      </div>

      <form class="form" method="dialog">
        <div class="grid">
          <label class="field">
            <span class="label"><slot name="label-last-name"></slot></span>
            <input type="text" name="lastName" autocomplete="family-name" required>
          </label>

          <label class="field">
            <span class="label"><slot name="label-first-name"></slot></span>
            <input type="text" name="firstName" autocomplete="given-name" required>
          </label>

          <label class="field full">
            <span class="label"><slot name="label-email"></slot></span>
            <input type="email" name="email" autocomplete="email" required>
          </label>

          <label class="field full">
            <span class="label"><slot name="label-message"></slot></span>
            <textarea name="message" required></textarea>
          </label>
        </div>

        <button class="submit" type="submit">
          <slot name="submit-label"></slot>
        </button>

        <p class="status" aria-live="polite" hidden></p>
      </form>
    </div>
  </dialog>

  <dialog class="success-dialog">
    <div class="panel success-panel">
      <p class="success-message"></p>
      <button class="success-button" type="button">OK</button>
    </div>
  </dialog>
`

class ZyllioContactModal extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = '<style>' + css + '</style>' + html
    this.locale = getContactFormLocale(document.documentElement)
    this.messages = getContactFormMessages(this.locale)
    this.successButtonLabel = this.locale === 'fr' ? 'Fermer' : 'Close'
    this.boundOpen = (event) => {
      event.preventDefault()
      this.open()
    }
  }

  connectedCallback() {
    const dialog = this.shadowRoot.querySelector('.dialog')
    const form = this.shadowRoot.querySelector('form')
    const lastNameInput = this.shadowRoot.querySelector('input[name="lastName"]')
    const firstNameInput = this.shadowRoot.querySelector('input[name="firstName"]')
    const emailInput = this.shadowRoot.querySelector('input[name="email"]')
    const messageInput = this.shadowRoot.querySelector('textarea[name="message"]')
    const submitButton = this.shadowRoot.querySelector('.submit')
    const successDialog = this.shadowRoot.querySelector('.success-dialog')
    const successButton = this.shadowRoot.querySelector('.success-button')

    lastNameInput.placeholder = this.getAttribute('placeholder-last-name') || ''
    firstNameInput.placeholder = this.getAttribute('placeholder-first-name') || ''
    emailInput.placeholder = this.getAttribute('placeholder-email') || ''
    this.initialMessage = this.getAttribute('initial-message') || ''
    messageInput.placeholder = this.getAttribute('placeholder-message') || ''
    messageInput.value = this.initialMessage
    successButton.textContent = this.successButtonLabel

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close()
      }
    })

    if (successDialog) {
      this._successDialogBackdropHandler = (event) => {
        if (event.target === successDialog) {
          successDialog.close()
        }
      }
      successDialog.addEventListener('click', this._successDialogBackdropHandler)
    }

    const closeButton = this.shadowRoot.querySelector('.close')
    if (closeButton) {
      closeButton.setAttribute('aria-label', this.getAttribute('close-label') || 'Close')
      this._closeHandler = () => dialog.close()
      closeButton.addEventListener('click', this._closeHandler)
    }

    if (successButton) {
      this._successCloseHandler = () => this.closeSuccessDialog()
      successButton.addEventListener('click', this._successCloseHandler)
    }

    const triggerSelector = this.getAttribute('open-trigger')
    this.triggerElements = triggerSelector ? Array.from(document.querySelectorAll(triggerSelector)) : []
    this.triggerElements.forEach((element) => {
      element.addEventListener('click', this.boundOpen)
    })

    form.addEventListener('submit', async (event) => {
      event.preventDefault()

      if (submitButton.disabled) {
        return
      }

      const payload = Object.fromEntries(new FormData(form).entries())

      this.setStatus('info', this.messages.sending)
      submitButton.disabled = true

      try {
        const submittedPayload = await submitContactPayload(payload, 'contact', this.locale)
        form.reset()
        messageInput.value = this.initialMessage
        this.setStatus()
        dialog.close()
        this.openSuccessDialog(this.messages.success)

        this.dispatchEvent(new CustomEvent('zyllio-contact-form-submit', {
          detail: submittedPayload,
          bubbles: true,
          composed: true
        }))
      } catch (error) {
        this.setStatus('error', error.message || this.messages.networkError)
      } finally {
        submitButton.disabled = false
      }
    })
  }

  disconnectedCallback() {
    if (this.triggerElements) {
      this.triggerElements.forEach((element) => {
        element.removeEventListener('click', this.boundOpen)
      })
    }
    const closeButton = this.shadowRoot.querySelector('.close')
    if (closeButton && this._closeHandler) {
      closeButton.removeEventListener('click', this._closeHandler)
      this._closeHandler = null
    }
    const successDialog = this.shadowRoot.querySelector('.success-dialog')
    if (successDialog && this._successDialogBackdropHandler) {
      successDialog.removeEventListener('click', this._successDialogBackdropHandler)
      this._successDialogBackdropHandler = null
    }
    const successButton = this.shadowRoot.querySelector('.success-button')
    if (successButton && this._successCloseHandler) {
      successButton.removeEventListener('click', this._successCloseHandler)
      this._successCloseHandler = null
    }
  }

  open() {
    const dialog = this.shadowRoot.querySelector('.dialog')
    const firstInput = this.shadowRoot.querySelector('input[name="lastName"]')

    if (!dialog.open) {
      dialog.showModal()
    }

    this.setStatus()
    firstInput.focus()
  }

  setStatus(state, message = '') {
    const status = this.shadowRoot.querySelector('.status')

    if (!status) {
      return
    }

    if (!message) {
      status.hidden = true
      status.textContent = ''
      delete status.dataset.state
      return
    }

    status.hidden = false
    status.dataset.state = state
    status.textContent = message
  }

  openSuccessDialog(message) {
    const successDialog = this.shadowRoot.querySelector('.success-dialog')
    const successMessage = this.shadowRoot.querySelector('.success-message')

    if (!successDialog || !successMessage) {
      return
    }

    successMessage.textContent = message

    if (!successDialog.open) {
      successDialog.showModal()
    }
  }

  closeSuccessDialog() {
    const successDialog = this.shadowRoot.querySelector('.success-dialog')

    if (successDialog && successDialog.open) {
      successDialog.close()
    }
  }
}

customElements.define('zyllio-contact-modal', ZyllioContactModal)
