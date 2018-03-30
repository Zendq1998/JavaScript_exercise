
/*
一系列构造函数的定义
*/

//向量构造函数
function Vector(x, y) {
    this.x = x; this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor) {
    return new Vector(this.x * factor, this.y * factor);
};

//玩家构造函数
function Player(pos) {
    //玩家是半格子高度，为了与@对齐，纵坐标要上移
    this.pos = pos.plus(new Vector(0, -0.5));
    //初始化玩家大小
    this.size = new Vector(0.8, 1.5);
    //初始速度向量为0
    this.speed = new Vector(0, 0);
}
//元素类型
Player.prototype.type = "player";
//定义玩家移动速度
var playerXSpeed = 7;
//定义玩家水平方向的移动行为
Player.prototype.moveX = function(step, level, keys) {
    this.speed.x = 0;
    //根据按键决定玩家移动
    if (keys.left) this.speed.x -= playerXSpeed;
    if (keys.right) this.speed.x += playerXSpeed;
    var motion = new Vector(this.speed.x * step, 0);
    var newPos = this.pos.plus(motion);
    //检查是否存在障碍物
    var obstacle = level.obstacleAt(newPos, this.size);
    if (obstacle)
        level.playerTouched(obstacle);
    else
        this.pos = newPos;
};


//定义玩家垂直方向的移动行为
Player.prototype.moveY = function(step, level, keys) {
    //定义重力
    var gravity = 30;
    //定义速度，注意这里的速度是减去重力后的速度
    var jumpSpeed = 17;
    //初始化垂直方向的速度
    this.speed.y += step * gravity;
    var motion = new Vector(0, this.speed.y * step);
    var newPos = this.pos.plus(motion);
    var obstacle = level.obstacleAt(newPos, this.size);
    if (obstacle) {
        level.playerTouched(obstacle);
        //注意这里的下速度必须为0，否则有一个bug，玩家会贴墙走
        if (keys.up && this.speed.y > 0)
            this.speed.y = -jumpSpeed;
        else
            this.speed.y = 0;
    } 
    else {
        this.pos = newPos;
    }
};
//总的玩家的移动实现
Player.prototype.act = function(step, level, keys) {
    this.moveX(step, level, keys);
    this.moveY(step, level, keys);
    //判断玩家是否与其他元素碰撞
    var otherActor = level.actorAt(this);
    if (otherActor)
        level.playerTouched(otherActor.type, otherActor);
    // 如果玩家死亡，通过玩家下沉，缩小来表示游戏结束
    if (level.status == "lost") {
        this.pos.y += step;
        this.size.y -= step;
    }
};


//熔浆构造函数
function Lava(pos,ch){
    this.pos = pos;
    this.size = new Vector(1,1);
    //判断熔浆类型，决定速度向量
    if(ch == "=")
        this.speed = new Vector(2,0);
    else if(ch == "|")
        this.speed = new Vector(0,2);
    else{
        this.speed = new Vector(0,2);
        //如果熔浆有repeatPos属性，对象会直接返回原位置，否则改变速度，向原位置反向移动
        this.repeatPos = pos;
    }
}
//元素类型
Lava.prototype.type = "lava";
//元素移动方式
Lava.prototype.act = function(step, level) {
    var newPos = this.pos.plus(this.speed.times(step));
    //如果前面没有障碍物，移动元素
    if (!level.obstacleAt(newPos, this.size))
        this.pos = newPos;
    //如果是该类型，直接回到原始位置    
    else if (this.repeatPos)
        this.pos = this.repeatPos;
    //如果是该类型，速度方向改变
    else
        this.speed = this.speed.times(-1);
};


//硬币构造函数
function Coin(pos){
    //初始化硬币原始位置
    this.basePos = this.pos = pos.plus(new Vector(0.2,0.1));
    this.size = new Vector(0.6,0.6);
    //硬币跳跃幅度，在圆的各个方向都可以跳跃
    this.wobble = Math.random() * Math.PI * 2;
}
//元素类型
Coin.prototype.type = "coin";
//定义晃动时间和幅度
var wobbleSpeed = 8, wobbleDist = 0.07;
//晃动行为的实现
Coin.prototype.act = function(step) {
    //定义圆周角度
    this.wobble += step * wobbleSpeed;
    var wobblePos = Math.sin(this.wobble) * wobbleDist;
    this.pos = this.basePos.plus(new Vector(0, wobblePos));
};


//actorChars对象将表示某个物体的字符转化为它的构造函数
var actorChars = {
    "@" : Player,
    "o" : Coin,
    "=" : Lava,
    "|" : Lava,
    "v" : Lava
};


var obj = {
    "Vector" : Vector,
    "actorChars" : actorChars
}

module.exports = obj;

