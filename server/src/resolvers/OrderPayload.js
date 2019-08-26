const Order = require('../models/Order')

const OrderPayload = {
   async totalAmount(parent, args, ctx, info) {

      // validated in parent
      const temp = await Order.aggregate([
         { $match: parent.opArgs },
         { $group: { _id: null, totalAmount: { $sum: "$total" } } }
      ])

      let totalAmount = 0
      if (temp[0]) totalAmount = temp[0].totalAmount
      return totalAmount
   },
   async numberOfRecords(parent, args, ctx, info) {
      // validated in parent
      const numberOfRecords = await Order.countDocuments(parent.opArgs)
      return numberOfRecords
   },
   async orders(parent, args2, ctx, info) {
      // validated in parent
      const { page, numberOfItemsPerPage, opArgs, args } = parent
      let orderBy = { createdAt: -1 }
      if (args.pageInfo.orderBy && args.pageInfo.orderBy === 'updatedAt_DESC') {
         orderBy = { updatedAt: -1 }
      }
      const orders = await Order
         .find(opArgs, null, {
            skip: (page - 1) * numberOfItemsPerPage,
            limit: numberOfItemsPerPage
         })
         .sort(orderBy).lean()
      // console.log(orders)
      // console.log(orders.length)
      return orders
   },
}

module.exports = OrderPayload