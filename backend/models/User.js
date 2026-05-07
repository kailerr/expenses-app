const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// ================== Schema ===============
const userSchema = new mongoose.Schema(
  {
    // user email 
    email: 
    {
        type: String,
        required: true,       
        unique: true,         
        lowercase: true,      
        trim: true,          
    },

    // user password 
    password: 
    {
        type: String,
        required: true,       
        minlength: 6,         
    },
  },

  {
        timestamps: true,       // adds createdAt and updatedAt
  }
);

// ================== Presave Hook =============
// automatically hash the password if it was modified
userSchema.pre("save", async function (next) 
{
  // if password was not changed, skip hash
  if (!this.isModified("password")) 
    return next();

  const salt = await bcrypt.genSalt(10);
  // hash the password
  this.password = await bcrypt.hash(this.password, salt);
  next();
}
);

// ===================== Instance Method ================
// compare input password with stored one password and return true if they match
userSchema.methods.matchPassword = async function (inputPassword) 
{
    return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);