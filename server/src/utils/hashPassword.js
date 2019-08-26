const bcrypt = require('bcrypt')

async function hashPassword(password) {
   // check password
   if (password.length < 8) throw new Error(JSON.stringify({
      password: 'Password must be 8 characters or longer'
   }))
   const hash = await bcrypt.hash(password, 10)
   return hash
}

module.exports = hashPassword