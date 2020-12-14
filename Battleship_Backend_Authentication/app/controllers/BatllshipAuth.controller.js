//The controller will contain methods for handling all the CRUD operations

const BatllshipAuth = require('../models/BatllshipAuth.model');
const model = new BatllshipAuth();



//get user info
exports.getUserInfo = (request, response) => {
    
    // if(request.body.constructor === Object && Object.keys(request.body).length === 0) {
    //     return response.status(400).send({message: 'Provide all required fields'})
    // } else {
        // const playerEmail = model.validateGetUserInfo(request.body);
        model.getUserInfo(request.query.email, (err, result) => {
            if(err) {
                console.log("Internal Server Error : ", err);
                return response.status(500).send({message: 'user cannot find,Internal Server Error'})
            } else {
                console.log("response: ", result);
                return response.json(result);
            }
        });
    // }
};
// update user info
exports.updateUserInfo = (request, response) => {
    //validate a request
    if(request.body.constructor === Object && Object.keys(request.body).length === 0) {
        return response.status(400).send({message: 'Provide all required fields'})
    } else {

        const playerInfo = model.validateUpdateUserInfo(request.body);
        model.updateUserInfo(playerInfo, (err, result) => {
            if(err) {
                console.log("Internal Server Error : ", err);
                return response.status(500).send({message: 'update user info failed,Internal Server Error'})
            } else {
                console.log("user info updated successfully: ", result);
                return response.json(result);
            }
        });
    }
};
// update password

exports.updatePassword = (request, response) => {
    //validate a request
    if(request.body.constructor === Object && Object.keys(request.body).length === 0) {
        return response.status(400).send({message: 'Provide all required fields'})
    } else {

        const updatepassplayer = model.validateUpdatePasswordRegisteredUser(request.body);
        model.updatePassword(updatepassplayer, (err, result) => {
            if(err) {
                console.log("Internal Server Error : ", err);
                return response.status(500).send({message: 'update user info failed,Internal Server Error'})
            } else {
                console.log("user info updated successfully: ", result);
                return response.json(result);
            }
        });
    }
};
//Method to create new player
exports.create = (request, response) => {
    //validate a request
    if(request.body.constructor === Object && Object.keys(request.body).length === 0) {
        return response.status(400).send({message: 'Provide all required fields'})
    } else {

        const player = model.validateObject(request.body);
        model.createPlayer(player, (err, result) => {
            if(err) {
                console.log("Internal Server Error : ", err);
                return response.status(500).send({message: 'user could not be inserted,Internal Server Error'})
            } else {
                console.log("user successfully inserted: ", result);
                return response.json(result);
            }
        });
    }
};

exports.login = (request, response) => {
    //validate a request
    if(request.body.constructor === Object && Object.keys(request.body).length === 0) {
        return response.status(400).send({message: 'Provide all required fields'})
    } else {

        const login = model.validateLoginObject(request.body);
        model.login(login, (err, result) => {
            if(err) {
                console.log("Internal Server Error : ", err);
                return response.status(500).send({message: 'Internal Server Error for login'})
            } else {
                console.log("user successfully logedIn: ", result);
                return response.json(result);
            }
        });
    }
};
exports.verifyemail = (request, response) => {
    //validate a request

    if(request.body.constructor === Object && Object.keys(request.body).length === 0) {
        return response.status(400).send({message: 'Provide all required fields'})
    } else {

        const verifyemail = model.validateverifyemail(request.body);
        
        model.verifyemail(verifyemail, (err, result) => {
            if(err) {
                console.log("Internal Server Error : ", err);
                return response.status(500).send({message: 'Internal Server Error for login'})
            } else {
                console.log("user verified eamil successfully: ", result);
                return response.json(result);
            }
        });
    }
};


exports.lostpassword = (request, response) => {
    //validate a request
    if(request.body.constructor === Object && Object.keys(request.body).length === 0) {
        return response.status(400).send({message: 'Provide all required fields'})
    } else {

        const lostpassword = model.validateLostPassword(request.body);
        model.lostpassword(lostpassword, (err, result) => {
            if(err) {
                console.log("Internal Server Error : ", err);
                return response.status(500).send({message: 'Internal Server Error for login'})
            } else {
                console.log("lostpassword works successfully : ", result);
                return response.json(result);
            }
        });
    }
};




exports.resetpassword = (request, response) => {
    //validate a request
    if(request.body.constructor === Object && Object.keys(request.body).length === 0) {
        return response.status(400).send({message: 'Provide all required fields'})
    } else {

        const resetpassword = model.validateresetpassword(request.body);
        model.resetpassword(resetpassword, (err, result) => {
            if(err) {
                console.log("Internal Server Error : ", err);
                return response.status(500).send({message: 'Internal Server Error for login'})
            } else {
                console.log("resetpassword works successfully: ", result);
                return response.json(result);
            }
        });
    }
};