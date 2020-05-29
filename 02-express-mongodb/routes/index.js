const post = require("./post");
module.exports = (app) => {
  app.use("/post", post);
};
