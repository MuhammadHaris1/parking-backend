const { Query } = require("./query.js");
const { Mutation } = require("./mutation.js");


const resolvers = {
    Query,
    Mutation,
  };
  
  module.exports = {
    resolvers,
  };