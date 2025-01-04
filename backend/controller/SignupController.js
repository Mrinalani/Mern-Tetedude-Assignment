import bcrypt from "bcrypt";
import User from "../model/SignupModel.js";
import jwt from 'jsonwebtoken';

export const SignupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      Name: name,
      Email: email,
      Password: hashedPassword,
    });

    const saveUser = await user.save();

   return res
      .status(201)
      .json({ response: saveUser, message: "user created successfully" });
  } catch (error) {
    console.log(error);
   return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserByuserNameAndEmail = async (req, res) => {
  try {
    const { username, email } = req.params;
    console.log(username, email)

    const userName = await User.findOne({ Username: username});
    if (userName) {
      return res
        .status(200)
        .json({ exist: true, message: "UserName already exists", userName });
    }
    const userEmail = await User.findOne({ Email: email});
    if (userEmail) {
     return res
        .status(200)
        .json({ exist: true, message: "Email already exists" , userEmail});
    } 

    return res.status(200).json({exist:false, message: "User not found"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginController = async (req,res) => {

   try {
    const {email, password} = req.body;

   if(!email || !password){
   return res.status(400).json({error: "All fields are required"})
   }

   const user = await User.findOne({Email: email})
   if(!user){
    return res.status(404).json({error: "user with email not found"})
   }

   const isPasswordValid = await bcrypt.compare(password, user.Password)
   if(!isPasswordValid){
    return res.status(401).json({error: "Invalid Password"})
   }

   const token = jwt.sign({ id: user._id, email: user.Email, name: user.Name },"my_secret_key");
   return res.status(200).json({token:token, message:"User Login Successfully"})
   } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal server error"})
   }
}

export const addFriend = async (req,res) => {
try {
  const {friendId} = req.user;

  if(!friendId){
    return res.status(400).json({ error: "friendId is required" });
  }

  req.user.friends =  req.user.friends || [];
  req.user.friends.push(friendId)

 const user =  await req.user.save()

 return res.status(200).json({message: 'Friend added successfully', user: user })
} catch (error) {
  console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
}

export const removeFriend = async (req,res) => {
  try {
    const {friendId} = req.user;
  
    if(!friendId){
      return res.status(400).json({ error: "friendId is required" });
    }
  
    const user = req.user;

    const filteredUser = user.friends.filter((u)=> u.id != friendId)
  
   return res.status(200).json({message: 'Friend removed successfully', user: filteredUser })
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
  }

  export const getFriend = (req, res) => {
   try {
    const user = req.user;
    const friends = user.friends;

    if (friends.length === 0) {
      return res.status(200).json({ message: 'No friends found', friends });
    }

    res.status(200).json({ message: 'Friends retrieved successfully', friends });
   } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal Server Error"})
   }
  }
  
