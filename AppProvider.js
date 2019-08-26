import React from 'react'
import getOrderProvider from './api/order/getProvider'

const AppContext = React.createContext()

export const AppConsumer = AppContext.Consumer

export default function AppProvider(props) {
   // ...getOrderProvider()

   const value = {
      ...getOrderProvider()
   }
   return (
      <AppContext.Provider value={value}>
         {props.children}
      </AppContext.Provider>
   )
}
