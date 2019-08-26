import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Router from "next/router";
import login from '../../api/login'

export default function index() {

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState("")

   async function onSubmit() {
      if (!email) {
         setError("Email required!")
         return
      }
      if (!password) {
         setError("Password required")
         return
      }
      document.getElementById("loading-icon-login").style.opacity = 1
      const token = await login({ email, password })
      if (token) {
         document.getElementById("loading-icon-login").style.opacity = 0
         sessionStorage.setItem('tokenAuth', token)
         Router.replace("/admin/orders")
      } else {
         document.getElementById("loading-icon-login").style.opacity = 0
         setError("Access denied!")
      }
   }

   function onKeyUp(e) {
      if (e.keyCode === 13) {
         onSubmit()
      }
   }

   return (
      <div style={{ background: "url('/static/img/wall-login.jpg') center", height: '100vh' }}>
         <Head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
            <link rel="shortcut icon" type="image/png" href="/static/img/favicon.png" />
         </Head>
         <div className="container pt-4" style={{
            maxWidth: "400px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '80vh'
         }}>
            <div className="input-group mb-2">
               <input type="text" className="form-control" id="basic-url2"
                  aria-describedby="basic-addon3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="input-group mb-2">
               <input type="password"
                  className="form-control" id="basic-url"
                  aria-describedby="basic-addon3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={onKeyUp}
               />
            </div>
            <button type="button"
               className="btn btn-primary"
               style={{ fontSize: '1.2rem' }}
               onClick={onSubmit}
            >
               Log in
               <span id="loading-icon-login" className="ml-2 mb-2" style={{ marginTop: '0.15rem', color: '#fff', opacity: '0', transition: 'all 0.3s', position: "absolute" }}>
                  <i className="fas fa-spinner fa-lg fa-pulse" />
               </span>
            </button>
            {error ? (
               <span
                  className="pl-1"
                  style={{ position: 'absolute', marginTop: "5rem", color: "white" }}
               >* {error}</span>
            ) : null}

         </div>
      </div>
   )
}

index.getInitialProps = async ({ res }) => {
   // if (typeof window !== 'undefined') {
   //    Router.push('/admin/login')
   // } else {
   //    res.redirect('/admin/login')
   // }
   // IF HAS 
   if (typeof window !== 'undefined') {
      // check has token or not, if has, redirect to orders
   }
}