const express = require('express');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const userRoutes = require('./routes/cartRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Firebase Connection Initialization
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kwikcart-228cd.firebaseio.com"
});


//To Allow Requests from Another Port, OR to prevent CORS Error
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

//Common Route for All Users
app.use("/api/cart",userRoutes);
app.use("/api/product",productRoutes);
app.use("/api/order",orderRoutes);

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server staretd on port 3000');
});