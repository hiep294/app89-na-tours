const rootResolvers = {
   Query: require('./Query'),
   Mutation: require('./mutations'),
   User: require('./User'),
   OrderPayload: require('./OrderPayload')
}

module.exports = rootResolvers