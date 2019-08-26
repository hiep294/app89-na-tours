import url from './url'
import fetch from 'cross-fetch'

const loginOperation = (data = {}) => {
   const { email, password } = data
   return (
      `mutation{
         login(data: {
            email: "${email}",
            password: "${password}"
         }){
            token
         }
      }`
   )
}

const login = async (data) => {
   const res = await fetch(url, {
      method: 'post',
      headers: {
         'Content-Type': 'application/graphql'
      },
      body: loginOperation(data)
   })
      .then(res => res.json())
      .then(data => data)
      .catch(err => err)
   // console.log(res.data.login.token)
   if (res.data && res.data.login.token) {
      return res.data.login.token
   }

   return null
}

export default login