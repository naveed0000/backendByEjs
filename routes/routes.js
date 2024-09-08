const express = require('express'); 
const router = express.Router()
const path = require('path');
const userController = require('../controller/userController')
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json();
const userMiddleware = require('../middleware/userMiddleware')
const studentModel = require('../models/userSchema')
const { default: mongoose } = require('mongoose');


router.post('/logout', userController.logoutUser)
router.get('/auth/login',userController.loginPage)
router.post('/auth/login',userController.loginUser)

router.get('/auth/signup',userController.signupPage)
router.post('/auth/signup',userController.signupUser)


router.get('/', (req, res)=> { 
    res.redirect('/auth/login');
})


// router.get('/dashboard',  (req, res) => { 
//     studentModel.find()
//     .then(mongoData => { 
//         res.render(__dirname + "/views/dashboard.ejs", {mongoData})
//     })
// })

router.post('/insert', (req, res) => { 
    console.log("data is added ", req.body);
    const { name , age , location , school_name} = req.body; 
    const newStudent   =  new studentModel({
        _id : new mongoose.Types.ObjectId(), 
        name, 
        age, 
        location, 
        school_name
    })
    newStudent.save()
    .then(() => { 
        res.redirect('/dashboard'); 
    })
    .catch((err) => { 
        console.log(err);
        res.status(500).send('Faild to insert data')
    }) 
}) 

router.post('/delete/:id', (req, res) => { 
    console.log(req.params.id);
    studentModel.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect('/dashboard');
    })
    .catch((err) => { 
        console.log(err);
        res.status(500).send("Failed to delete data")
    })
})

// search 
router.get('/:id', (req, res) => { 
    studentModel.findById(req.query._id)
    .then((mongoData) => { 
        if(mongoData) { 
            res.render('dashboard', { mongoData : [mongoData]});
        }
        else { 
            res.render('dashboard', { mongoData : [mongoData]})
        }
    })
    .catch((err) => { 
        console.log(err);
    })
})

router.get('/home', (req, res) => { 
    // const package = 'package.json'
    res.sendFile(path.join(__dirname,'../home.html'));
})

// router.get('/updateInfo/:id',(req, res)  => { 
//     // res.render('updateInfo')
//     const id = req.params.id;
//     studentModel.findById(id)
//     .then(data => { 
//         console.log(data);
//         res.render('updateInfo', { user: data});
//     })
//     .catch(err => { 
//         console.log(err);
//         res.status(500).send('faild to load update data');
//     })
// })

// router.put('/updateuser',  (req, res) => { 
//     console.log("update data", req.body);
//     const { name , age , location , school_name} = req.body; 
//     studentModel.findByIdAndUpdate(req.params.id, {name, age , location, school_name}, { new : true})
//     .then(() => { 
//         res.redirect('/');
//      })
//      .catch(err => { 
//         console.log(err);
//         res.status(500).send('Faild to update data');
//      }) 
// })


router.get('/updateInfo/:id', (req, res) => { 
    const id = req.params.id;
    studentModel.findById(id)
    .then(data => { 
        console.log(data);
        res.render('updateInfo', { user: data });
    })
    .catch(err => { 
        console.log(err);
        res.status(500).send('Failed to load update data');
    });
});

router.post('/updateuser/:id', (req, res) => { 
    console.log("update data", req.body);
    const { name, age, location, school_name } = req.body; 
    studentModel.findByIdAndUpdate(req.params.id, { name, age, location, school_name }, { new: true })
    .then(() => { 
        res.redirect('/');
    })
    .catch(err => { 
        console.log(err);
        res.status(500).send('Failed to update data');
    });
});


router.get('/', userController.allData);
// router.get('/:id', userController.searchData); 
router.delete('/deleteOne/:id',userController.deleteData);
// router.post('dashboard/insert', jsonParser, userController.addDataForEjs)
router.post('/insert', jsonParser, userController.addData)
router.put('/update/:id',jsonParser,  userController.updateData); 



// router.post('/insert',userController.addData);
router.get('/contact', (req, res) => { 
    res.sendFile(path.join(__dirname, '../contact.html'))
})

module.exports = router 