var jwt = require('jsonwebtoken');
require("dotenv").config();

let authenticator = (req,res,next)=>{
    let token  = req.headers.token;
    if(token){
        jwt.verify(token, process.env.secret, function(err, decoded) {
            if(decoded){
                req.body.user=decoded.userID;
                next();
            }else{
                res.status(400).send({err:"Please Login First"});
            }
        })
    }else{
        res.status(400).send({err:"Please Login First"});
    }
}

module.exports={authenticator}