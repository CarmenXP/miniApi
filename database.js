const {connect} = require('mongoose');

module.exports = function () {
    connect (process.env.MONGO_URI, 
      { useUnifiedTopology: true, 
        useNewUrlParser: true })
    .then(function () {
        console.log('Conectado a la base de datos MongoDB ')
      })
    .catch(function () {
        console.error('No se puede establecer conexión con la base de datos');
        process.exit(1);
      });  
}