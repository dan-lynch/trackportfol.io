export function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n) && parseFloat(n) >= 0 && n !== '-'
}
