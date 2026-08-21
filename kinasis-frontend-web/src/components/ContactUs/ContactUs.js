import emailjs from '@emailjs/browser'
import { ref, computed } from 'vue'

const PUBLIC_API_KEY = import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID

async function sendEmail(formData) {
	try {
		if (!PUBLIC_API_KEY || !SERVICE_ID || !TEMPLATE_ID) {
			console.error('EmailJS env vars missing or misconfigured', {
				PUBLIC_API_KEY,
				SERVICE_ID,
				TEMPLATE_ID
			})
			return { ok: false, message: 'EmailJS environment variables missing or misconfigured.', error: null }
		}

		const templateParams = {
			from_name: formData.name,
			from_email: formData.email,
			phone: formData.phone || 'No proporcionado',
			company: formData.company || 'No especificada',
			message: formData.message
		}

		const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_API_KEY)
		return { ok: true, message: 'Email enviado correctamente', result }
	} catch (error) {
		console.error('emailjs.send error', error)
		return { ok: false, message: String(error?.text || error?.message || error), error }
	}
}

export async function handleContactForm(formData) {
	const name = (formData.name || '').trim()
	const email = (formData.email || '').trim()
	const phoneRaw = (formData.phone || '').trim()
	const message = (formData.message || '').trim()

	const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/
	if (!name) 
		return { success: false, message: 'Por favor ingresa tu nombre.', clearForm: false }
	if (name.length < 2) 
		return { success: false, message: 'El nombre es muy corto.', clearForm: false }
	if (name.length > 40) 
		return { success: false, message: 'El nombre no puede tener más de 40 caracteres.', clearForm: false }
	if (!nameRegex.test(name)) 
		return { success: false, message: 'El nombre contiene caracteres inválidos.', clearForm: false }

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!email) 
		return { success: false, message: 'Por favor ingresa tu email.', clearForm: false }
	if (!emailRegex.test(email)) 
		return { success: false, message: 'Por favor ingresa un email válido.', clearForm: false }

	const phoneDigits = String(phoneRaw).replace(/\D/g, '')
	if (phoneDigits) {
		const phoneRegex = /^\d{7,15}$/
		if (!phoneRegex.test(phoneDigits)) 
			return { success: false, message: 'El teléfono solo debe contener números (7-15 dígitos).', clearForm: false }
	}

	if (!message) 
		return { success: false, message: 'Por favor escribe un mensaje.', clearForm: false }

	const payload = {
		...formData,
		name,
		email,
		phone: phoneDigits || '',
		message
	}

	const result = await sendEmail(payload)
	if (result.ok) 
		return { success: true, message: 'Mensaje enviado correctamente. Te responderemos pronto 👍', clearForm: true }
	return { success: false, message: result.message || 'Error al enviar el mensaje', clearForm: false }
}

export function sanitizeName(name = '') {
	return String(name).replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]+/g, '').slice(0, 40)
}

export function sanitizePhone(phone = '') {
	return String(phone).replace(/\D/g, '').slice(0, 15)
}

export function validateName(name = '') {
	const v = String(name).trim()
	if (!v) 
		return 'Por favor ingresa tu nombre.'
	if (v.length < 2) 
		return 'El nombre es muy corto.'
	if (v.length > 40) 
		return 'El nombre no puede tener más de 40 caracteres.'
	const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/
	if (!nameRegex.test(v)) 
		return 'El nombre contiene caracteres inválidos.'
	return ''
}

export function validateEmail(email = '') {
	const v = String(email).trim()
	if (!v) 
		return 'Por favor ingresa tu email.'
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(v)) 
		return 'Por favor ingresa un email válido.'
	return ''
}

export function validatePhone(phone = '') {
	const digits = String(phone || '').replace(/\D/g, '')
	if (!digits) 
		return ''
	if (digits.length < 7 || digits.length > 15) 
		return 'El teléfono solo debe contener números (7-15 dígitos).'
	return ''
}

export function validateMessage(message = '') {
	const v = String(message).trim()
	if (!v) 
		return 'Por favor escribe un mensaje.'
	return ''
}

export function validateAll(form = {}) {
	const errors = {
		name: validateName(form.name),
		email: validateEmail(form.email),
		phone: validatePhone(form.phone),
		message: validateMessage(form.message)
	}
	const ok = !errors.name && !errors.email && !errors.phone && !errors.message
	return { ok, errors }
}

export function useContact() {
	const form = ref({ name: '', email: '', phone: '', company: '', message: '' })
	const errors = ref({ name: '', email: '', phone: '', message: '' })
	const sending = ref(false)
	const tempStatus = ref('')
	const tempStatusClass = ref('')
	const showModal = ref(false)
	const modalType = ref('')
	const modalTitle = ref('')
	const modalMessage = ref('')

	const buttonText = computed(() => (sending.value ? 'Enviando mensaje...' : 'Enviar Proyecto'))

	function showSuccessModal() {
		modalType.value = 'success'
		modalTitle.value = '¡Éxito!'
		modalMessage.value = 'Mensaje enviado correctamente. Te responderemos pronto 👍'
		showModal.value = true
	}

	function showErrorModal(message) {
		modalType.value = 'error'
		modalTitle.value = 'Error'
		modalMessage.value = message || 'Error inesperado. Por favor intenta de nuevo.'
		showModal.value = true
	}

	function closeModal() {
		showModal.value = false
		setTimeout(() => {
			modalType.value = ''
			modalTitle.value = ''
			modalMessage.value = ''
		}, 300)
	}

	function showTempStatus(message, type = 'info') {
		tempStatus.value = message
		tempStatusClass.value = type
		setTimeout(() => {
			tempStatus.value = ''
			tempStatusClass.value = ''
		}, 3000)
	}

	function clearErrors() {
		errors.value = { name: '', email: '', phone: '', message: '' }
	}

	function validateNameField() {
		const err = validateName(form.value.name)
		errors.value.name = err
		return !err
	}

	function validateEmailField() {
		const err = validateEmail(form.value.email)
		errors.value.email = err
		return !err
	}

	function validatePhoneField() {
		const err = validatePhone(form.value.phone)
		errors.value.phone = err
		return !err
	}

	function validateMessageField() {
		const err = validateMessage(form.value.message)
		errors.value.message = err
		return !err
	}

	function validateAllFields() {
		const result = validateAll(form.value)
		errors.value = result.errors
		return result.ok
	}

	function sanitizeNameInput() {
		form.value.name = sanitizeName(form.value.name)
		validateNameField()
	}

	function sanitizePhoneInput() {
		form.value.phone = sanitizePhone(form.value.phone)
		validatePhoneField()
	}

	async function handleSubmit() {
		sending.value = true
		showTempStatus('Enviando mensaje...', 'sending')

		try {
			clearErrors()
			const validationOk = validateAllFields()
			if (!validationOk) {
				for (const key of ['name', 'email', 'phone', 'message']) {
					if (errors.value[key]) {
						showErrorModal(errors.value[key])
						sending.value = false
						return
					}
				}
			}

			const response = await handleContactForm(form.value)
			tempStatus.value = ''

			if (response.success) {
				showSuccessModal()
				if (response.clearForm) form.value = { name: '', email: '', phone: '', company: '', message: '' }
			} else {
				showErrorModal(response.message)
			}
		} catch (error) {
			console.error('💥 Error inesperado en handleSubmit:', error)
			showErrorModal('Error inesperado. Por favor intenta de nuevo.')
		} finally {
			sending.value = false
		}
	}

	return {
		form,
		errors,
		sending,
		tempStatus,
		tempStatusClass,
		showModal,
		modalType,
		modalTitle,
		modalMessage,
		buttonText,
		sanitizeNameInput,
		sanitizePhoneInput,
		validateEmailField,
		validateMessageField,
		handleSubmit,
		closeModal,
		validateAllFields
	}
}

