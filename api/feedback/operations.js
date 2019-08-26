import sanitizeInputs from '../sanitizeInputs'

export const createFeedbackGQL = (data) => {
   const sanitizedData = sanitizeInputs(data)
   return (
      `mutation{
         createFeedback(
            data: ${sanitizedData}
         ){
            codeLink
         }
      }`
   )
}