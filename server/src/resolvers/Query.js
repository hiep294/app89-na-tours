const User = require('../models/User')
const setOpArgsForOrderPagInfo = require('../utils/setOpArgsForOrderPagInfo')

const Query = {
   me(parent, args, { userId }, info) {
      if (!userId) throw new Error('Authentication required')
      // check exist
      const user = User.findOne({ _id: userId })
         .then(user => user)
      if (!user) throw new Error('User not found')
      //
      return user
   },
   users(parent, args, ctx, info) {
      return User.find().sort({ createdAt: -1 })
   },
   async orders(parent, args, { userId }, info) {
      if (!userId) throw new Error('Authentication required')
      const { page, numberOfItemsPerPage, where } = args.pageInfo
      const opArgs = setOpArgsForOrderPagInfo(where)
      return {
         page, numberOfItemsPerPage, opArgs, args
      }
   }
}

module.exports = Query