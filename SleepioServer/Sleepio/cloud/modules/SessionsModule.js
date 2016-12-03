/**
 * Created by sabir on 02.12.16.
 */

var ECR = require('cloud/helpers/ErrorCodesRegistry');
var CommonHelper = require('cloud/helpers/CommonHelper');
var MathHelper = require('cloud/helpers/MathHelper');

var SessionsModule = {

    SESSION_CLASS_NAME: 'SleepSession',
    DATA_CHUNK_CLASS_NAME: 'DataChunk',
    DATA_CHUNK_SIZE: 1000,
    DATA_TYPES: {
        HEART_RATE: 'HEART_RATE',
        BREATHING: 'BREATHING'
    },

    transformSession: function(s){
        if (s == undefined){
            return undefined;
        }
        return {
            id: s.id,
            timestamp: (new Date(s.createdAt)).getTime(),
            startTimestamp: s.get('startTimestamp'),
            userId: s.get('userId'),
            calcData: s.get('calcData'),
            duration: s.get('duration')
        }
    },

    transformDataChunk: function(chunk){
        if (chunk == undefined){
            return undefined;
        }
        return {
            id: chunk.id,
            timestamp: (new Date(chunk.createdAt)).getTime(),
            sessionId: chunk.get('sessionId'),
            number: chunk.get('number'),
            points: chunk.get('points'),
            dataType: chunk.get('dataType')
        }
    },

    loadSessionByStartTimestampAndUserId: function(data, success, error, shouldTransform){
        if (data == undefined || data.startTimestamp == undefined || data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'startTimestamp or userId is not defined'});
            return;
        }
        var self = this;
        var q = new Parse.Query(this.SESSION_CLASS_NAME);
        q.equalTo('startTimestamp', data.startTimestamp);
        q.equalTo('userId', data.userId);
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            if (results.length == 0){
                success(undefined);
                return;
            }
            if (shouldTransform == true){
                success(self.transformSession(results[0]));
            }else {
                success(results[0]);
            }
        });
    },

    loadLazylySessionByStartTimestampAndUserId: function(data, success, error, shouldTransform){
        var self = this;
        this.loadSessionByStartTimestampAndUserId(data, function(s){
            if (s != undefined){
                success(s);
                return;
            }
            var Session = Parse.Object.extend(self.SESSION_CLASS_NAME);
            var session = new Session();
            session.set('startTimestamp', data.startTimestamp);
            session.set('userId', data.userId);
            session.save().then(function(savedSession){
                if (shouldTransform == true){
                    savedSession = self.transformSession(savedSession);
                }
                success(savedSession);
            });
        }, error, shouldTransform);
    },

    loadSessionChunks: function(sessionId, callback, shouldTransform){
        var self = this;
        var q = new Parse.Query(self.DATA_CHUNK_CLASS_NAME);
        q.limit(1000);
        q.equalTo('sessionId', sessionId);
        q.addAscending('number');
        q.limit(1000);
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            if (shouldTransform == true){
                results = results.map(function(r){
                    return self.transformDataChunk(r);
                });
            }
            callback(results);
        });
    },

    deleteAllSessionChunks: function(sessionId, callback){
        var self = this;
        this.loadSessionChunks(sessionId, function(chunks){
                if (chunks.length == 0) {
                    callback();
                    return;
                }
                Parse.Object.destroyAll(chunks, {
                    success: function(){
                        callback();
                    }
                });
            }
        );
    },


    //data: userId, startTimestamp, dataArray
    //dataArray:
        // [
        //      {
        //          type: "BREATHING",
        //          points: [{t: 0, value: 123}, {t: 300, value: 203},.... ]
        //      },
        //      {
        //          type: "HEART_RATE",
        //          points: [{t: 0, value: 55}, {t: 300, value: 56},.... ]
        //      },
        // ]
    savePointsToChunks: function(data, success, error){
        var self = this;
        var Chunk = Parse.Object.extend(self.DATA_CHUNK_CLASS_NAME);
        this.loadLazylySessionByStartTimestampAndUserId(data, function(session){
            self.deleteAllSessionChunks(session.id, function(){
                var dataArray = data.dataArray;
                if (dataArray == undefined || dataArray.length == 0){
                    success(self.transformSession(session));
                    return;
                }
                var chunks = [];
                var calcData = {};
                var duration = 0;
                for (var i in dataArray){
                    var d = dataArray[i];
                    var points = d.points;
                    var n = Math.ceil(1.0 * points.length / self.DATA_CHUNK_SIZE);
                    var cData = MathHelper.getCalcParams(points);
                    calcData[d.type] = cData;
                    for (var j = 0; j < n; j++){
                        var from = j * self.DATA_CHUNK_SIZE;
                        var to = (j + 1) * self.DATA_CHUNK_SIZE;
                        var pts = points.slice(from, to);
                        var chunk = new Chunk();
                        chunk.set('sessionId', session.id);
                        chunk.set('number', j);
                        chunk.set('points', pts);
                        chunk.set('dataType', d.type);
                        chunks.push(chunk);
                        if (pts.length > 0){
                            if (pts[pts.length - 1].t > duration){
                                duration = pts[pts.length - 1].t;
                            }
                        }
                    }
                }
                Parse.Object.saveAll(chunks).then(function(){
                    session.set('calcData', calcData);
                    session.set('duration', duration);
                    session.save().then(function(savedSession){
                        success(self.transformSession(savedSession));
                    });
                }, function(err){
                    error(err);
                });
            });
        }, error, false);
    },

    loadUserSessions: function(data, succes, error){
        if (data == undefined || data.userId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'userId is not defined'});
            return;
        }
        var self = this;
        var q = new Parse.Query(this.SESSION_CLASS_NAME);
        q.limit(1000);
        q.addDescending('startTimestamp');
        q.equalTo('userId', data.userId);
        q.find(function(results){
            if (results == undefined){
                results = [];
            }
            results = results.map(function(r){
                return self.transformSession(r);
            });
            succes(results);
        });
    },

    loadSessionData: function(data, success, error){
        if (data == undefined || data.sessionId == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'sessionId is not defined'});
            return;
        }
        var self = this;
        this.loadSessionChunks(data.sessionId, function(chunks){
            var map = {};
            for (var i in chunks){
                var c = chunks[i];
                if (map[c.dataType] == undefined){
                    map[c.dataType] = [];
                }
                map[c.dataType] = map[c.dataType].concat(c.points);
            }
            success(map);
        }, true);
    },

    deleteSession: function(data, success, error){
        if (data == undefined || data.id == undefined){
            error({code: ECR.INCORRECT_INPUT_DATA.code, message: 'id is not defined'});
            return;
        }
        var self = this;
        this.deleteAllSessionChunks(data.id, function(){
            var q = new Parse.Query(self.SESSION_CLASS_NAME);
            q.get(data.id, {
                success: function(sess){
                    sess.destroy({
                        success: function(){
                            success();
                        },
                        error: function(){
                            success();
                        }
                    });
                }
            });
        });
    }

}


module.exports = SessionsModule;