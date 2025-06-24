export const validateVerificationCode = (code: string): boolean => {
  return /^\d{6}$/.test(code)
}
