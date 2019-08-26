import React from 'react'
import Head from 'next/head'
import Header from './Header'

export default function index(props) {
   return (
      <div className="container">
         <Head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
            <link rel="shortcut icon" type="image/png" href="/static/img/favicon.png" />
            <link rel="stylesheet" href="/static/css/admin/style.css" />
         </Head>
         <Header name={props.name} />
         {props.children}
      </div>
   )
}
