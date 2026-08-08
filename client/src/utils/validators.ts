export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

export const isValidIndianPhone = (value: string): boolean =>
  /^[6-9]\d{9}$/.test(value.replace(/\D/g, '').slice(-10))

export const isNonEmpty = (value: string): boolean => value.trim().length > 0

export const isValidImageFile = (file: File): boolean => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  return allowed.includes(file.type) && file.size <= 8 * 1024 * 1024
}
