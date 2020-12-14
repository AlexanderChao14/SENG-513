

const AWS = require('aws-sdk');
dbConnection = require('../../config/database.config');
AWS.config.update(dbConnection.aws_remote_config);
const cognitoidentity = new AWS.CognitoIdentity();
const cryptoAdd = require('crypto');
const dynamodbNew = new AWS.DynamoDB.DocumentClient();
const dynamodbOld = new AWS.DynamoDB();
const ses = new AWS.SES();
const crypto = require('crypto');
// const { isContext } = require('vm');
class BatllshipAuth {

    randomize = require('randomatic');
    
    // AWS = require('aws-sdk');
    
    
    // dynamodb = new AWS.DynamoDB.DocumentClient();
    // ses = new AWS.SES();
      // get user Info


      getUserInfo(userEmail,callback){
        let email = userEmail;
        getUserForUpadatinff(email, function(err,firstName,lastName) {
          if (err) {
            let body={
           
              message: "User not found",
              }; 
      callback(null,  {
              statusCode: 400,
              body:body
            });
          }
          else{
            let body={
              firstName:firstName,
              lastName: lastName
              }; 
        callback(null,  {
              statusCode: 200,
              body:body
            });
          }

        });
      }
      // update UserInfo
      updateUserInfo(playerInfo, callback){
        let firstName = playerInfo.firstName;
        let lastName = playerInfo.lastName;
        let email = playerInfo.email;
        updateUserInfoFirstandLast(email,firstName,lastName,  function(err, firstName,lastName){
          if (err) {
            let body={
              message: "update failed",
              }; 
      callback(null,  {
              statusCode: 400,
              body:body
            });
          }
          else{
            updateUserinRankTable(email,firstName,function(err, data){
              if (err) {
                let body={
                  message: "update failed In rank Table",
                  }; 
          callback(null,  {
                  statusCode: 400,
                  body:body
                });
              }
              else{
                let body={
                  firstName:firstName,
                  lastName: lastName,
                  message: "your inforamtion has updated sucessfully",
                  }; 
          callback(null,  {
                  statusCode: 200,
                  body:body
                });
              }
            })
          
          }


        }); 

      }
      // create player
    createPlayer(playerObject, callback) {
        let firstName = playerObject.firstName;
        let lastName = playerObject.lastName;
        let email = playerObject.email;
        let clearPassword = playerObject.password;
        let created_at = playerObject.created_at;
        computeHash(clearPassword, function(err, salt, hash) {
            if (err) {
              callback('Error in hash: ' + err);
            } else {
                console.log("#####",email,firstName,lastName)
                console.log("###############################")
                storeUser(email, hash, salt,firstName,lastName, created_at,function(err, token) {
                addUserTorank(email,firstName,function(err, added){
                  if (added===true){
                    console.log("User added to rank table")
                  }
                  else{
                    console.log(err)
                    console.log("User has not added to rank table")
                  }
                });
                if (err) {
                  if (err.code == 'ConditionalCheckFailedException') {
                    // userId already found
                    let body={
                            created: false,
                            message: "you have already registred",
                            }; 
                    callback(null,  {
                            statusCode: 400,
                            body:body
                          });
                  } else {
                    callback('Error in storeUser: ' + err);
                  }
                } else {
                    sendVerificationEmail(email, token, firstName,function(err, data) {
                    if (err) {
                      callback('Error in sendVerificationEmail: ' + err);
                    } else {
                         let body={
                            created: true,
                            message: "A confirmation email has been sent to you by email.",
                            };
                      callback(null, {
                            statusCode: 200,
                            body:body
                          });
                    }
                  });
                }
              });
            }
          });
    }
// Login method
    login(loginObject, callback) {
      let email = loginObject.email;
      let clearPassword = loginObject.password;
      getUser(email, function(err, correctHash, salt, verified,adminVerified,firstName,roleOfUser) {
        if (err) {
          callback('Error in getUser: ' + err);
        } else {
          if (correctHash == null) {
            // User not found
            console.log('User not found: ' + email);
            let body={
                        login: false,
                        message: "User not found",
                        };
            callback(null, {
                        statusCode: 400,
                        body:body
                      });
          } else if (!verified) {
            // User not verified
            console.log('User not verified: ' + email);
            let body={
                        login: false,
                        message: "User not verified",
                        };
            callback(null, {
                        statusCode: 400,
                        body:body
                      });
          } else {
            computeHash(clearPassword, salt,
                function(err, salt, hash) {
              if (err) {
                callback('Error in hash: ' + err);
              } else {
                console.log('correctHash: ' + correctHash + ' hash: ' + hash);
                if (hash == correctHash) {
                  // Login ok
                  console.log('User logged in: ' + email);
                  getToken(email, function(err, identityId, token) {
                    if (err) {
                      callback('Error in getToken: ' + err);
                    } else {
                      if (adminVerified=== false){
                        let body={
                          login: false,
                          message: "your account is disabled by admin",
                          };
                    callback(null, {
                          statusCode: 400,
                          body:body
                        });
                      }
                      else{
                        console.log("firstName: ",firstName)
                        thisUserIsLoggedIn(email, function(err, isLog) {
                          console.log("$$$$$  ",isLog)
                          console.log("$$$$$  ",err)
                          if(isLog===true){
                            let body={
                              login: false,
                              message: "You already logged in with another browser",
                              };
                        callback(null, {
                              statusCode: 400,
                              body:body
                            });
                          }
                          else{
                            let body={
                              login: true,
                              firstName:firstName,
                              identityId: identityId,
                              token: token,
                              role:roleOfUser};
                            callback(null, {
                              statusCode: 200,
                              body:body
                            });
                          }
                        })
                      
                    }}
                  });
                } else {
                  // Login failed
                  console.log('User login failed: ' + email);
                  let body={
                        login: false,
                        message: "incorrect password",
                        };
                  callback(null, {
                        statusCode: 400,
                        body:body
                      });
                }
              }
            });
          }
        }
      });
    }

      //
      verifyemail(verifyObject, callback) {

        let email = verifyObject.email;
        let verifyToken = verifyObject.verify;
        
       
        getUserForVerifyEmail(email, function(err, verified, correctToken) {
          if (err) {
            callback('Error in getUser: ' + err);
          } else if (verified) {
            console.log('User already verified: ' + email);
            let body={
                          verified: true,
                          message: "User already verified",
                          };
            callback(null,  {
                          statusCode: 200,
                          body:body
                        });
          } else if (verifyToken == correctToken) {
            
            updateUser(email, function(err, data) {
             
              if (err) {
                callback('Error in updateUser: ' + err);
              } else {
                console.log('User verified: ' + email);
                let body={
                          verified: true,
                          message: "You has been Verified, thanks!",
                          };
                callback(null, {
                          statusCode: 200,
                          body:body
                        });
              }
            });
          } else {
            console.log('User not verified: ' + email);
             let body={
                          verified: false,
                          message: "You has not been Verified, sorry.",
                          };
            callback(null,
             {
                          statusCode: 400,
                          body:body
                        });
          }
        });

      }

      lostpassword(lostpasswordObject, callback) {

        let email = lostpasswordObject.email;
        getUserLostPassword(email, function(err, emailFound) {
          if (err) {
            callback('Error in getUserFromEmail: ' + err);
          } else if (!emailFound) {
            console.log('User not found: ' + email);
            let body={
                          sent: false,
                          message: "User not found",
                          };
            callback(null,  {
                          statusCode: 400,
                          body:body
                        });
          } else {
            storeLostToken(email, function(err, token) {
              if (err) {
                callback('Error in storeLostToken: ' + err);
              } else {
                sendLostPasswordEmail(email, token, function(err, data) {
                  if (err) {
                    callback('Error in sendLostPasswordEmail: ' + err);
                  } else {
                    console.log('User found: ' + email);
                    let body={
                          sent: true,
                          message: "Email sent. Please check your email to reset your password.",
                          };
                    callback(null, {
                          statusCode: 200,
                          body:body
                        });
                  }
                });
              }
            });
          }
        });
      }
      //reset passsword 

      resetpassword(resetpasswordObject, callback) {

        let email = resetpasswordObject.email;
        let lostToken = resetpasswordObject.lost;
        let newPassword = resetpasswordObject.password;
        getUserForResetPassword(email, function(err, correctToken) {
          if (err) {
            callback('Error in getUser: ' + err);
          } else if (!correctToken) {
            console.log('No lostToken for user: ' + email);
            let body={
                          changed: false,
                          message: "No lostToken for user.",
                          };
            callback(null,  {
                          statusCode: 400,
                          body:body
                        });
          } else if (lostToken != correctToken) {
            // Wrong token, no password lost
            console.log('Wrong lostToken for user: ' + email);
            let body={
                          changed: false,
                          message: "Your token is not valid.",
                          };
            callback(null, {
                          statusCode: 400,
                          body:body
                        });
          } else {
            console.log('User logged in: ' + email);
            computeHash(newPassword,
                function(err, newSalt, newHash) {
              if (err) {
                callback('Error in computeHash: ' + err);
              } else {
                updateUserForResetPassword(email, newHash, newSalt, function(err, data) {
                  if (err) {
                    callback('Error in updateUser: ' + err);
                  } else {
                    console.log('User password changed: ' + email);
                    let body={
                          changed: true,
                          message: "User password changed successfully.",
                          };
                    callback(null, {
                          statusCode: 200,
                          body:body
                        });
                  }
                });
              }
            });
          }
        });
      }


       //update passsword 

       updatePassword(updatePasswordObject, callback) {

        let email = updatePasswordObject.email;
        let oldPassword = updatePasswordObject.oldPassWord;
        let newPassword = updatePasswordObject.newPassword;
        getUser(email, function(err, correctHash, salt, verified,adminVerified,firstName,roleOfUser) {
          if (err) {
            console.log('Error in getUser: ' + err);
            let body={
              changed: false,
              message: 'Error in getUser: ' + err,
              };
        callback(null, {
              statusCode: 400,
              body:body
            });
          } else {
            if (correctHash == null) {
              console.log('User not found: ' + email);
              let body={
                changed: false,
                message: 'User not found: ' + email,
                };
          callback(null, {
                statusCode: 400,
                body:body
              });
            } else {
             computeHash(oldPassword, salt, function(err, salt, hash) {
                if (err) {
                  console.log('Error in hash: ' + err);
                  let body={
                    changed: false,
                    message: 'Error in hash: ' + err,
                    };
              callback(null, {
                    statusCode: 400,
                    body:body
                  });
                } else {
                  if (hash == correctHash) {
                    console.log('User logged in: ' + email);
                    computeHash(newPassword, function(err, newSalt, newHash) {
                      if (err) {
                        console.log('Error in computeHash: ' + err);
                        let body={
                          changed: false,
                          message: 'Error in computeHash: ' + err,
                          };
                    callback(null, {
                          statusCode: 400,
                          body:body
                        });
                      } else {
                        updateUserUpdatePassword(email, newHash, newSalt,
                            function(err, data) {
                          if (err) {
                            console.log('Error in updateUser: ' + err);
                            let body={
                              changed: false,
                              message: 'Error in updateUser: ' + err,
                              };
                        callback(null, {
                              statusCode: 400,
                              body:body
                            });
                          } else {
                            console.log('User password changed: ' + email);
                            let body={
                              changed: true,
                              message: 'your password has updated ' ,
                              };
                        callback(null, {
                              statusCode: 200,
                              body:body
                            });
                          }
                        });
                      }
                    });
                  } else {
                    console.log('User login failed: ' + email);
                    let body={
                      changed: false,
                      message: 'Your old password is not correct' ,
                      };
                callback(null, {
                      statusCode: 400,
                      body:body
                    });
                  }
                }
              });
            }
          }
        });
        }
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////
    
      validateUpdatePasswordRegisteredUser(data){
        return {
             
          'email': data.email, 
          'oldPassWord': data.oldPassWord, 
          'newPassword': data.newPassword
      }
      }
      validateUpdateUserInfo(data){
        return {
             
          'email': data.email, 
          'firstName': data.firstName, 
          'lastName': data.lastName
      }
      }
     
     
      validateGetUserInfo(data) {
        return {
             
            'email': data.email, 
          
        }
    }
    validateObject(data) {
        return {
             
            'email': data.email, 
            'firstName': data.firstName, 
            'lastName': data.lastName,
            'password': data.password,
            'created_at': new Date().toISOString().split("T")[0]
        }
    }

    validateLoginObject(data) {
      return {
           
          'email': data.email, 
          'password': data.password
      }
  }

    validateverifyemail(data) {
      return {
          
          'email': data.email, 
          'verify': data.verify
      }
      
  }
  validateLostPassword(data) {
    return {
        'email': data.email
    }
    
}

validateresetpassword(data) {
  return {
      'email': data.email,
      'lost': data.lost,
      'password': data.password
  }
  
}
getRandomNumber() {
  return this.randomize('A0', 5);
}
}

//////////////////////////////////////////////////////////////////////////////////
////////////   HELPER FUNCTION
//////////////////////////////////////////////////////////////////////////////////


function addUserTorank(email,firstName,fn){
  console.log("Add suer to rank");
  dynamodbOld.putItem({
    TableName: "rank",
    Item: {
      id: {
        S: "1"
      },
      userId: {
        S: email
      },
      firstName: {
        S: firstName
      },
       wins: {
        N: "0"
      }
    },
    ConditionExpression: 'attribute_not_exists (email)'
  }, function(err, data) {
    if (err) return fn(err);
    else fn(null, true);
  });
}

function storeUser(email, password, salt,firstName,lastName,created_at, fn) {
    console.log("#############################################")
    let len = 128;
    cryptoAdd.randomBytes(len, function(err, token) {
      if (err) return fn(err);
      token = token.toString('hex');
      dynamodbOld.putItem({
        TableName: "users",
        Item: {
          email: {
            S: email
          },
           firstName: {
            S: firstName
          },
           lastName: {
            S: lastName
          },
          passwordHash: {
            S: password
          },
          passwordSalt: {
            S: salt
          },
          created_at: {
            S: created_at
          },
          verified: {
            BOOL: false
          },
          adminVerified: {
            BOOL: true
          },
          role: {
            S: "Player"
          },
          verifyToken: {
            S: token
          }
        },
        ConditionExpression: 'attribute_not_exists (email)'
      }, function(err, data) {
        if (err) return fn(err);
        else fn(null, token);
      });
    });
  }

  function sendVerificationEmail(email, token, firstName,fn) {
    let subject = 'Verification Email for Battleship Game' ;
    let verificationLink = 'http://localhost:3000/verify' + '?email=' + encodeURIComponent(email) + '&verify=' + token;
    ses.sendEmail({
      Source: "hejazi.iman@gmail.com",
      Destination: {
        ToAddresses: [
          email
        ]
      },
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Html: {
            Data: '<html><head>'
            + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
            + '<title>' + subject + '</title>'
            + '</head><body>'
            +'Hello '+firstName
            + ' ,Please <a href="' + verificationLink + '">click here to verify your email address</a> or copy & paste the following link in a browser:'
            + '<br><br>'
            + '<a href="' + verificationLink + '">' + verificationLink + '</a>'
            + '</body></html>'
          }
        }
      }
    }, fn);
  }

  function getUser(email, fn) {
    dynamodbOld.getItem({
      TableName: "users",
      Key: {
        email: {
          S: email
        }
      }
    }, function(err, data) {
      if (err) return fn(err);
      else {
        if ('Item' in data) {
          let hash = data.Item.passwordHash.S;
          let salt = data.Item.passwordSalt.S;
          let verified = data.Item.verified.BOOL;
          let adminVerified = data.Item.adminVerified.BOOL;
          let firstName = data.Item.firstName.S;
          let roleOfUser=data.Item.role.S;
          fn(null, hash, salt, verified,adminVerified,firstName,roleOfUser);
        } else {
          fn(null, null); // User not found
        }
      }
    });
  }


  function getUserForUpadatinff(email, fn) {
    dynamodbOld.getItem({
      TableName: "users",
      Key: {
        email: {
          S: email
        }
      }
    }, function(err, data) {
      if (err) return fn(err);
      else {
        if ('Item' in data) {
          let firstName = data.Item.firstName.S;
          let lastName=data.Item.lastName.S;
          fn(null,firstName,lastName);
        } else {
          fn(null, null); // User not found
        }
      }
    });
  }
  function getToken(email, fn) {
    var param = {
      IdentityPoolId: "us-east-1:60372954-b743-4c40-9dbc-b8278a61933e",
      Logins: {}
    };
    param.Logins["login.iman.seng513"] = email;
    cognitoidentity.getOpenIdTokenForDeveloperIdentity(param,
      function(err, data) {
        if (err) return fn(err);
        else fn(null, data.IdentityId, data.Token);
      });
  }

  function computeHash(password, salt, fn) {
     
    let len = 512;
    let iterations = 4096;
    let digest = 'sha512';
    if (3 == arguments.length) {
      crypto.pbkdf2(password, salt, iterations, len, digest, function(err, derivedKey) {
        if (err) return fn(err);
        else fn(null, salt, derivedKey.toString('base64'));
      });
    } else {
      fn = salt;
      crypto.randomBytes(len, function(err, salt) {
        if (err) return fn(err);
        salt = salt.toString('base64');
       computeHash(password, salt, fn);
      });
    }
  }

  function getUserForVerifyEmail(email, fn) {
    let params = {
       Key: {
       email: {S:email}
       },  
       TableName: "users"
      };
      dynamodbOld.getItem(params, function(err, data) {
       
     if (err) {console.log("###################") ;return fn(err);}
     else {
        
       if ('Item' in data) {
        let verified = data.Item.verified.BOOL;
        let verifyToken = null;
         if (!verified) {
           verifyToken = data.Item.verifyToken.S;
         }
         fn(null, verified, verifyToken);
       } else {
         fn(null, null);
       }
     }
   });
 }
 function updateUser(email, fn) {
  dynamodbOld.updateItem({
      TableName: "users",
      Key: {
        email: {
          S: email
        }
      },
      AttributeUpdates: {
        verified: {
          Action: 'PUT',
          Value: {
            BOOL: true
          }
        },
        verifyToken: {
          Action: 'DELETE'
        }
      }
    },
    fn);
}
function getUserLostPassword(email, fn) {
  dynamodbOld.getItem({
    TableName: "users",
    Key: {
      email: {
        S: email
      }
    }
  }, function(err, data) {
    if (err) return fn(err);
    else {
      if ('Item' in data) {
        fn(null, email);
      } else {
        fn(null, null);
      }
    }
  });
}
function storeLostToken(email, fn) {
  var len = 128;
  crypto.randomBytes(len, function(err, token) {
    if (err) return fn(err);
    token = token.toString('hex');
    dynamodbOld.updateItem({
        TableName: "users",
        Key: {
          email: {
            S: email
          }
        },
        AttributeUpdates: {
          lostToken: {
            Action: 'PUT',
            Value: {
              S: token
            }
          }
        }
      },
     function(err, data) {
      if (err) return fn(err);
      else fn(null, token);
    });
  });
}
function sendLostPasswordEmail(email, token, fn) {
  let subject = 'Password Lost for for Battleship Game';
  let lostLink = "http://localhost:3000/resetpassword" +
    '?email=' + email + '&lost=' + token;
  ses.sendEmail({
    Source: "hejazi.iman@gmail.com",
    Destination: {
      ToAddresses: [
        email
      ]
    },
    Message: {
      Subject: {
        Data: subject
      },
      Body: {
        Html: {
          Data: '<html><head>'
          + '<meta http-equiv="Content-Type"  content="text/html; charset=UTF-8" />'
          + '<title>' + subject + '</title>'
          + '</head><body>'
          + 'Please <a href="' + lostLink + '">'
          + 'click here to reset your password</a>'
          + ' or copy & paste the following link in a browser:'
          + '<br><br>'
          + '<a href="' + lostLink + '">' + lostLink + '</a>'
          + '</body></html>'
        }
      }
    }
  }, fn);
}

function updateUserForResetPassword(email, password, salt, fn) {
  dynamodbOld.updateItem({
      TableName: "users",
      Key: {
        email: {
          S: email
        }
      },
      AttributeUpdates: {
        passwordHash: {
          Action: 'PUT',
          Value: {
            S: password
          }
        },
        passwordSalt: {
          Action: 'PUT',
          Value: {
            S: salt
          }
        },
        lostToken: {
          Action: 'DELETE'
        }
      }
    },
    fn);
}

function updateUserInfoFirstandLast(email,fristName,lastName, fn) {
  dynamodbOld.updateItem({
      TableName: "users",
      Key: {
        email: {
          S: email
        }
      },
      AttributeUpdates: {
        firstName: {
          Action: 'PUT',
          Value: {
            S: fristName
          }
        },
        lastName: {
          Action: 'PUT',
          Value: {
            S: lastName
          }
        },
       
      }
    },
    function(err, data) {
      if (err) return fn(err);
      else fn(null, fristName,lastName);
    });
}
function updateUserinRankTable(email,fristName, fn) {
  dynamodbOld.updateItem({
      TableName: "rank",
      Key: {
        userId: {
          S: email
        }
      },
      AttributeUpdates: {
        firstName: {
          Action: 'PUT',
          Value: {
            S: fristName
          }
        }
       
      }
    },
   fn);
}




function getUserForResetPassword(email, fn) {
  dynamodbOld.getItem({
    TableName: "users",
    Key: {
      email: {
        S: email
      }
    }
  }, function(err, data) {
    if (err) return fn(err);
    else {
      if (('Item' in data) && ('lostToken' in data.Item)) {
        let lostToken = data.Item.lostToken.S;
        fn(null, lostToken);
      } else {
        fn(null, null); // User or token not found
      }
    }
  });
}
function updateUserUpdatePassword(email, password, salt, fn) {
  dynamodbOld.updateItem({
      TableName: "users",
      Key: {
        email: {
          S: email
        }
      },
      AttributeUpdates: {
        passwordHash: {
          Action: 'PUT',
          Value: {
            S: password
          }
        },
        passwordSalt: {
          Action: 'PUT',
          Value: {
            S: salt
          }
        }
      }
    },
    fn);
}

function thisUserIsLoggedIn(email, fn) {
  dynamodbNew.query({
    TableName: "socketUser",
    IndexName:'userId-index',
    KeyConditionExpression: "#userId = :userIdIdValue",
      ExpressionAttributeNames:{
            "#userId": "userId"
        },
        ExpressionAttributeValues: {
            ":userIdIdValue":email
        }
  }, function(err, data) {
    if (err) return fn(err);
    else {
      console.log("*** ",data)
      if (data['Count'] !==0) {
        let isLog=true;
        fn(null, isLog);
      } else {
        fn(null, null); // User not found
      }
    }
  });
}
module.exports = BatllshipAuth;