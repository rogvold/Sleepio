/**
 * Created by sabir on 04.12.16.
 */

var constants = require('cloud/constants');

var Pusher = require('cloud/modules/node_modules/pusher/parse');

//instructions are here
//                      https://github.com/pusher/pusher-http-node

var PusherModule = {

    sendMessage: function(channelName, eventName, message, success, error){

        var pusher = new Pusher({

            appId: constants.PUSHER_APP_ID,
            key: constants.PUSHER_KEY,
            secret: constants.PUSHER_SECRET,
            cluster: 'eu'
        });

        pusher.trigger(channelName, eventName, { message: message }, function(err, request, response){

            if (err != undefined){
                error(err);
            }else {
                success(response);
            }

        });

    }

};

module.exports = PusherModule;