import React from 'react'
import Head from 'next/head'
import fetch from 'cross-fetch'
import url from '../api/url'

const Confirmation = (props) => {
   return props.invalidUrl || !props.success ? <div></div> : (
      <>
         <Head>
            <link rel="stylesheet" href="/static/css/style.css" />
            <link rel="stylesheet" href="/static/css/style2.css" />
         </Head>
         <div className="popup" id="popup" style={{ opacity: '1', visibility: 'visible' }}>
            <div className="popup__content" style={{ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }}>
               <div className="popup__left">
                  <img src="/static/img/nat-8.jpg" alt="Tour photo" className="popup__img" />
                  <img src="/static/img/nat-9.jpg" alt="Tour photo" className="popup__img" />
               </div>
               <div className="popup__right">
                  <a href="/" className="popup__close">×</a>
                  <h2 className="heading-secondary u-margin-bottom-small">Confirm successfully!</h2>
                  <h3 className="heading-tertiary u-margin-bottom-small">
                     We will contact to you through the phone number! Hope you enjoy the next trip
                  </h3>

                  <p style={{ color: 'red' }}>
                     * This is an app demo, and it is NOT REAL
               </p>
                  <a href="/" className="btn btn--green">CLOSE</a>
               </div>
            </div>
         </div>
      </>
   )
}

Confirmation.getInitialProps = async ({ query }) => {
   const token = query.token // RELATIVELY
   // console.log(token)
   if (token) {
      const props = await fetch(`${url}/confirmation`, {
         method: 'post',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ token })
      })
         .then(res => res.json())
         .then(data => data)
         .catch(err => err)
      // console.log(props)
      return props
   }
   const props = { invalidUrl: true }
   return props
}

export default Confirmation