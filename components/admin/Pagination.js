import React, { useState } from 'react'
import orderConn from '../../api/order/conn'

export default function Pagination(props) {
   // console.log(orders)
   // const [left, setLeft] = useState('#')
   const { dispatch, state } = props
   // const [page, setPage] = useState(1)
   const page = state.page
   const pageTotal = Math.ceil(state.numberOfRecords / 10)

   async function fetchOrders(page) {
      // styling
      document.getElementById('loading-icon').style.opacity = '1'
      document.getElementById('order-table-body').style.opacity = '0.3'
      // db connect
      const { orders, numberOfRecords, totalAmount } = await orderConn.fetchOrders(page, state.days, state.typeTour, state.status, state.orderBy, state.keyword)
      // client handle
      dispatch({
         type: 'SET_ORDERS',
         payload: {
            orders, numberOfRecords, totalAmount
         }
      })
      // styling
      document.getElementById('order-table-body').style.opacity = '1'
      document.getElementById('loading-icon').style.opacity = '0'
      // console.log(orders)
   }

   function onNextPage(e) {
      dispatch({ type: "CHANGE_PAGE", payload: (page + 1) })
      fetchOrders(page + 1)
   }

   function onPrevPage(e) {
      if (page !== 1) {
         dispatch({ type: "CHANGE_PAGE", payload: (page - 1) })
         fetchOrders(page - 1)
      }
   }



   return (
      <>
         <nav aria-label="...">
            <ul className="pagination">
               <li className={`page-item ${page === 1 ? 'disabled' : 'cursor-294'} disable-select`}
                  onClick={onPrevPage}
               >
                  <span className="page-link">Previous</span>
               </li>

               <li className="page-item" aria-current="page" style={{ minWidth: '5rem', textAlign: 'center' }}>
                  <span className="page-link">
                     {`${page} / ${pageTotal}`}
                  </span>
               </li>

               <li className={`page-item cursor-294 disable-select`} onClick={onNextPage}>
                  <span className="page-link" href="#">Next</span>
               </li>
               <span id="loading-icon" className="ml-2" style={{ marginTop: '0.35rem', color: '#6c759d', opacity: '0', transition: 'all 0.3s' }}>
                  <i className="fas fa-spinner fa-lg fa-pulse" />
               </span>

            </ul>

         </nav>
      </>
   )
}
