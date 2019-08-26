const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose')
const getUserId = require('./utils/getUserId')

const server = new GraphQLServer({
   typeDefs: './server/src/typeDefs/root.graphql',
   resolvers: require('./resolvers'),
   context: (request) => ({
      userId: getUserId(request)
   })
})

const connectDB = (startServer) => {
   mongoose
      .connect(process.env.MONGODB_URI, {
         useCreateIndex: true,
         useNewUrlParser: true,
         useFindAndModify: false
      })
      .then(rs => {
         if (startServer) startServer()
      })
      .catch(err => console.log(err))
}

module.exports = { server, connectDB }