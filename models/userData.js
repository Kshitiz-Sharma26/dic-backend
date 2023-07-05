const mongoose = require('mongoose');

const orderHistory = new mongoose.Schema({
    item: String,
    orderId: String,
    quantity:String,
    totalAmount: String,
    orderDate:Date,
    status :{
        type:String,
        enum:["Packaging","Dispatched","Delivered"]
    }
});


const user = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type:String ,
    required:true
  }
  ,
  orderHistory:{
    type:[orderHistory],
    default:[]
  }
});

module.exports = mongoose.model('User', user);
