/**
 * Created by sabir on 04.12.16.
 */

import * as constants from '../constants/AccountsConstants.js'

var Pusher = require('pusher-js');

let PusherHelper = {


    getPusherInstance:  function(){
        var pusher = window.pusher;
        if (pusher == undefined){
            pusher = new Pusher(constants.PUSHER_KEY, {cluster: 'eu'});
            window.pusher = pusher;
            return pusher;
        }
        return pusher;
    },

    subscribeOnChannel: function(channelName){
        var pusher = this.getPusherInstance();
        var channels = pusher.allChannels();
        var f = false;
        for (var i = 0; i < channels.length; i++) {
            var channel = channels[i];
            if (channelName == channel.name){
                f = true;
            }
        }
        if (f == false){
            return window.pusher.subscribe(channelName);
        }
    },

    getChannelByName: function(channelName){
        var pusher = this.getPusherInstance();
        var channels = pusher.allChannels();
        for (var i = 0; i < channels.length; i++) {
            var channel = channels[i];
            if (channelName == channel.name){
                return channel;
            }
        }
        return undefined;
    },

    unsubscribeFromChannel: function(channelName) {
        var pusher = this.getPusherInstance();
        window.pusher.unsubscrive(channelName);
    },

    bindEvent: function(channelName, eventName, callback){
        var channel = this.getChannelByName(channelName);
        if (channel == undefined){
            channel = this.subscribeOnChannel(channelName);
        }
        channel.bind(eventName, function (data) {
            data.channelName = channelName;
            console.log('event ' + eventName + ' is triggered with data = ', data);
            callback(data);
        });
    }

}

export default PusherHelper