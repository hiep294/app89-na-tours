import React from 'react'
import orderConn from '../../api/order/conn'

import moment from 'moment'
import { orderStatus } from '../../api/order/operations'

function OrderItem(props) {
   const { order, index, dispatch, chosenOrder, state } = props
   const status = order.status
   const page = state.page

   async function onChange(e) {
      // set UI
      const _id = order._id
      document.getElementById(_id).style.opacity = 0.3
      document.getElementById('loading-icon').style.opacity = '1'
      // connect in server
      const data = { status: e.target.value }
      const temp = await orderConn.updateOrder(_id, data, () => {
         // handle success
         const order_item = document.getElementById(_id)
         if (order_item) order_item.style.opacity = 1
         document.getElementById('loading-icon').style.opacity = '0'
      }, (errors) => {
         // handle invalid
      }, state.page, state.days, state.typeTour, state.status, state.orderBy, state.keyword)

      //update in client      
      // reload in current page      
      dispatch({
         type: 'SET_ORDERS',
         payload: {
            totalAmount: temp.totalAmount,
            orders: temp.orders,
            numberOfRecords: temp.numberOfRecords
         }
      })
   }


   return (
      <>
         <tr id={order._id} className={`
         ${chosenOrder._id === order._id ? 'chosen-order' : null}
         `} onClick={() => dispatch({ type: 'CHOOSE_ORDER', payload: order })}>

            <th scope="row">{index + 1 + (page - 1) * 10}</th>
            <td>
               <select className={`${status === 'Ok' ? 'ok' : status === 'Canceled' ? 'canceled' : null} custom-select item-status`}
                  style={{ width: '7.5rem' }}
                  onChange={onChange} value={order.status}
               >
                  <option value={orderStatus.waiting}>Waiting...</option>
                  <option value={orderStatus.confirmed}>Confirmed</option>
                  <option value={orderStatus.delivering}>Delivering</option>
                  <option value={orderStatus.ok}>Ok</option>
                  <option value={orderStatus.canceled}>Canceled</option>
               </select><br />

            </td>
            <td>{order.typeTour}</td>
            <td>{order ? `$${order.total}` : null}</td>
            <td>{order.name}</td>
            <td>{order.phone}</td>
            <td>{order.email}</td>
            <td>
               {moment(parseInt(order.createdAt)).format('DD/MM/YY HH:mm')}
            </td>
            <td>
               {moment(parseInt(order.updatedAt)).format('DD/MM/YY HH:mm')}
            </td>
         </tr>
      </>
   )
}

export default OrderItem
