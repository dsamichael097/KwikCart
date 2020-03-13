const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

// Firebase Connection Initialization
/*admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kwikcart-228cd.firebaseio.com"
});*/

exports.createEntrySession = (req,res,next)=>{
    //Get the object of the firebase admin and instattiate its database
    var db = admin.database();
    //Create a collection by specifying the collection name or leave it as /
    var ref = db.ref("/");
    //Create a collection where you'll be storing this data, in our case users
    var usersRef = ref.child("cart");
    //Store the value in the database with username as the record identifier and 
    //Name and Age as it's children

    //To insert our own unique key
    /*usersRef.child(req.body.username).set({
        Name: req.body.name,
        Age: req.body.age
    })
    .then( result =>{
        res.status(201).json({message:"Data saved Successfully"});
    })
    .catch(err =>{
        res.status(500).json({message:"Data could not be saved"});
    });*/

    //Using promises to get the auto generated key back
    usersRef.push({
        sessionCreated: true
    })
    .then(result =>{
        res.status(201).json({message:"Data saved Successfully",key:result.key});
    })
    .catch(err =>{
        res.status(500).json({message:"Data could not be saved"});
    });
}

exports.addProductToCart = (req,res,next)=>{
    var db = admin.database();
    var ref = db.ref("/");
    var usersRef = ref.child("cart/"+req.body.sessionId);

    /*var date = new Date();
    date = date.toISOString().slice(0,10);*/
    //To insert our own unique key
    usersRef.child(req.body.pid).set({
        pid: req.body.pid,
        pname: req.body.pname,
        qty: req.body.qty,
        price: req.body.price
    })
    .then( result =>{
        res.status(201).json({message:"Data saved Successfully"});
    })
    .catch(err =>{
        res.status(500).json({message:"Data could not be saved"});
    });
}

exports.fetchUsers = (req,res,next)=>{
    //Get the object of the firebase admin and instattiate its database
    var db = admin.database();
    //Create a collection by specifying the collection name or leave it as /
    var ref = db.ref("/cart");
    ref.once("value", function(data) {
        res.send(data);
    });
}

exports.updateProductInCart = (req,res,next)=>{
    var db = admin.database();
    var ref = db.ref("/");
    var usersRef = ref.child("cart/"+req.body.sessionId);
    //var date = new Date().toISOString().slice(0,10);
    usersRef.child(req.body.pid).update({
        pid: req.body.pid,
        pname: req.body.pname,
        qty: req.body.qty,
        price: req.body.price
    })
    .then(result =>{
        res.status(201).json({message:"Data Updated Successfully"});
    })
    .catch(err =>{
        res.status(500).json({message:"Data could not be Updated"});
    });
}

exports.deleteProductFromCart = (req,res,next)=>{
    var db = admin.database();
    var ref = db.ref("/");
    var usersRef = ref.child("cart/" + req.body.sessionId);
    usersRef.child(req.body.pid).remove()
    .then(()=>{
        res.status(201).json({message:"Data Deleted Successfully"});
    })
    .catch(()=>{
        res.status(500).json({message:"Data could not be Deleted"});
    });
}