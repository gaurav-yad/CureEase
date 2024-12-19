import jwt from 'jsonwebtoken';

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        // get token from authorization headers
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(200).json({ success: false, message: "No token found" });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if( err ){
                return res.status(401).send({
                    message : 'Unauthorized Access', 
                    success : false
                })
            }

            req.body.docId = decode.id;
            next();
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default authDoctor;