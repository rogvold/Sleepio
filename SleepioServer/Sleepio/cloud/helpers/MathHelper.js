/**
 * Created by sabir on 03.12.16.
 */

var MathHelper = {

    DOWNSAMPLING_NUMBER: 120,

    getCalcParams: function(points){
        var res = {};
        if (points == undefined || points.length == 0){
            return res;
        }
        var hrs = points.map(function(p){return p.value})
        var sum = 0;
        var min = 1000000;
        var max = -1;
        for (var i in hrs){
            var hr = hrs[i];
            hr = +hr;
            sum = sum + hr;
            if (hr < min){
                min = hr;
            }
            if (hr > max){
                max = hr;
            }
        }
        var avr = 1.0 * sum / hrs.length;
        avr = Math.round(avr * 10) / 10.0;
        return {
            min: min,
            avr: avr,
            max: max,
            n: hrs.length,
            points: this.makePointsDownsampling(points)
        }
    },

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
    }

}

module.exports = MathHelper;