/**
 * Created by sabir on 26.08.16.
 */
var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');

var UsersModule = {

    transformUser: function(u){
        if (u == undefined){
            return undefined;
        }
        return {
            id: u.id,
            timestamp: new Date(u.createdAt).getTime(),
            email: u.get('email'),
            firstName: u.get('firstName'),
            lastName: u.get('lastName'),
            avatar: u.get('avatar')
        }
    },


    logIn: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.email == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'email is not defined'});
            return;
        }
        if (data.password == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'password is not defined'});
            return;
        }
        var self = this;
        Parse.User.logIn(data.email.toLowerCase(), data.password, {
            success: function(user){
                var sessionToken = user.sessionToken;
                var u = self.transformUser(user);
                u.sessionToken = user.get('sessionToken');
                success(u);
            },
            error: function(){
                error({code: ECR.INCORRECT_LOGIN_CREDENTIALS.code, message: 'cannot login'});
            }
        });
    },

    signUp: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.email == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'email is not defined'});
            return;
        }
        if (data.password == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'password is not defined'});
            return;
        }
        var user = new Parse.User();
        user.set("username", data.email.toLowerCase());
        user.set("password", data.password);
        user.set("email", data.email.toLowerCase());
        var self = this;
        user.signUp(null, {
            success: function(user) {
                self.logIn(data, success, error);
            },
            error: function(user, err) {
                error({code: ECR.INCORRECT_SIGNUP_CREDENTIALS.code, message: 'cannot sign up'});
            }
        });
    },


    loadUser: function(userId, success, error, shouldTransform){
        shouldTransform = (shouldTransform == undefined) ? false : shouldTransform;
        if (userId == undefined){
            success(undefined);
            return;
        }
        var q = new Parse.Query(Parse.User);
        var self = this;
        q.get(userId, {
            success: function(u){
                if (shouldTransform == true){
                    u = self.transformUser(u);
                }
                success(u);
            },
            error: function(){
                error(undefined);
            }
        });
    },

    loadUserByEmail: function(email, callback, notFoundCallback){
        var q = new Parse.Query(Parse.User);
        q.equalTo('email', email);
        var self = this;
        q.find({
            success: function(results){
                if (results == undefined || results.length == 0){
                    notFoundCallback();
                    return;
                }
                callback(self.transformUser(results[0]));
            }
        });
    },


    updateUser: function(data, success, error){
        if (data == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'data is not defined'});
            return;
        }
        if (data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var self = this;
        this.loadUser(data.id, function(u){
            for (var key in data){
                if (key == 'userId'){
                    continue;
                }
                u.set(key, data[key]);
            }
            u.save().then(function(updatedUser){
                success(self.transformUser(updatedUser));
            });
        }, function(){});
    }

};

module.exports = UsersModule;