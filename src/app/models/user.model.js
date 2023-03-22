import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const UserSchema = mongoose.Schema({
  name: {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "creator", "user"]
  },
  photos: {
    type: [String]
  }
},
{
  versionKey: false,
});


UserSchema.pre("save", async function (next)  {
  if(this.isModified('password')) {
    const salt = await bcrypt.genSalt()
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
})


UserSchema.static("checkPassword", function (password, userPassword) {
  return bcrypt.compareSync(password, userPassword);
});



const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
