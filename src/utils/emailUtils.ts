import emailjs from '@emailjs/browser'

export const sendVerificationEmail = async (email: string) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()

  const templateParams = {
    to_email: email,
    verification_code: verificationCode,
  }

  try {
    const result = await emailjs.send(
      'service_1ymb1aa',
      'template_ev3e8n5',
      templateParams,
      '2RMkaE_EEWVbQDFt0',
    )

    console.log('Email sent successfully:', result.status, result.text)
    sessionStorage.setItem('userEmail', email)
    sessionStorage.setItem('verificationCode', verificationCode)

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
