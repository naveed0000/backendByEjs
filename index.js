const express = require('express'); 
const app = express();
const path = require('path')
require('dotenv').config();
const port = process.env.PORT||342; 
const Pages = require('./routes/routes')

const db = require('./config/db');
const studentModel = require('./models/userSchema'); 
const cors  = require('cors');

const session = require('express-session');
const cookieParser = require('cookie-parser')





// const userController = require('./controller/userController')

// app.get('/',(req, res) => { 
//     res.send('hiii')
// })


// app.get('/home', (req, res) => { 
//     const package = 'package.json'
//     res.sendFile(path.join(__dirname,'home.html'));
// })


// app.get('/contact', (req, res) => { 
//     res.sendFile(path.join(__dirname, 'contact.html'))
// })
app.use(
    session({
      secret: "yourSecretKey", // Replace with your own secret key
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

app.set('view engine', 'ejs'); 
app.set('views'); 

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.get('/dashboard', (req, res) => { 
    studentModel.find()
    .then(mongoData => { 
        res.render(__dirname + "/views/dashboard.ejs",{mongoData})
    })
});


// app.get('/signup',  (req, res)=> { 
//     res.render('signup');
// });

// app.get('/login', (req, res) => { 
//     res.render('login');
// });

// const updateDataForEjs = (req, res) => { 
//     const {name, age , location, school_name } = req.body; 
//     studentModel.updateOne({_id:req.params.id}, {$set: { name, age, location, school_name}})
//     .then(() => res.json({"message" : "update data"}))
//     .catch((err) => { 
//         console.log(err);
//     })
// }

// app.put('/updateInfo/:id', (req, res) => { 
//     const Id = req.params.id;
//     const {name, age, location, school_name} = req.body;
//     res.redirect('/home')
//     console.log(req.body);
//     studentModel.updateOne({_id:req.params.id}, {$set: { name , age , location, school_name}})
//     // .then(() =>)
    
//     .then(() => res.send("message data has been update") )
//     .catch((err) => { 
//         console.log(err);
//     })
 
// });
// app.get('/dashboard',  (req, res) => {
//     res.render('index')
// })  

app.use(cookieParser())
app.get('/favicon.ico', (req, res) => res.status(204).end());



app.use('/',Pages)

// app.get('/', (req, res) => { 
//     studentModel.find()
//     .then(mongoData => { 
//         res.json(mongoData)
//     })
//     .catch((err) => { 
//         console.log(err);
//     })
// })

// const Id = studentModel.findById();

// const Id = '66b36dd2be09917675143c01';
// app.get(`/naveed/:id`, (req, res) => { 
//     studentModel.findById(req.params.id)
//     .then(mongoData => { 
//         res.json(mongoData)
//     })
// })
// app.get('/', (req, res) => { 
//     studentModel.find()
//     .then(mongoData => { 
//         res.json(mongoData)
//     })
// }) 



app.listen(port, ()=> { 
    console.log('server is running on port  : http://localhost:',port);
});
