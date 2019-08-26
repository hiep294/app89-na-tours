module.exports = (err) => {
   const errors = err.errors
   for (var key in errors) {
      errors[key] = errors[key].message
   }
   return { errors }
}
// output = {
//    errors: {
//       field: message
//    }
// }