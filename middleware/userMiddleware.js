

const filter = (req, res, next) => { 
    if(!req.query.age) { 
        const age = req.query.age;
        res.send('Provide your age',age);
    } else if(req.query.age > 15) { 
        res.send('You are eligible ')
    }
}

module.exports = filter