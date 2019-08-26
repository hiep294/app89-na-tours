const Feedback = require('../../models/Feedback')
const setReturnedErrors = require('../../utils/setReturnedErrors')

const feedbackMutation = {
   async createFeedback(parent, args, { userId }, info) {
      const feedback = await new Feedback({ ...args.data })
         .save()
         .then(feedback => feedback)
         .catch(err => setReturnedErrors(err))
      if (feedback.errors) throw new Error(JSON.stringify(feedback.errors))
      return {
         codeLink: process.env.SOURCE_CODE_LINK
      }
   }
}

module.exports = feedbackMutation