import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const admintoken  = req.headers.admintoken;

        if (!admintoken) {
            return res.status(200).json({ success: false, message: "No token found" });
        }
        
        jwt.verify(admintoken, process.env.JWT_SECRET, (err, decode) => {
            if( err ){
                console.log(err);
                return res.status(401).send({
                    message : 'Unauthorized Access', 
                    success : false
                })
            }
            if (decode.email !== process.env.ADMIN_EMAIL) {
                return res.status(401).json({ success: false, message: "Unauthorized Access" });
            }   
            next();
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export default authAdmin;