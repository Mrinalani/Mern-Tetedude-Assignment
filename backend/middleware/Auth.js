import jwt from 'jsonwebtoken'
import User from '../model/SignupModel.js';
export const authenticateUser = async(req, res, next) => {
try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization token is missing' });
    }

   const user = jwt.verify(token, "my_secret_key")


  await User.findById(user.id)
   .then((user)=>{
      req.user = user;
      next()
   })
} catch (error) {
    console.log(error)
        return res.status(401).json({success:false})
}
}