import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// save user with encrypted password
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }
)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (candidatePassword:string, cb:Function) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    console.log("isMatch", isMatch)
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

export default mongoose.models.User || mongoose.model("User", UserSchema);