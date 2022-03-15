//relationships
const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars"); 
const sequelize = require("./config/connection")
// const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const path = require("path");
const handlebarsHelpers = require("./utils/helpers");
const exphbs = hbs({helpers: handlebarsHelpers});


//initialize server
const app = express();
const PORT = process.env.PORT || 3001;


//middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


//set up the actual session
const sess = {
  secret: "secret",
  cookie: {//Session to expire in approx 10 min.  
    maxAge: 10 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequlizeStore({
    db: sequelize,
  }),
};



//implement and use
app.use(session(sess));
app.use(routes);
app.engine("handlebars", exphbs);
app.set("view engine", "handlebars");

//create connection
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});