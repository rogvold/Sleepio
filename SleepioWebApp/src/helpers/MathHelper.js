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
    }

}

export default MathHelper;