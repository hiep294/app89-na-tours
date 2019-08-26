import React from 'react'
import Link from 'next/link'
import { ORDERS, FEEDBACK } from './pageTypes'

export default function Header(props) {
   function onLogout() {
      sessionStorage.removeItem('tokenAuth')
      window.location.replace('/admin')
   }

   // useEffect(() => {
   //    return () => {
   //       sessionStorage.removeItem('tokenAuth')
   //    }
   // })

   return (
      <>
         <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
               <Link href="/admin/orders">
                  <a
                     className={`nav-link ${props.name === ORDERS ? 'active' : null}`}
                  >Orders</a>
               </Link>

            </li>
            <li className="nav-item">
               <Link href="/admin/feedback">
                  <a
                     className={`nav-link ${props.name === FEEDBACK ? 'active' : null}`}
                  >Feedback</a>
               </Link>
            </li>
            <li className="nav-item">
               <a className="nav-link" href="#" onClick={onLogout}>Logout</a>
            </li>
         </ul>

      </>
   )
}
