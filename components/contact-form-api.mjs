const CONTACTS_ENDPOINT = 'https://www.zyllio.one/api/contacts'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MESSAGES = {
  en: {
    validationError: 'Please complete all fields with a valid email address.',
    networkError: 'Your message could not be sent. Please try again.',
    sending: 'Sending...',
    success: 'Your message has been sent.'
  },
  fr: {
    validationError: 'Veuillez renseigner tous les champs avec une adresse e-mail valide.',
    networkError: 'Votre message n\'a pas pu etre envoye. Veuillez reessayer.',
    sending: 'Envoi en cours...',
    success: 'Votre message a été envoyé'
  }
}

export function getContactFormLocale(element = document.documentElement) {
  const lang = element && element.lang ? element.lang.toLowerCase() : ''
  return lang.startsWith('fr') ? 'fr' : 'en'
}

export function getContactFormMessages(locale = 'en') {
  return MESSAGES[locale] || MESSAGES.en
}

export function prepareContactPayload(fields, type) {
  return {
    nom: String(fields.lastName || fields.nom || '').trim(),
    prenom: String(fields.firstName || fields.prenom || '').trim(),
    email: String(fields.email || '').trim(),
    message: String(fields.message || '').trim(),
    type
  }
}

export function validateContactPayload(payload, locale = 'en') {
  const messages = getContactFormMessages(locale)
  const hasRequiredFields = payload.nom && payload.prenom && payload.email && payload.message
  const hasValidEmail = EMAIL_PATTERN.test(payload.email)
  const hasValidType = payload.type === 'contact' || payload.type === 'affiliation'

  if (!hasRequiredFields || !hasValidEmail || !hasValidType) {
    return messages.validationError
  }

  return null
}

export async function submitContactPayload(fields, type, locale = 'en') {
  const payload = prepareContactPayload(fields, type)
  const validationError = validateContactPayload(payload, locale)

  if (validationError) {
    const error = new Error(validationError)
    error.isValidationError = true
    throw error
  }

  const response = await fetch(CONTACTS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    const error = new Error(getContactFormMessages(locale).networkError)
    error.status = response.status
    throw error
  }

  return payload
}