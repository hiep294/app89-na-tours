import React from 'react'
// import Router from 'next/router'

class Error extends React.Component {
   state = {
      count: 5
   }

   static getInitialProps({ res, err }) {
      const statusCode = res ? res.statusCode : err ? err.statusCode : null
      return { statusCode }
   }

   componentDidMount() {
      if (this.state.count !== 0) {
         setTimeout(() => {
            this.setState({ count: this.state.count - 1 })
         }, 1000)
      }
   }

   componentDidUpdate() {
      if (this.state.count !== 0) {
         setTimeout(() => {
            this.setState({ count: this.state.count - 1 })
         }, 1000)
      } else {
         // Router.push('/')
         window.location.replace('/')
      }
   }

   render() {
      return (
         <>
            <h2>{this.props.statusCode
               ? `An error ${this.props.statusCode} occurred on server`
               : 'An error occurred on client'}
            </h2>
            <a href="/">{this.state.count} s Go To Homepage</a>
         </>
      )
   }
}

export default Error