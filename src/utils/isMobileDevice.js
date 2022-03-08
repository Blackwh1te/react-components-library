/**
 * Проверка на мобильное устройство
 * @return Boolean
 */
export const isMobileDevice = () => {
  const ua = navigator.userAgent

  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return true
  } else {
    return false
  }
}
