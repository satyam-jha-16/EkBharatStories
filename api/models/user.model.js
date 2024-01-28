  import mongoose from "mongoose"
  
  const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required : true,
        unique: true,

    },
    email:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    },
    profilePic:{
        type: String,
        default: "https://pm1.aminoapps.com/7394/1773bf0e3df37a15c11d4b3534adfaddd115370br1-736-736v2_hq.jpg",
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    },
    {timestamps: true}
  )

  const User = mongoose.model("User", userSchema)

  export default User;