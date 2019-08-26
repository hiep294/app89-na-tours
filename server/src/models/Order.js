const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
   status: {
      type: String,
      default: 'Waiting',
      required: [true, 'Status required!']
   },
   name: {
      type: String,
      required: [true, 'Name required!']
   },
   email: {
      type: String,
      validate: {
         validator: function (v) {
            return (
               /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            )
         },
         message: props => `${props.value} is not a valid email!`
      }
   },
   phone: {
      type: String,
      validate: {
         validator: function (v) {
            return (
               /(09|01[2|6|8|9])+([0-9]{8})/.test(v)
            )
         },
         message: props => `${props.value} is not a phone number!`
      }
   },
   address: {
      type: String,
      required: [true, 'Address required!']
   },
   typeTour: {
      type: String,
      required: [true, 'Type tour required!']
   },
   total: {
      type: Number,
      required: [true, 'Budget required!']
   }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const Order = model('Order', orderSchema)
module.exports = Order