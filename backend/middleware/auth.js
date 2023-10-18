

const jwt= require ("jsonwebtoken")

async function auth(req,res,next){

    try {
        const token = req.headers.authorization.split(" ")[1]
        //console.log(token)

        if(!token){
            return res.status(403).send({
                message: "Invalid token, Please login first.",
              });
        }

        const  decoded = jwt.verify(token, 'blog');

        if(!decoded){
            return res.status(403).send({
                message: "Invalid token.",
              });
        }

        req.body.username=decoded.username
        req.body.date=new Date().toLocaleDateString('en-GB')
        req.body.likes=0
        req.body.comments=[]

        next()

    } catch (error) {
        return res.status(500).send({
            message: error.message,
          });
    }
}


module.exports= auth