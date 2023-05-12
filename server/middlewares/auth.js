import  jwt  from "jsonwebtoken";

// this is  "check for logged in" user before allowing access by using a webtoken

export const requireSignin = (req, res, next) => {
    try {
      const decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
        ); 
     
        req.user = decoded;
        next();

    }catch (err) {
        return res.status(401).json(err);
    }
};