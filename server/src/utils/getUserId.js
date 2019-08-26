const jwt = require('jsonwebtoken')

const getUserId = (request) => {
   // get header
   const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization
   // get user Id
   if (header) {
      // get token, decoded, return user id
      const token = header.replace('Bearer ', '')
      try {
         const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
         return decodedPayload.userId
      } catch (error) {
         // jwt not verify
         return null
      }
   }
   return null
}

module.exports = getUserId