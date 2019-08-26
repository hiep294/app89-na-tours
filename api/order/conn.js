import url from '../url'
import { createOrderGQL, fetchOrdersGQL, updateOrderGQL } from './operations'
import fetch from 'cross-fetch';

const orderConn = {
   createOrder: async (data) => {
      // console.log(createOrderGQL(data))
      const res = await fetch(url, {
         method: 'post',
         headers: {
            'Content-Type': 'application/graphql'
         },
         body: createOrderGQL(data)
      })
         .then(res => res.json())
         .then(data => data)
         .catch(error => console.log(error))
      return res
   },
   fetchOrders: async (page, days, typeTour, status, orderBy, keyword) => {
      // this action just be done in client, so there has sessionStorage('tokenAuth') which is defined in /admin/index
      const res = await fetch(url, {
         method: 'post',
         headers: {
            'Content-Type': 'application/graphql',
            'Authorization': `Bearer ${sessionStorage.getItem('tokenAuth')}`
         },
         body: fetchOrdersGQL(page, days, typeTour, status, orderBy, keyword)
      })
         .then(res => res.json())
         .then(data => data)
         .catch(error => console.log(error))

      return res.data.orders
   },
   updateOrder: async (_id, data, handleSuccess, handleInvalid, page, days, typeTour, status, orderBy, keyword) => {
      const res = await fetch(url, {
         method: 'post',
         headers: {
            'Content-Type': 'application/graphql',
            'Authorization': `Bearer ${sessionStorage.getItem('tokenAuth')}`
         },
         body: updateOrderGQL(_id, data, page, days, typeTour, status, orderBy, keyword)
      })
         .then(res => res.json())
         .then(data => data)
         .catch(error => error)
      // console.log(res)
      if (res.data) {
         handleSuccess()
      }
      if (res.errors) handleInvalid(res.errors)
      return res.data.updateOrder
   }
}

export default orderConn