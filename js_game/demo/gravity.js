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
drop.prototype.act = function(step){
    var newPos = this.pos.plus(this.speed.times(step));
     //改变水滴坐标
    if(newPos.x <= 290)
        this.pos.x = newPos.x
    if(newPos.y <= 340)
        this.pos.y = newPos.y
    //显示水滴新位置
    var style = document.querySelector("#ball").style;
    style.left = this.pos.x + "px";
    style.top = this.pos.y + "px";
}

//陀螺仪构造函数
function Orientation(){}
Orientation.prototype.init = function(){
    this.player = new drop(new Vector(0, 0));
    window.addEventListener('deviceorientation', this.oriListener, false);
}
//获取数据
Orientation.prototype.getData = function(e){
    //取得轴转角
    //大于0向下移动
    var a = e.beta || "1"
    alert(a);
    alert(e.gamma || "2");
    var beta = e.beta > 90 ? 90 : e.beta;
    var beta = e.beta < -90 ? -90 : e.beta;
    //大于0向右移动
    var gamma = e.gamma
    alert(beta);
    alert(gamma);
    //取得轴加速度
    /*if(e.accelerationIncludingGravity){
        //手机竖起，即向下加速度
        beta = -e.accelerationIncludingGravity.y * 300
        //手机右倾，即向右加速度
        gamma = e.accelerationIncludingGravity.x * 300
    }*/

    //现在的速度，与之前的比较，确定玩家速度
    var tempox = (gamma / 10).toFixed(2);
    var tempoy = (beta / 10).toFixed(2);
    if(tempox - this.player.speed.x > 10)
        this.player.speed.x = tempox;
    if(tempoy - this.player.speed.y > 10)
        this.player.speed.y = tempoy;
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
//回调函数
Orientation.prototype.oriListener = function(e) {
    setTimeout(function(){
        //deviceMotionHandler(e);
        this.getData(e);
        this.player.act(0.1);
    },100);
};

//实例创建
(new Orientation()).init();