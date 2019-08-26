import { useState } from 'react'
import orderConn from './conn'

export default function getOrderProvider() {
   const [typeTour, setTypeTour] = useState("")
   const [total, setTotal] = useState("")

   return {
      typeTour,
      setTypeTour,
      setTotal,
      createOrder: async (data, dispatch) => {
         data.typeTour = typeTour
         data.total = total
         // console.log(data)
         const res = await orderConn.createOrder(data)
         // handle success
         if (res.data) {
            // to pop-up
            window.location.replace("/#popup")
            document.getElementById("loading-icon-create-order").style.opacity = 0
            // set initial state
            dispatch({ type: 'RESET_STATE' })
            setTypeTour("")
         }
         // handle error
         if (res.errors) {
            // console.log(res)
            const error = JSON.parse(res.errors[0].message)
            dispatch({ type: 'SET_ERROR', payload: error })
         }
         // console.log(res)
      }
   }
}

