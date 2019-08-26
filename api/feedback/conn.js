import url from '../url'
import { createFeedbackGQL } from './operations'
import fetch from 'cross-fetch'

const feedbackConn = {
   createFeedback: async (data) => {
      const res = await fetch(url, {
         method: 'post',
         headers: {
            'Content-Type': 'application/graphql'
         },
         body: createFeedbackGQL(data)
      })
         .then(res => res.json())
         .then(data => data)
         .catch(error => console.log(error))
      return res
   }
}

export default feedbackConn