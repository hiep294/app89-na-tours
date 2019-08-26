const userMutation = require('./userMutation')
const orderMutation = require('./orderMutation')
const feedbackMutation = require('./feedbackMutation')

const Mutation = {
   ...userMutation,
   ...orderMutation,
   ...feedbackMutation
}

module.exports = Mutation