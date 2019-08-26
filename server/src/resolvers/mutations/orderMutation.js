const Order = require('../../models/Order')
const setReturnedErrors = require('../../utils/setReturnedErrors')
const setOpArgsForOrderPagInfo = require('../../utils/setOpArgsForOrderPagInfo')
const sendEmail = require('../../utils/sendEmail')

const orderMutation = {
   async createOrder(parent, args, { userId }, info) {
      const order = await new Order({ ...args.data })
         .save()
         .then(order => order)
         .catch(err => {
            return setReturnedErrors(err)
         })
      // like create user
      if (order.errors) throw new Error(JSON.stringify(order.errors))
      // send email
      sendEmail(order)
      return order
   },
   async updateOrder(parent, args, { userId }, info) {
      if (!userId) throw new Error('Authentication required')
      // UPDATE ORDER
      const order = await Order.findOneAndUpdate(
         { _id: args._id },
         { ...args.data },
         {
            new: true, //will return modified item
            runValidators: true
         }
      ).then(order => order)
         .catch(err => {
            if (err.name === 'CastError') return null
            return setReturnedErrors(err)
         })
      // order not exist
      if (!order) throw new Error(JSON.stringify({ exist: false }))
      // some input wrong
      if (order.errors) throw new Error(JSON.stringify(order.errors))

      // RETURN OrderPayload <!>
      const { page, numberOfItemsPerPage, where } = args.pageInfo
      const opArgs = setOpArgsForOrderPagInfo(where)
      return {
         page, numberOfItemsPerPage, opArgs, args
      }
   }
}

module.exports = orderMutation