/**
 * Created by sabir on 03.12.16.
 */

var MathHelper = {

    DOWNSAMPLING_NUMBER: 200,

    makePointsDownsampling: function(points, max){
        if (max == undefined){
            max = this.DOWNSAMPLING_NUMBER;
        }
        if (points.length <= max){
            return points;
        }
        var arr = [];
        var n = points.length;
        var startTime = points[0].t;
        var endTime = points[n - 1].t;
        var dt = 1.0 * (endTime - startTime) / max;

        var step = 1.0 * n / max;
        for (var i = 0; i < max; i++){
            var a = Math.ceil(step * i);
            var b = Math.floor(step * (i + 1));
            b = Math.min(b, n - 1);
            var sum = 0;
            var t = startTime + +points[a].t;
            var kk = 0;
            for (var j = a; j <= b; j++){
                sum+= +points[j].value;
                kk++;
            }
            var avr = 1.0 * sum / kk;
            avr = Math.round(avr * 10) / 10.0;
            arr.push({
                t: t,
                value: avr
            });
        }
        return arr;
    },

    getPlotData: function(heartRatePoints, breathingPoints, fromTimestamp){
        //console.log('MathHelper: getPlotData: heartRatePoints, breathingPoints = ', heartRatePoints, breathingPoints);
        if (fromTimestamp == undefined){
            fromTimestamp = 0;
        }
        var arr = [];
        var map = {};

        for (var i in heartRatePoints){
            var hrD = heartRatePoints[i];
            var t = hrD.t;
            var key = t + '';
            if (map[key] == undefined){
                map[key] = {};
            }
            map[key].t = t;
            map[key].hr = hrD.value;
        }


        for (var i in breathingPoints){
            var bD = breathingPoints[i];
            var t = bD.t;
            var key = t + '';
            if (map[key] == undefined){
                map[key] = {};
            }
            map[key].t = t;
            map[key].breathing = bD.value;
        }


        for (var key in map){
            var d = map[key];
            arr.push({t: d.t, breathing: d.breathing, hr: d.hr});
        }

        var lastHR = undefined;
        var lastBreathing = undefined;



        arr.sort(function(a, b){
            return (a.t - b.t)
        });

        for (var i in arr){
            var a = arr[i];
            if (a.hr != undefined){
                lastHR = a.hr;
            }else {
                arr[i].hr = lastHR;
            }
            if (a.breathing != undefined){
                lastBreathing = a.breathing;
            }else {
                arr[i].breathing = lastBreathing;
            }
        }

        arr = arr.filter(function(a){
            return (a.t >= fromTimestamp)
        });

        return arr;

    }

}

export default MathHelper;