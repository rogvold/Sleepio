
var UsersModule = require('cloud/modules/UsersModule');
var SessionsModule = require('cloud/modules/SessionsModule');
var PusherModule = require('cloud/modules/PusherModule');

var ECR = require('cloud/helpers/ErrorCodesRegistry');

//users
Parse.Cloud.define("login", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    Parse.Cloud.useMasterKey();
    UsersModule.logIn(data, function(user){
        response.success(user);
    }, function(err){
        response.error(err);
    }, true);
});


//sessions
Parse.Cloud.define("uploadData", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    var user = request.user;
    if (user == undefined){
        response.error({code: ECR.ACCESS_DENIED.code, message: 'you are not authorized'});
        return;
    }
    data.userId = user.id;
    if ( (data.breathingPoints == undefined || data.breathingPoints.length == 0) &&
         (data.heartRatePoints == undefined || data.heartRatePoints.length == 0)
    ){
        response.error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'breathingPoints and heartRatePoints are not defined'});
        return;
    }


    var d = data;
    d.dataArray = [
        {
            type: 'BREATHING',
            points: data.breathingPoints
        },
        {
            type: 'HEART_RATE',
            points: data.heartRatePoints
        }
    ];
    SessionsModule.savePointsToChunks(d, function(session){
        response.success(session);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadUserSessions", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    SessionsModule.loadUserSessions(data, function(sessions){
        response.success({sessions: sessions});
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("loadSessionData", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    SessionsModule.loadSessionData(data, function(sessionData){
        response.success(sessionData);
    }, function(err){
        response.error(err);
    });
});

Parse.Cloud.define("deleteSession", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    SessionsModule.deleteSession(data, function(){
        response.success({status: 'ok'});
    }, function(err){
        response.error(err);
    });
});

//realtime
Parse.Cloud.define("uploadRealtimeData", function(request, response) {
    var data = request.params.data;
    if (data == undefined){
        data = request.params;
    }
    var user = request.user;
    if (user == undefined){
        response.error({code: ECR.ACCESS_DENIED.code, message: 'you are not authorized'});
        return;
    }

    var channelName = 'user_data_' + user.id + '';
    var eventName = 'realtime_data';
    PusherModule.sendMessage(channelName, eventName, data, function(){
        response.success({status: 'ok'});
    }, function(err){
        response.error(err);
    });
});