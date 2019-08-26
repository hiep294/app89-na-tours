const { Schema, model } = require('mongoose')

const feedbackSchema = new Schema({
   name: String,
   text: {
      type: String,
      required: [true, 'Sr, feedback required!']
   }
})

const Feedback = model('Feedback', feedbackSchema)
module.exports = Feedback