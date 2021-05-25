
const {Schema, model} = require('mongoose')

const ProductsSchema = new Schema({
    product: {type: String, require: true},
    description:{type:String, require: true},
    price: {type: Number, require: true},
    rating: {type: Number, require:true},
    countInStock: {type: Number, requiere: true},
    image: {type: String, required: true}
})

module.exports = model('products',  ProductsSchema)