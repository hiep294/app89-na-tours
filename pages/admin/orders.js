import React, { useReducer } from 'react'
import Layout from '../../components/admin/layout'
import { AppConsumer } from '../../AppProvider'
import OrderItem from '../../components/admin/OrderItem'
import Pagination from '../../components/admin/Pagination'

import orderConn from '../../api/order/conn'
import { orderStatus } from '../../api/order/operations'
import { ORDERS } from '../../components/admin/layout/pageTypes'
import { SEA_TOUR, FOREST_TOUR, SNOW_TOUR } from '../../components/Form'

const reducer = (state, action) => {
   switch (action.type) {
      case 'SET_ORDERS':
         return { ...state, ...action.payload }
      case 'CHOOSE_ORDER':
         return { ...state, chosenOrder: action.payload }
      case 'CHANGE_PAGE':
         return { ...state, page: action.payload }
      case 'CHANGE_DAYS_FILTER':
         return { ...state, days: action.payload }
      case 'CHANGE_TYPE_TOUR_FILTER':
         return { ...state, typeTour: action.payload }
      case 'CHANGE_STATUS_FILTER':
         return { ...state, status: action.payload }
      case 'CHANGE_KEYWORD':
         return { ...state, keyword: action.payload }
      case 'CHANGE_ORDER_BY':
         return { ...state, orderBy: action.payload }
      default: throw new Error()
   }
}

function Orders({ value, props }) {
   const { orders: initialOrders, numberOfRecords: initialNumberOfRecords, totalAmount: initialTotalAmount } = props

   const [state, dispatch] = useReducer(reducer, {
      orders: initialOrders,
      numberOfRecords: initialNumberOfRecords,
      totalAmount: initialTotalAmount,
      chosenOrder: {},//
      page: 1,
      days: 0,
      typeTour: '',
      status: '',
      orderBy: 'createdAt_DESC',
      keyword: '',
   })

   async function onFilter(e) {
      const { days, typeTour, status, orderBy, keyword } = state
      // styling
      document.getElementById('loading-icon').style.opacity = '1'
      document.getElementById('order-table-body').style.opacity = '0.3'
      // db connect
      const temp = await orderConn.fetchOrders(1, days, typeTour, status, orderBy, keyword)
      dispatch({
         type: 'SET_ORDERS',
         payload: {
            page: 1,
            totalAmount: temp.totalAmount,
            orders: temp.orders,
            numberOfRecords: temp.numberOfRecords
         }
      })
      // styling
      document.getElementById('order-table-body').style.opacity = '1'
      document.getElementById('loading-icon').style.opacity = '0'
   }

   function onKeyUp(e) {
      if (e.keyCode === 13) onFilter()
   }

   return (
      <Layout name={ORDERS}>
         <h1 className="ml-1 mb-2">Order Report</h1>
         <div className={`mt-1 bl-294 pb-1`} style={{ display: 'flex' }}>
            <select id="days-filter" className={`ml-1 custom-select w-20 ${parseInt(state.days) !== 0 ? 'blur-294' : null}`}
               onChange={(e) => dispatch({ type: 'CHANGE_DAYS_FILTER', payload: e.target.value })}
               value={state.days}
            >
               <option value="0">All the time</option>
               <option value="7">in 1 week</option>
               <option value="31">in 1 month</option>
               <option value="365">in 1 year</option>
            </select>

            <select id="tour-filter" className={`ml-2 custom-select w-20 ${state.typeTour ? 'blur-294' : null}`}
               onChange={(e) => dispatch({ type: 'CHANGE_TYPE_TOUR_FILTER', payload: e.target.value })}
               value={state.typeTour}
            >
               <option value="">All Types Of Tour </option>
               <option value={SEA_TOUR.name}>{SEA_TOUR.name}</option>
               <option value={FOREST_TOUR.name}>{FOREST_TOUR.name}</option>
               <option value={SNOW_TOUR.name}>{SNOW_TOUR.name}</option>
            </select>

            <select id="status-filter"
               className={`ml-2 custom-select w-20 ${state.status ? 'blur-294' : null}`}
               onChange={(e) => dispatch({ type: 'CHANGE_STATUS_FILTER', payload: e.target.value })}
               value={state.status}
            >
               <option value="">All Status</option>
               <option value={orderStatus.waiting}>Waiting...</option>
               <option value={orderStatus.confirmed}>Confimed</option>
               <option value={orderStatus.delivering}>Delivering</option>
               <option value={orderStatus.ok}>Ok</option>
               <option value={orderStatus.canceled}>Canceled</option>
            </select>

            <select id="order-by"
               className={`ml-2 custom-select w-20 ${state.orderBy !== 'createdAt_DESC' ? 'blur-294' : null}`}
               onChange={(e) => dispatch({ type: 'CHANGE_ORDER_BY', payload: e.target.value })}
               value={state.orderBy}
            >
               <option value="createdAt_DESC">DESC Created at</option>
               <option value="updatedAt_DESC">DESC Updated at</option>
            </select>

            <div className="input-group ml-2 w-20 ">
               <input type="text"
                  className="form-control"
                  placeholder="...id, name, phone, email, address"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  value={state.keyword}
                  onChange={(e) => dispatch({ type: 'CHANGE_KEYWORD', payload: e.target.value })}
                  onKeyUp={onKeyUp}
               />
               <div className="input-group-append">
                  <button className="btn btn-outline-secondary"
                     type="button" id="button-addon2"
                     onClick={onFilter}
                  >
                     <img src="/static/img/search.png" alt="" width="21px" />
                  </button>
               </div>
            </div>

         </div>
         <div
            className="bl-294 pb-1 pl-2 pt-1"
            style={{ borderBottom: '1px solid #e5e5e5', width: '100%' }}
            title=""
         >
            Total Amount: ${state.totalAmount}{` `}
            <span id="filter-info" style={{ color: '#999' }}></span><br />
            Number of Orders: {state.numberOfRecords}
         </div>

         <div style={{
            position: 'sticky',
            top: '0',
            backgroundColor: '#FFFFFF',
            width: '100%',
            borderBottom: '3px solid #e5e5e5'
         }} className="bl-294 pt-1 pl-2 mb-2">
            <p className="mb-1">
               Order Id:{' '}
               <i style={{ fontSize: '0.9rem' }}>
                  {state.chosenOrder._id || 'of the chosen order'}
               </i>
            </p>
            <p className="mb-1">
               Address:{' '}
               <i style={{ fontSize: '0.9rem' }}>
                  {state.chosenOrder.address || 'of the chosen order'}
               </i>
            </p>
         </div>

         <div className="table-responsive" style={{}}>
            <table className="table table-bordered" style={{ cursor: 'pointer', width: '100%' }}>
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Status</th>
                     <th scope="col">Type_Of_Tour</th>
                     <th scope="col">Total</th>
                     <th scope="col">Name</th>
                     <th scope="col">Phone</th>
                     <th scope="col">Email</th>
                     <th scope="col">Created_At</th>
                     <th scope="col">Updated_At</th>
                  </tr>
               </thead>
               <tbody id="order-table-body">
                  {state.orders.map((order, index) => (
                     <OrderItem order={order} key={index} index={index}
                        state={state}
                        dispatch={dispatch}
                        chosenOrder={state.chosenOrder}
                     />
                  ))}
               </tbody>
            </table>
         </div>


         <div style={{
            position: 'sticky',
            bottom: '-0.5rem',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '3px solid rgb(222, 226, 230)'
         }}
            className="pt-2 pb-0"
         >
            <Pagination
               state={state}
               dispatch={dispatch}
            />
            <div className="pt-1">
               <img src="/static/img/favicon.png" alt="" width="30px"
                  style={{ marginBottom: '0.2rem' }}
               />{' '}
               <span style={{ color: 'rgb(1, 81, 167)', fontWeight: 'bold' }}>
                  &nbsp;Natural Tours, &copy; 2019&nbsp;
               </span>
            </div>
         </div>

      </Layout>
   )
}

const Index = (props) => {
   return <AppConsumer>
      {value => {
         return (
            <Orders value={value}
               props={props}
            />
         )
      }}
   </AppConsumer>
}

Index.getInitialProps = async ({ res, query }) => {
   // if render in server
   if (typeof window === 'undefined') {
      res.redirect('/admin')
      return
   }
   // fetch orders 
   const orders = await orderConn.fetchOrders() || {}
   // value.fetch

   return orders
}

export default Index