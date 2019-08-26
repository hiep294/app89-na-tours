const express = require('express')
const next = require('next')
const jwt = require('jsonwebtoken')
const Order = require('./models/Order')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
   const { server, connectDB } = require('./server')

   server.express.use(express.json())
   server.express.post('/confirmation', async (req, res) => {
      // console.log(req.body.token)
      // will update the order
      try {
         const decodedPayload = jwt.verify(req.body.token, process.env.JWT_SECRET)
         // will update in order
         const orderId = decodedPayload.orderId
         const order = await Order.findOne({ _id: orderId })
            .then(order => order)
         if (!order) {
            res.send({ success: false, message: 'The order not found' })
            return
         }

         if (order.status === 'Waiting') {
            order.status = 'Confirmed'
            await order.save()
               .then(data => res.send({ success: true }))
            return
         } else {
            res.send({ success: true })
            return
         }
      } catch (err) {
         res.send({ success: false, message: 'Invalid Token' })
      }
   })

   // setting pages > setting env > pass this index to dev > config schema root


   server.express.get('/', (req, res) => {
      return app.render(req, res, '/')
   })



   server.express.get('*', (req, res) => {
      return handle(req, res)
   })

   connectDB(() => {
      server.start({
         port
      }, () => {
         console.log(`Server is up at port ${port}.`)
      })
   })

})




