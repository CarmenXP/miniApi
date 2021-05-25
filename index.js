require('dotenv').config()
const database = require('./database')
const cors = require('cors');

database();

const ProductsRoutes = require('./routes/products');
const UserRoutes = require('./routes/user');
const AuthRoutes = require('./routes/auth');
const express = require('express');

app = express();
app.use(cors());
app.use(express.json());
app.use(cors({origin: '*'}));

app.use('/products', ProductsRoutes);
app.use('/user', UserRoutes);
app.use('/auth', AuthRoutes);




app.listen(process.env.PORT || 3000, function(){
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${process.env.PORT}`)
})