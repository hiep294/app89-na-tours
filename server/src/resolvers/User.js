const User = {
   email(parent, args, { userId }, info) {
      if (String(parent._id) === userId) return parent.email
      return null
   }
}

module.exports = User