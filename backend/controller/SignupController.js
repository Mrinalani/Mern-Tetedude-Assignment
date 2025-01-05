import bcrypt from "bcrypt";
import User from "../model/SignupModel.js";
import jwt from 'jsonwebtoken';

export const SignupController = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    console.log(name, email, password, username);

    if ((!name, !email, !password, !username)) {
      return res.status(400).json({ error: "All fields are required" });
    }

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


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      Name: name,
      Username: username,
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

export const getAllUser = async (req,res) => {
  try {
    console.log("get all users")
   const excludedId = req.user._id
   const users = await User.find({ _id: { $ne: excludedId } });
   if(users.length === 0){
    return res.status(400).json({message: "No User Found"});
  }

  return res.status(200).json({message: "User fetched Successfully", users:users})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getUser = async (req,res) => {
  try {
    const user = req.user;

  return res.status(200).json({message: "User fetched Successfully", user})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const followFriend = async (req,res) => {
try {
  const {friendId} = req.params;
  if(!friendId){
    return res.status(400).json({ error: "friendId is required" });
  }
  const friend = await User.findById(friendId)

  req.user.Followings.push(friendId)
  friend.Requests.push(req.user._id)
  friend.Followers.push(req.user._id)

  
   await friend.save()
   await req.user.save()
 return res.status(200).json({message: 'Friend added successfully', })
} catch (error) {
  console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
}

export const unfollowFriend = async (req,res) => {
  try {
    const {friendId} = req.params;
  
    if(!friendId){
      return res.status(400).json({ error: "friendId is required" });
    }
  
    const user = req.user;
    const friend = await User.findById(friendId)

   user.Followings = user.Followings.filter((u) => u.toString() != friendId.toString());

   friend.Followers = friend.Followers.filter((u) => u.toString() != user._id.toString());


   if (friend.Requests.includes(user._id)) {
     friend.Requests = friend.Requests.filter((u) => u.toString() != user._id.toString());

   }

   // Save the changes to the database
   await user.save();
   await friend.save();


   console.log(friend)
   console.log(req.user)
  
   return res.status(200).json({message: 'Friend removed successfully' })
  } catch (error) {
    console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
  }

  export const getFriend = async(req, res) => {
   try {
    const user = req.user;
    const friends = user.Friends;

    if (friends.length === 0) {
      return res.status(200).json({ message: 'No friends found', friends });
    }
    const userFriends = await User.find({ _id: { $in: friends } });

    res.status(200).json({ message: 'Friends retrieved successfully', userFriends });
   } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal Server Error"})
   }
  }

  export const getRequest = async(req, res) => {
     try {
      const user = req.user;
  
      const requests = user.Requests;

      const userRequests = await User.find({ _id: { $in: requests } });
  
      res.status(200).json({ message: 'Requests retrieved successfully', userRequests });
      
     } catch (error) {
      console.log(error)
    return res.status(500).json({error: "Internal Server Error"})
     }
  }

  export const followBack = async(req, res) => {
try {
  const {followBackId} = req.query;

  const friend = User.findById(followBackId)

   req.user.Following.push(followBackId);
   friend.Following.push(req.user._id)
   req.user.Friend.push(followBackId);

   const user = await req.user.save()

   res.status(200).json({ message: 'Follow Back User', user });
} catch (error) {
  console.log(error)
    return res.status(500).json({error: "Internal Server Error"})
}
  }

  export const acceptRequest = async(req, res) => {
    try {
      const {friendId} = req.params;
    if(!friendId){
      return res.status(400).json({ error: "friendId is required" });
    }

    const user = req.user;
    const friend = await User.findById(friendId)

    console.log(user._id)
    console.log(friend._id)

    console.log(friend.Requests, "friend.Requests")
    user.Followings.push(friendId)
    friend.Followers.push(user._id)

    user.Friends.push(friendId)
    friend.Friends.push(user._id)
    
    user.Requests = friend.Requests.filter((u) => u.toString() != friendId.toString());

    console.log(friend.Requests, "friend.Requests")


    await user.save()
    await friend.save().catch((err) => console.error(err));

    return res.status(200).json({message: 'Friend added successfully', })

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

  }

  export const rejectRequest = async(req, res) => {
    console.log("gvdcg")
    try {
      const {friendId} = req.params;
    if(!friendId){
      return res.status(400).json({ error: "friendId is required" });
    }

    const user = req.user;
    const friend = await User.findById(friendId)
    console.log(friendId)

    user.Requests = friend.Requests.filter((u) => u.toString() != friendId.toString());

    await user.save()

    return res.status(200).json({message: 'Friend added successfully', })

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }

  }
  
