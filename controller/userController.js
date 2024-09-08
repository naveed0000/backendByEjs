const { default: mongoose } = require('mongoose');
const studentModel  = require('../models/userSchema');
const User = require('../models/users')
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cookieParser = require('cookie-parser')



const logoutUser = (req, res) => {
    
    req.session.destroy((err) => {
        res.clearCookie("sessionId");
        res.redirect("/auth/login");
      });
  };

// const logoutUser = (req, res) =>  {
//     console.log('Cookies: ', req.cookies)
//     req.session.destroy(() => {
//         res.clearCookie("sessionId");
//         console.log(req.sessionID);
//         res.redirect("/login");
//     });
// }
const loginPage = (req, res) => { 
    res.render('login');
}
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return res.status(404).send('User not found');
    }
   
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    // res.send({ token });
    res.redirect('/dashboard')
  }

const signupPage = (req, res) => { 
    res.render('signup')
}
const signupUser =  async (req, res) => {

    const { username, password } = req.body;
    console.log(username, password);
    try {
      const user = new User({ username, password });
      await user.save();
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    //   res.send({ token });
    res.redirect('/auth/login')
    } catch (error) {
        console.log(error);
      res.status(400).send(error);
    }
  }

const allData = (req, res) => { 
    studentModel.find()
    .then(mongoData => { 
        res.json(mongoData)
    })
}
// ejs 
const allDataForEjs = (req, res) => { 
    studentModel.find()
    .then(data => { 
        res.render('dashboard',{data})
    })
}
const searchData = (req, res) => { 
    studentModel.findById(req.params.id)
    .then(mongoData => { 
        res.json(mongoData)
    })
}
const deleteData = (req, res) => {
    studentModel.deleteOne({_id : req.params.id})
    .then(() => res.json({'message' : 'data deleted'}))
    .catch(err => { 
        console.log(err);
    })
}
const addData = (req, res) => { 
    const {name, age , location, school_name} = req.body; 
    const newuser = new studentModel({
        _id : new mongoose.Types.ObjectId(), 
        name, 
        age, 
        location, 
        school_name
    })
    newuser.save()
    .then(() => res.json({"message" : "data added"}))
    .catch((err) => {
        console.log(err);
    })
}
const addDataForEjs = (req, res) => { 
    const {name, age , location, school_name} = req.body; 
    const newuser = new studentModel({
        _id : new mongoose.Types.ObjectId(), 
        name, 
        age, 
        location, 
        school_name
    })
    newuser.save()
    .then(() => res.json({"message" : "data added"}))
    .catch((err) => {
        console.log(err);
    })
}

const updateData = (req, res) => { 
   const {name , age , location ,school_name} = req.body; 
   studentModel.updateOne({_id: req.params.id},{$set: {name, age , location , school_name}})
   .then(() => res.json({"message": "updated data"}))
   .catch((err) => { 
        console.log(err);
   })
}
const updateDataForEjs = (req, res) => { 
    const {name, age , location, school_name } = req.body; 
    studentModel.updateOne({_id:req.params.id}, {$set: { name, age, location, school_name}})
    .then(() => res.json({"message" : "update data"}))
    .catch((err) => { 
        console.log(err);
    })

}
module.exports = {logoutUser , loginPage, loginUser, signupPage, signupUser, searchData,allDataForEjs,updateDataForEjs,addDataForEjs,   allData, deleteData, addData, updateData}