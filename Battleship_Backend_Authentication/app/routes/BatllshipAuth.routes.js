module.exports = (app) => {
    const BatllshipAuthController = require('../controllers/BatllshipAuth.controller.js');


    //get User Info
    app.get('/userInfo', BatllshipAuthController.getUserInfo);

    //updateUserInfo
    app.patch('/updateuserInfo', BatllshipAuthController.updateUserInfo);

    //updateUserInfo
    app.patch('/updatepassword', BatllshipAuthController.updatePassword);

    //create a new player
    app.post('/signup', BatllshipAuthController.create);


    // //login
    app.post('/login', BatllshipAuthController.login);


    // verifyemail
    app.post('/verifyemail', BatllshipAuthController.verifyemail);


    // resetpassword
    app.post('/resetpassword', BatllshipAuthController.resetpassword);


    // lostpassword
    app.post('/lostpassword', BatllshipAuthController.lostpassword);

    
}