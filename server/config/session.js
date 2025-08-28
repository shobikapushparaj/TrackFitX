const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (app, mongooseConnectionString) => {
  app.use(
    session({
      secret: "shobika", // keep this in .env
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: mongooseConnectionString,
        collectionName: "sessions"
      }),
      cookie: {
        httpOnly: true,
        secure: false, // set true if using https
        maxAge: 1000 * 60 * 60 * 24 // 1 day
      }
    })
  );
};
