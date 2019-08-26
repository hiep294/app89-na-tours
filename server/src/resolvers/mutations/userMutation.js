const User = require('../../models/User')
const setReturnedErrors = require('../../utils/setReturnedErrors')
const hashPassword = require('../../utils/hashPassword')
const bcrypt = require('bcrypt')
const generateToken = require('../../utils/generateToken')

const userMutation = {
   async login(parent, args, ctx, info) {
      // check exist
      const user = await User.findOne({ email: args.data.email })
         .then(user => user)
      if (!user) throw new Error(JSON.stringify({ exist: false }))
      // check pass
      const isMatch = await bcrypt.compare(args.data.password, user.password)
      //
      if (!isMatch) throw new Error(JSON.stringify({ exist: false }))
      return {
         token: generateToken(user.id),
         user
      }
   },
   // async createUser(parent, args, ctx, info) {
   //    const password = await hashPassword(args.data.password)
   //    // create user
   //    const user = await new User({ ...args.data, password })
   //       .save()
   //       .then(user => user)
   //       .catch(err => {
   //          return setReturnedErrors(err)
   //       })
   //    // if user has not been created, throw errors
   //    if (user.errors) throw new Error(JSON.stringify(user.errors))
   //    // return user
   //    return {
   //       token: generateToken(user.id),
   //       user
   //    }
   // },
   // async deleteUser(parent, args, { userId }, info) {
   //    if (!userId) throw new Error('Authentication required')
   //    const user = await User.findOneAndRemove({ _id: userId })
   //       .then(res => res)
   //    // should check deleted count
   //    if (!user) throw new Error(JSON.stringify({ exist: false }))
   //    return { success: true }
   // },
   // async updateUser(parent, args, { userId }, info) {
   //    if (!userId) throw new Error('Authentication required')
   //    const opData = {
   //       ...args.data,
   //    }
   //    if (args.data.password) {// should check new password or not  
   //       opData.password = await hashPassword(args.data.password)
   //    }
   //    const user = await User.findOneAndUpdate(
   //       { _id: userId },
   //       { ...opData },
   //       { runValidators: true, context: 'query' }
   //    ).then(user => user)
   //       .catch(err => {
   //          if (err.name === 'CastError') return null
   //          return setReturnedErrors(err)
   //       })
   //    // user not exist 
   //    if (!user) throw new Error(JSON.stringify({ exist: false }))
   //    // some input wrong
   //    if (user.errors) throw new Error(JSON.stringify(user.errors))
   //    // if ok
   //    return { success: true }
   // }
}

module.exports = userMutation