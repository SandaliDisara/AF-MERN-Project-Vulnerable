const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const csurf = require("csurf");  // Import csurf middleware
const cookieParser = require("cookie-parser");  // Required to handle CSRF tokens in cookies\
const errorHandler = require("./middlewares/errorHandler");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8070;

// CSRF Protection middleware
const csrfProtection = csurf({ cookie: true });  // Enable CSRF protection using cookies

app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend's URL
  credentials: true  // This is required to allow cookies to be sent with the request
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());  // Enable cookie parsing for CSRF

// Enable CSRF protection for routes where necessary
app.use(csrfProtection);

// Route to send the CSRF token
app.get("/get-csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });  // Send the CSRF token to the client
});


//connect database
const URL = process.env.MONGODB_URL;
app.use(express.static("../client/src/Assets/images"));
app.use(express.static("../client/src/Assets/animalblogs"));

// Use error handler middleware
app.use(errorHandler);


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
    // add your code here
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
  });

app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT} !`);
});

//LoginGrassroot login routes
const grass = require("./Routes/Grass-route");
app.use("/grass", grass);

//LoginAdmin login routes
const staff = require("./Routes/Staff-route");
app.use("/staff", staff);

//AgriBlog Routes
const agriBlogRouter = require("./Routes/AgriBlog-route");
app.use("/agriBlog", agriBlogRouter);

//Beef production Routes.
const beefProductionRouter = require("./Routes/Animal-routes/BeefProduction-route");
app.use("/beefProduction", beefProductionRouter);

//Chicken production routes.
const chickenProductionRouter = require("./Routes/Animal-routes/ChickenProduction-route");
app.use("/chickenProduction", chickenProductionRouter);

//Test Image
const imageRouter = require("./Routes/ImageTest-route");
app.use("/imageTest", imageRouter);

//Agriculture production routes.
const agricultureRouter = require("./Routes/AgricultureProducion-route");
app.use("/agricultureProduction", agricultureRouter);


//Rice production routes.
const riceRouter = require("./Routes/Agriculture-routes/RiceProducion-route");
app.use("/riceProduction", riceRouter);

//Vegitabel production routes.
const vegitableRouter = require("./Routes/Agriculture-routes/VegitableProduction-route");
app.use("/vegitableProduction", vegitableRouter);



