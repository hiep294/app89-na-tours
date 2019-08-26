const { server, connectDB } = require('./server')

const port = parseInt(process.env.PORT, 10) || 5000

connectDB(() => {
   server.start({
      port
   }, () => {
      console.log(`Server is up at port ${port}.`)
   })
})