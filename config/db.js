const mongoose = require('mongoose'); 


const db = mongoose.connect('mongodb+srv://root:root@cluster0.o0wilg0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true, 
    useUnifiedTopology: true

})
.then(() => { 
    console.log('db connected');
})
.catch((err) => { 
    console.log(err);
})

module.exports = db;
