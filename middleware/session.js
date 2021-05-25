const jwt = require('jsonwebtoken');

module.exports= function(request, response, next){
    const token = request.get('Authorization');

    try{
        const payload = jwt.verify(token, 'SECRET');
        request.user = payload;
        next();
    }catch(e){
        response.status(401).json({
            message: "Permiso denegado",
            code: "no_autorizado"
        });
    }
}