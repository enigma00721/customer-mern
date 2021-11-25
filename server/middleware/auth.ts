import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction} from 'express';

dotenv.config();

declare module "express" {
    interface Request {
        email: string;
    }
    interface Response {
        email: string;
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token ;
    // console.log('middleware verify token');
    // console.log(req.cookies);

    if (!token) 
        return res.status(403).send("A token is required for authentication");

    JWT.verify(token, process.env.TOKEN_KEY as string, function(err:any,decoded:any){
        if(err)
            return res.status(401).send("Invalid Token");
        else{
            console.log('from middleware auth');
            console.log(decoded);
            req.email = decoded.email;
            return next();
        }
    });
};

// module.exports = verifyToken;
export default verifyToken;