const mongoose = require('mongoose')

function setOpArgsForOrderPagInfo(where) {
   let opArgs = {}
   // if exist days in 'where'
   if (where && where.days) {
      // set arange of date
      const days = where.days
      const currentDate = new Date()
      let beforeDate = new Date()
      beforeDate.setDate(beforeDate.getDate() - days)
      // add to op
      opArgs.createdAt = {
         $gte: beforeDate,
         $lte: currentDate
      }
   }

   // if exist typeTour in 'where'
   if (where && where.typeTour) {
      opArgs.typeTour = where.typeTour
   }

   // if exist status in 'where'
   if (where && where.status) {
      opArgs.status = where.status
   }

   // if exist or in 'where'
   if (where && where.or) {
      opArgs.$or = []
      if (where.or._id && mongoose.Types.ObjectId.isValid(where.or._id)) {
         opArgs.$or.push({ '_id': mongoose.Types.ObjectId(where.or._id) })
      }
      if (where.or.name) opArgs.$or.push({ 'name': new RegExp(where.or.name, 'i') })
      if (where.or.email) opArgs.$or.push({ 'email': new RegExp(where.or.email, 'i') })
      if (where.or.phone) opArgs.$or.push({ 'phone': new RegExp(where.or.phone, 'i') })
      if (where.or.address) opArgs.$or.push({ 'address': new RegExp(where.or.address, 'i') })
      // delete key $or if empty
      if (opArgs.$or.length === 0) delete opArgs.$or
   }

   return opArgs
}

module.exports = setOpArgsForOrderPagInfo