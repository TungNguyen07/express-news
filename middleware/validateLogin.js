const userModel = require('../model/user.model');
const md5 = require('md5');

module.exports.Login = async function(req, res, next){
    // let hashedPassword = md5(req.body.password);
    // let user = await userModel.find({username: req.body.username, 
    //     password: hashedPassword});
    // if(!user.length){
    //     res.render('users/login', {
    //         errors: ["Username or Password is wrong!"],
    //         values: req.body,
    //     });
    //     return;
    // }
    // // res.locals.user = user[0];
    // // console.log(res.locals.user);
    const username = req.body.username;
    const password = req.body.password;

    const user = await userModel.findOne({ username });
      if (user) {
        if (await user.comparePassword(password)) {
            next();
        }    
      }
      throw new Error('Incorrect username or Password!');
}

module.exports.checkCookie = async function(req, res, next){
    if(req.signedCookies.userId){
        let user = await userModel.find({_id: req.signedCookies.userId});
        res.locals.user = user[0];
    }
    else
        res.locals.user = null;
    next();
}