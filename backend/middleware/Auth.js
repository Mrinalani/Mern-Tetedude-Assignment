import jwt from 'jsonwebtoken'
import User from '../model/SignupModel';
export const authenticateUser = (req, res) => {
try {
    const token = req.header('Authorization')

    if (!token) {
       return res.status(401).json({ success: false, message: 'Authorization token is missing' });
   }

   const user = jwt.verify(token, "my_secret_token")

   User.findById(user.id)
   .then((user)=>{
      req.user = user;
      next()
   })

} catch (error) {
    console.log(error)
        return res.status(401).json({success:false})
}
}