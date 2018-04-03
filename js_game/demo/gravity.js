//向量构造函数
function Vector(x, y){
    this.x = x; this.y = y;
}
Vector.prototype.plus = function(other){
    return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor){
    return new Vector(this.x * factor, this.y * factor);
};


//水滴构造函数
function drop(pos){
    //初始坐标
    this.pos = pos;
    //初始速度向量为0
    this.speed = new Vector(0, 0);
}
//水滴移动方法
drop.prototype.act = function(frameFunc) {
    var lastTime = null;
    function frame(time) {
        var stop = false;
        if (lastTime != null) {
            //求间隔
            var timeStep = Math.min(time - lastTime, 100) / 1000;
            frameFunc(timeStep)
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    //frame回调函数，参数是触发函数的当前时间
    requestAnimationFrame(frame);
}
//陀螺仪构造函数
function Orientation(){
    this.player = new drop(new Vector(0, 0));
    alert(this.player.speed)
}
Orientation.prototype.init = function(){
    window.addEventListener('deviceorientation', this.oriListener);
}

//旋转图标(水滴)
/*Orientation.prototype.rotation = function(e){
    function deviceMotionHandler(e) {
        var beta = e.beta
        var rotation = "rotate(" + beta + "deg)";
        var style = document.querySelector("#imgLogo").style;
        style.webkitTransform = rotation;
    }
}*/
//回调函数，不能调用自身函数(注意)
Orientation.prototype.oriListener = function(e) {
        //deviceMotionHandler(e);
        getData(e);
        this.player.act(function(step){
            //设置最大时间间隔
            var maxStep = 0.05;
            while (step > 0) {
                var thisStep = Math.min(step, maxStep);
                //玩家移动
                var tempos = this.player.pos + this.player.speed.times(thisStep);
                tempos.x = tempos.x > 486 ? 486 :  tempos.x;
                tempos.y = tempos.y > 486 ? 486 :  tempos.y;
                this.player.pos = tempos;
                var style = document.querySelector("#ball");
                style.left = tempos.x;
                style.top = tempos.y;
                step -= thisStep;
            }
        });
        //获取数据
        function getData(e){
            //取得轴转角
            //大于0向下移动
            var beta = e.beta > 90 ? 90 : e.beta;
            var beta = e.beta < -90 ? -90 : e.beta;
            //大于0向右移动
            var gamma = e.gamma
            //取得轴加速度
            /*if(e.accelerationIncludingGravity){
                //手机竖起，即向下加速度
                beta = -e.accelerationIncludingGravity.y * 300
                //手机右倾，即向右加速度
                gamma = e.accelerationIncludingGravity.x * 300
            }*/
        
            //根据现在的速度，确定玩家速度
            var tempox = (gamma / 10).toFixed(2);
            var tempoy = (beta / 10).toFixed(2);
            this.player.speed = new Vector(tempox, tempoy);
            alert("Hello");
            alert(this.player.speed.y);
        }
};

//实例创建
(new Orientation()).init();