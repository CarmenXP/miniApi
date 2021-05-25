const express = require('express');
const Router = express.Router();
const ProductsModel = require('../schemas/products');




Router.post('/', function(request, response){
    const{body}= request;

    new ProductsModel(body).save()
        .then(function(document){
            response.json({data:document})
        }) 
        .catch(function (error) {
            response.status(400).json({
              message: error.message,
              code: "PRODUCT_CREATION_FAILURE"
            })
          })      
})

Router.get('/', function (request, response) {
  ProductsModel.find()
      .then(function (documents) {
        response.json({ data: documents });
      })
      .catch(function (error) {
        response.status(400).json({
          message: error.message,
          code: "PRODUCTS_FETCH"
        });
      })
  });
  
  Router.get('/:id', function (request, response) {
    const { id } = request.params;
  
    ProductsModel.findById(id)
      .then(function (document) {
        response.json({ data: document });
      })
      .catch(function (error) {
        response.status(400).json({
          message: error.message,
          code: "PRODUCT_FETCH_BY_ID"
        });
      })
  });
  
  module.exports = Router;