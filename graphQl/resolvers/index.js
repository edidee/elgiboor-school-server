const studentResolver = require("./student");
const adminResolver = require("./admin");
module.exports = {
  Query: {
    ...studentResolver.Query,
  },
  Mutation: {
    ...studentResolver.Mutation,
    ...adminResolver.Mutation,
  },
};
