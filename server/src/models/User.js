const { Schema, model } = require('mongoose')

const userSchema = new Schema({
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
      },
      unique: true
   },
   password: {
      type: String
      // required: [true, 'Password required'] <= is defined in utils/hashPassword.js
   }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

// because of original unique is not a validator
userSchema.plugin(require('mongoose-unique-validator'), { message: '{VALUE} has existed!' })

const User = model('User', userSchema)
module.exports = User