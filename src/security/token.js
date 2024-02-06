const jwt = require("jsonwebtoken");

function verificatoken(req, res, next){
    const autorization=req.headers.authorization
    if(!autorization){
        return res.status(401).json({message:"acceso denegado"})
    }
    const token = autorization.split(" ")[1];
    try {
        const decodifica=jwt.verify(token,"luis");
        req.usuario=decodifica
        next();
    } catch (error) {
        return res.status(401).json({message:"TOKEN NO VALIDO "})
    }
}

module.exports={verificatoken}