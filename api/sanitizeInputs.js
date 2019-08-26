
export function sanitizeNumber(numbString) {
   const numb = parseFloat(numbString)
   return isNaN(numb) ? numbString : numb
}

export function sanitizeString(str, key) {
   str = str.replace(/"/g, '')
   str = str.trim()
   if (key === 'total') str = sanitizeNumber(str)
   return str
}
/**
 * 
 * @param {*} dataObject {name: 'Hi"ep', address: 'Hanoi'}
 * @return: `{name: "Hiep", address: "Hanoi"}`
 */
export default function sanitizeInputs(dataObject) {
   let parts = []
   for (var key in dataObject) {
      // sanitize string
      if (typeof dataObject[key] === 'string') {
         dataObject[key] = sanitizeString(dataObject[key], key)
      }
      const value = (typeof dataObject[key] === 'string') ?
         `"${dataObject[key]}"` : dataObject[key]
      parts.push('' + key + ':' + value)
   }
   return `{${parts.join(',')}}`
}
