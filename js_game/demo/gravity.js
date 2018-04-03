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
//创建玩家
var player = new drop(new Vector(0, 0));

//陀螺仪构造函数
function Orientation(){}
Orientation.prototype.init = function(){
    window.addEventListener('deviceorientation', oriListener);
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
//回调函数，不能调用自身函数和属性(注意)
function oriListener(e) {

    //获取数据
    (function(e){
        //取得轴转角
        //大于0向下移动
        var beta;
        if(e.beta > 0)
            beta = e.beta > 90 ? 90 : e.beta;
        else
            beta = e.beta < -90 ? -90 : e.beta;
        //大于0向右移动
        var gamma = e.gamma
        //取得轴加速度
        /*if(e.accelerationIncludingGravity){
            //手机竖起，即向下加速度
            beta = -e.accelerationIncludingGravity.y * 300
            //手机右倾，即向右加速度
            gamma = e.accelerationIncludingGravity.x * 300
        }*/
    
        //根据转角，确定玩家斜坡加速度
        var tempox = (1 / 2 * 9.8 * Math.sin(gamma / 180 * 3.14)).toFixed(2);
        var tempoy = (1 / 2 * 9.8 * Math.sin(beta / 180 * 3.14)).toFixed(2);
        player.speed = new Vector(tempox, tempoy);
    })(e)
    
    //玩家移动
    player.act(function(step){
        //设置最大时间间隔
        var maxStep = 0.05;
        while (step > 0) {
            var thisStep = Math.min(step, maxStep);
            //玩家移动
            var tempos = player.pos.plus(player.speed.times(thisStep));
            if(tempos.x > 0)
                tempos.x = tempos.x > 486 ? 486 :  tempos.x;
            else
                tempos.x = 0;
            if(tempos.y > 0)
                tempos.y = tempos.y > 486 ? 486 :  tempos.y;
            else
                tempos.y = 0;
            player.pos = tempos;
            var drop = document.getElementById("ball");
            var wall = document.getElementsByClassName("contain")[0];
            drop.style.left = tempos.x.toFixed(0) + "px";
            drop.style.top = tempos.y.toFixed(0) + "px";
            step -= thisStep;
        }
    });
};

//实例创建
(new Orientation()).init();
