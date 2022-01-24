const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', expressGraphQL.graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(3000, () => console.log('server running in http://localhost:3000'));