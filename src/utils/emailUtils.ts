import emailjs from '@emailjs/browser'

export const sendVerificationEmail = async (email: string) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const templateParams = {
    to_email: email,
    verification_code: verificationCode,
  }

  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

    console.log('Email sent successfully:', result.status, result.text)
    sessionStorage.setItem('userEmail', email)
    sessionStorage.setItem('verificationCode', verificationCode)

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
