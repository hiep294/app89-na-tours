import sanitizeInputs from '../sanitizeInputs'

// export const WAITED_ORDER = 'Waiting'
export const orderStatus = {
   waiting: 'Waiting',// => default, waiting for confirm
   confirmed: 'Confirmed',
   delivering: 'Delivering',
   ok: 'Ok',
   canceled: 'Canceled'
}


/**
 * 
 * @param {} data : {name: "Nguyen Quang Hiep"
      email: "hiep@gmail.com"
      phone: "096265310"
      address: "12 Street"}
 */
export const createOrderGQL = (data) => {
   const sanitizedData = sanitizeInputs(data)
   return (
      `mutation{
         createOrder(
            data: ${sanitizedData}
         ){
            _id
            status
            email
            phone
            address
            name
         }
      }`
   )
}

export const fetchOrdersGQL = (
   page = 1,
   days = 0, //all time
   typeTour = "",
   status = "",
   orderBy = "createdAt_DESC",
   keyword = "",
) => `  
   query{
      orders(
         pageInfo: {
            page: ${page}
            numberOfItemsPerPage: 10
            where: {
               days: ${days},
               typeTour: "${typeTour}",
               status: "${status}"
               or: {
                  _id: "${keyword}"
                  name: "${keyword}"
                  email: "${keyword}"
                  phone: "${keyword}"
                  address: "${keyword}"
               }
            },
            orderBy: ${orderBy}
         }         
      ){
         totalAmount
         numberOfRecords
         orders{
            _id
            status
            name
            email
            phone
            address
            typeTour
            total
            createdAt
            updatedAt
         }
      }
   }
`

export const updateOrderGQL = (
   _id,
   data,
   page = 1,
   days = 0, //all time
   typeTour = "",
   status = "",
   orderBy = "createdAt_DESC",
   keyword = ""
) => {
   const sanitizedData = sanitizeInputs(data)
   return (
      `mutation{
         updateOrder(
            _id: "${_id}"
            data: ${sanitizedData}
            pageInfo: {
               page: ${page}
               numberOfItemsPerPage: 10
               where: {
                  days: ${days},
                  typeTour: "${typeTour}",
                  status: "${status}"
                  or: {
                     _id: "${keyword}"
                     name: "${keyword}"
                     email: "${keyword}"
                     phone: "${keyword}"
                     address: "${keyword}"
                  }
               }
               orderBy: ${orderBy}
            }   
         ){
            totalAmount
            numberOfRecords
            orders{
               _id
               status
               name
               email
               phone
               address
               typeTour
               total
               createdAt
               updatedAt
            }
         }
      }`
   )
}
