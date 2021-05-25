const md5= require('md5');
const UserModel = require('../schemas/user');
const SessionMiddleware = require('../middleware/session');
const express = require('express');
const Router = express.Router();

Router.post('/', function(request, response){
    let {body} = request;
    body.password = md5(body.password);

    new UserModel(body).save()
    .then(function(document){
        response.json({name: document.name, email:document.email, password: document.password});
    })
    .catch(function(error){
        response.status(400).json({
            message: error.message,
            code: "Fail_User_Creation"
        });
    });
});

Router.get('/', function (request, response) {
    UserModel.find()
        .then(function (documents) {
          response.json({ data: documents });
        })
        .catch(function (error) {
          response.status(400).json({
            message: error.message,
            code: "Users_fetch"
          });
        })
    });

Router.get('/me/products', SessionMiddleware, function(request, response){
    const {id} = request.user;

    UserModel.findById(id).populate("cart")
        .then(function(user){
            response.json({data: user.cart});
        })
        .catch(function(error) {
            response.status(400).json({
                message: error.message,
                code: "fail_use_cart"
            });
        });
});

Router.put('/me/products', SessionMiddleware, function(request, response) {
   const {id} = request.user;
   const {productId} = request.body;
   
   UserModel.findByIdAndUpdate(id, { $push: {cart: productId}})
    .then(function(){
        response.json({
            data: {ok: true}
        });
    })
    .catch(function(error){
        response.status(400).json({
            message: error.message,
            code: "cart_add_fail"
        });
    });
});

module.exports = Router;