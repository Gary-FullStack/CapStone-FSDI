
// this is my "check for logged in" user before allowing access by using a token

export const requireSignin = (req, res, next) => {
    console.log('REQ HEADERS =>', req.headers);
    next();
};