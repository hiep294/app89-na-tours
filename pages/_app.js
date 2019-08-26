import React from 'react'
import App, { Container } from 'next/app'
import AppProvider from '../AppProvider'
import Head from 'next/head'

class MyApp extends App {
   static async getInitialProps({ Component, ctx }) {
      let pageProps = {}

      if (Component.getInitialProps) {
         pageProps = await Component.getInitialProps(ctx)
      }

      return { pageProps }
   }

   render() {
      const { Component, pageProps } = this.props

      return (
         <Container>
            <Head>
               <link rel="stylesheet" href="/static/fontas/css/all.min.css" />
               <link rel="stylesheet" href="/static/css/admin/style.css" />
               <title>Natural tour || App 89</title>
            </Head>
            <AppProvider>
               <Component {...pageProps} />
            </AppProvider>
         </Container>
      )
   }
}

export default MyApp