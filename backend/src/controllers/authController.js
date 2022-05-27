const bcrypt = require("bcrypt");
const User = require("../models/User");
const { use } = require("../routers/auth");

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      //hashed password
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });

      //save into db
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //login
  loginUser: async(req,res)=>{
    try {
      const user = await User.findOne({username:req.body.username})
      if(!user) {
        res.status(404).json("wrong username")
      }
      const vadliPassword = await bcrypt.compare(req.body.password, user.password)
      if(!vadliPassword) {
        res.status(404).json('wrong password')
      }
      if(user && vadliPassword) {
        res.status(200).json(user)
      }
    } catch (error) {
      res.status(500).json(error.message)
    }
  }
};

module.exports = authController;
