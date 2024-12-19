import jwt from 'jsonwebtoken';

//user authentication middleware
const authUser = async (req, res, next) => {
    try {
        // get token from authorization headers
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(200).json({ success: false, message: "No token found" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if( err ){
                return res.status(200).send({
                    message : 'Unauthorized Access', 
                    success : false
                })
            }

            req.body.userId = decode.id;
            
            next();
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default authUser;