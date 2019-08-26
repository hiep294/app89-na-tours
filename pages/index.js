import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'
import Popup from '../components/Popup'
// import { AppConsumer } from '../AppProvider'
// import demo from '../../demo' => can be exported

function Index() {
   return (
      <>
         <Head>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="/static/css/style.css" />
            <link rel="stylesheet" href="/static/css/style2.css" />
            <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900" rel="stylesheet" />
            <link rel="shortcut icon" type="image/png" href="/static/img/favicon.png" />
         </Head>
         <Header />
         <Main />
         <Footer />
         <Popup />
      </>
   )
}

export default Index