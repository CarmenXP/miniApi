
const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, requiere: true},
    cart: [{type: Schema.Types.Object, ref: 'products'}]
})

module.exports= model('user', UserSchema)