/*
1.一系列构造函数的定义
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

//这里的速度有点晕，感觉有歧义
//定义重力
var gravity = 30;
//定义速度，注意这里的速度是减去重力后的速度
var jumpSpeed = 17;
//定义玩家垂直方向的移动行为
Player.prototype.moveY = function(step, level, keys) {
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


/*
2.加载地图的实现
*/

//用字符串数组存储地图
var GAME_LEVELS = [
   ["                                                                                ",
    "                                                                                ",
    "                                                                                ",
    "                                                                                ",
    "                                                                                ",
    "                                                                                ",
    "                                                                  xxx           ",
    "                                                   xx      xx    xx!xx          ",
    "                                    o o      xx                  x!!!x          ",
    "                                                                 xx!xx          ",
    "                                   xxxxx                          xvx           ",
    "                                                                            xx  ",
    "  xx                                      o o                                x  ",
    "  x                     o                                                    x  ",
    "  x                                      xxxxx                             o x  ",
    "  x          xxxx       o                                                    x  ",
    "  x  @       x  x                                                xxxxx       x  ",
    "  xxxxxxxxxxxx  xxxxxxxxxxxxxxx   xxxxxxxxxxxxxxxxxxxx     xxxxxxx   xxxxxxxxx  ",
    "                              x   x                  x     x                    ",
    "                              x!!!x                  x!!!!!x                    ",
    "                              x!!!x                  x!!!!!x                    ",
    "                              xxxxx                  xxxxxxx                    ",
    "                                                                                ",
    "                                                                                "],
   ["                                      x!!x                        xxxxxxx                                    x!x  ",
    "                                      x!!x                     xxxx     xxxx                                 x!x  ",
    "                                      x!!xxxxxxxxxx           xx           xx                                x!x  ",
    "                                      xx!!!!!!!!!!xx         xx             xx                               x!x  ",
    "                                       xxxxxxxxxx!!x         x                                    o   o   o  x!x  ",
    "                                                xx!x         x     o   o                                    xx!x  ",
    "                                                 x!x         x                                xxxxxxxxxxxxxxx!!x  ",
    "                                                 xvx         x     x   x                        !!!!!!!!!!!!!!xx  ",
    "                                                             xx  |   |   |  xx            xxxxxxxxxxxxxxxxxxxxx   ",
    "                                                              xx!!!!!!!!!!!xx            v                        ",
    "                                                               xxxx!!!!!xxxx                                      ",
    "                                               x     x            xxxxxxx        xxx         xxx                  ",
    "                                               x     x                           x x         x x                  ",
    "                                               x     x                             x         x                    ",
    "                                               x     x                             xx        x                    ",
    "                                               xx    x                             x         x                    ",
    "                                               x     x      o  o     x   x         x         x                    ",
    "               xxxxxxx        xxx   xxx        x     x               x   x         x         x                    ",
    "              xx     xx         x   x          x     x     xxxxxx    x   x   xxxxxxxxx       x                    ",
    "             xx       xx        x o x          x    xx               x   x   x               x                    ",
    "     @       x         x        x   x          x     x               x   x   x               x                    ",
    "    xxx      x         x        x   x          x     x               x   xxxxx   xxxxxx      x                    ",
    "    x x      x         x       xx o xx         x     x               x     o     x x         x                    ",
    "!!!!x x!!!!!!x         x!!!!!!xx     xx!!!!!!!!xx    x!!!!!!!!!!     x     =     x x         x                    ",
    "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxx     x!!!!!!!xx!     xxxxxxxxxxxxx xx  o o  xx                    ",
    "!!!!x x!!!!!!x         x!!!!!x    o                 xx!!!!!!xx !                    xx     xx                     ",
    "!!!!x x!!!!!!x         x!!!!!x                     xx!!!!!!xx  !                     xxxxxxx                      ",
    "!!!!x x!!!!!!x         x!!!!!xx       xxxxxxxxxxxxxx!!!!!!xx   !                                                  ",
    "!!!!x x!!!!!!x         x!!!!!!xxxxxxxxx!!!!!!!!!!!!!!!!!!xx    !                                                  ",
    "!!!!x x!!!!!!x         x!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xx     !                                                  "],
    ["                                                                                                              ",
     "                                                                                                              ",
     "                                                                                                              ",
     "                                                                                                              ",
     "                                                                                                              ",
     "                                        o                                                                     ",
     "                                                                                                              ",
     "                                        x                                                                     ",
     "                                        x                                                                     ",
     "                                        x                                                                     ",
     "                                        x                                                                     ",
     "                                       xxx                                                                    ",
     "                                       x x                 !!!        !!!  xxx                                ",
     "                                       x x                 !x!        !x!                                     ",
     "                                     xxx xxx                x          x                                      ",
     "                                      x   x                 x   oooo   x       xxx                            ",
     "                                      x   x                 x          x      x!!!x                           ",
     "                                      x   x                 xxxxxxxxxxxx       xxx                            ",
     "                                     xx   xx      x   x      x                                                ",
     "                                      x   xxxxxxxxx   xxxxxxxx              x x                               ",
     "                                      x   x           x                    x!!!x                              ",
     "                                      x   x           x                     xxx                               ",
     "                                     xx   xx          x                                                       ",
     "                                      x   x= = = =    x            xxx                                        ",
     "                                      x   x           x           x!!!x                                       ",
     "                                      x   x    = = = =x     o      xxx       xxx                              ",
     "                                     xx   xx          x                     x!!!x                             ",
     "                              o   o   x   x           x     x                xxv        xxx                   ",
     "                                      x   x           x              x                 x!!!x                  ",
     "                             xxx xxx xxx xxx     o o  x!!!!!!!!!!!!!!x                   vx                   ",
     "                             x xxx x x xxx x          x!!!!!!!!!!!!!!x                                        ",
     "                             x             x   xxxxxxxxxxxxxxxxxxxxxxx                                        ",
     "                             xx           xx                                         xxx                      ",
     "  xxx                         x     x     x                                         x!!!x                xxx  ",
     "  x x                         x    xxx    x                                          xxx                 x x  ",
     "  x                           x    xxx    xxxxxxx                        xxxxx                             x  ",
     "  x                           x           x                              x   x                             x  ",
     "  x                           xx          x                              x x x                             x  ",
     "  x                                       x       |xxxx|    |xxxx|     xxx xxx                             x  ",
     "  x                xxx             o o    x                              x         xxx                     x  ",
     "  x               xxxxx       xx          x                             xxx       x!!!x          x         x  ",
     "  x               oxxxo       x    xxx    x                             x x        xxx          xxx        x  ",
     "  x                xxx        xxxxxxxxxxxxx  x oo x    x oo x    x oo  xx xx                    xxx        x  ",
     "  x      @          x         x           x!!x    x!!!!x    x!!!!x    xx   xx                    x         x  ",
     "  xxxxxxxxxxxxxxxxxxxxxxxxxxxxx           xxxxxxxxxxxxxxxxxxxxxxxxxxxxx     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ",
     "                                                                                                              ",
     "                                                                                                              "],
    ["                                                                                                  xxx x       ",
     "                                                                                                      x       ",
     "                                                                                                  xxxxx       ",
     "                                                                                                  x           ",
     "                                                                                                  x xxx       ",
     "                          o                                                                       x x x       ",
     "                                                                                             o o oxxx x       ",
     "                   xxx                                                                                x       ",
     "       !  o  !                                                xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx       ",
     "       x     x                                                x   x x   x x   x x   x x   x x   x x           ",
     "       x= o  x            x                                   xxx x xxx x xxx x xxx x xxx x xxx x xxxxx       ",
     "       x     x                                                  x x   x x   x x   x x   x x   x x     x       ",
     "       !  o  !            o                                  xxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxxxx       ",
     "                                                                                                              ",
     "          o              xxx                              xx                                                  ",
     "                                                                                                              ",
     "                                                                                                              ",
     "                                                      xx                                                      ",
     "                   xxx         xxx                                                                            ",
     "                                                                                                              ",
     "                          o                                                     x      x                      ",
     "                                                          xx     xx                                           ",
     "             xxx         xxx         xxx                                 x                  x                 ",
     "                                                                                                              ",
     "                                                                 ||                                           ",
     "  xxxxxxxxxxx                                                                                                 ",
     "  x         x o xxxxxxxxx o xxxxxxxxx o xx                                                x                   ",
     "  x         x   x       x   x       x   x                 ||                  x     x                         ",
     "  x  @      xxxxx   o   xxxxx   o   xxxxx                                                                     ",
     "  xxxxxxx                                     xxxxx       xx     xx     xxx                                   ",
     "        x=                  =                =x   x                     xxx                                   ",
     "        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   x!!!!!!!!!!!!!!!!!!!!!xxx!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
     "                                                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
     "                                                                                                              "]
];
  
//定义构造函数根据地图创建地图对象
function Level(plan){
    this.width = plan[0].length;
    this.height = plan.length;
    //grid二维数组存储字符串化的地图
    this.grid = [];
    //actors储存活动元素，lava，coin，player
    this.actors = [];
    //y表示纵坐标，x表示横坐标
    for (var y = 0; y < this.height; y++) {
        var line = plan[y], gridLine = [];
        for (var x = 0; x < this.width; x++) {
            var ch = line[x], fieldType = null;
            var Actor = actorChars[ch];
            //Actor为各个对象的构造函数，ch为可选参数
            if (Actor)
                this.actors.push(new Actor(new Vector(x, y), ch));
            //墙
            else if (ch == "x")
                fieldType = "wall";
            //熔浆
            else if (ch == "!")
                fieldType = "lava";
            gridLine.push(fieldType);
        }
        this.grid.push(gridLine);
    }
    //查找该地图的玩家元素
    this.player = this.actors.filter(function(actor) {
        return actor.type == "player";  
    })[0];
    //记录玩家是否通过的信息
    this.status = this.finishDelay = null;
}
//判断活动元素前进的方向是否有障碍物
Level.prototype.obstacleAt = function(pos, size) {
    //取下值
    var xStart = Math.floor(pos.x);
    //取上值
    var xEnd = Math.ceil(pos.x + size.x);
    var yStart = Math.floor(pos.y);
    var yEnd = Math.ceil(pos.y + size.y);
    //如果碰到左右边界，或上边界，则前方的障碍物时是墙
    if (xStart < 0 || xEnd > this.width || yStart < 0)
      return "wall";
    //如果掉入地图以下，则进入熔浆，玩家死亡
    if (yEnd > this.height)
      return "lava";
    //遍历新位置活动元素周围的元素，查找是否有障碍物
    for (var y = yStart; y < yEnd; y++) {
        for (var x = xStart; x < xEnd; x++) {
            var fieldType = this.grid[y][x];
            if (fieldType) return fieldType;
        }
    } 
};
//判断玩家与哪个元素重叠(碰撞)
Level.prototype.actorAt = function(actor) {
    for (var i = 0; i < this.actors.length; i++) {
        var other = this.actors[i];
        if (other != actor &&
            actor.pos.x + actor.size.x > other.pos.x &&
            actor.pos.x < other.pos.x + other.size.x &&
            actor.pos.y + actor.size.y > other.pos.y &&
            actor.pos.y < other.pos.y + other.size.y)
        return other;
    }
};
//设置最大时间间隔
var maxStep = 0.05;
//在时间间隔内物体移动
Level.prototype.animate = function(step, keys) {
    if (this.status != null)
        this.finishDelay -= step;
    while (step > 0) {
        var thisStep = Math.min(step, maxStep);
        this.actors.forEach(function(actor) {
            actor.act(thisStep, this, keys);
        },this);
        step -= thisStep;
    }
};
//玩家的碰撞类型分析
Level.prototype.playerTouched = function(type, actor) {
    //如果碰到熔浆
    if (type == "lava" && this.status == null) {
        this.status = "lost";
        this.finishDelay = 1;
    } 
    //如果吃到硬币
    else if (type == "coin") {
        //注意这里的actor不是玩家，是函数的参数，即现在的硬币，从活动元素中移除该硬币
        this.actors = this.actors.filter(function(other) {
            return other != actor;
        });
        //对每个元素都执行一次指定的函数，直到找到硬币(如果不存在硬币，则游戏结束)
        if (!this.actors.some(function(actor) {
            return actor.type == "coin";
            })){     
            this.status = "won";
            this.finishDelay = 1;
        }
    } 
};
//判断游戏是否结束
Level.prototype.isFinished = function() {
    return this.status != null && this.finishDelay < 0;
};



/*
3.HTML的DOM应用
*/


//定义创建函数，创建节点属性
function elt(name, className) {
    var elt = document.createElement(name);
    //className可选参数
    if (className) 
        elt.className = className;
    return elt;
}

function DOMDisplay(parent, level) {
    //返回创造的元素，即参数，是整个游戏的div
    this.wrap = parent.appendChild(elt("div", "game"));
    this.level = level;
    //添加子元素地图
    this.wrap.appendChild(this.drawBackground());
    //actorLayer保存活动元素状态
    this.actorLayer = null;
    //因为活动元素的存在重新绘制部分地图
    this.drawFrame();
}

//绘制背景图片
//scale"确定实际地图大小和单位距离的关系
var scale = 10;
DOMDisplay.prototype.drawBackground = function() {
    //绘制背景地图
    var table = elt("table", "background");
    table.style.width = this.level.width * scale + "px";
    this.level.grid.forEach(function(row) {
        var rowElt = table.appendChild(elt("tr"));
        //默认高度1单元
        rowElt.style.height = scale + "px";
        row.forEach(function(type) {
          rowElt.appendChild(elt("td", type));
        });
    });
    return table;
};

//创建活动元素和其父级元素
DOMDisplay.prototype.drawActors = function() {
    var wrap = elt("div");
    this.level.actors.forEach(function(actor) {
        var rect = wrap.appendChild(elt("div", "actor " + actor.type));
        //玩家的实际大小
        rect.style.width = actor.size.x * scale + "px";
        rect.style.height = actor.size.y * scale + "px";
        //距离父级元素的偏移距离
        rect.style.left = actor.pos.x * scale + "px";
        rect.style.top = actor.pos.y * scale + "px";
    });
    return wrap;
};
//中心视窗的确定，自动滚屏，增强体验性
DOMDisplay.prototype.scrollPlayerIntoView = function() {
    //读取父级元素的内部宽度与高度(含内边距)
    var width = this.wrap.clientWidth;
    var height = this.wrap.clientHeight;
    var wid = 0.4 * width;
    var hei = 0.5 * height;
    // 读取滚动条到元素左边和上边的距离
    var left = this.wrap.scrollLeft, right = left + width;
    var top = this.wrap.scrollTop, bottom = top + height;
    var player = this.level.player;
    //利用向量找出元素的中心位置
    var center = player.pos.plus(player.size.times(0.5)).times(scale);
    //如果元素的横坐标临近父级元素左边界(父级宽度1/3左右)，设置滚动条距
    if (center.x < left + wid)
        this.wrap.scrollLeft = center.x - wid;
    else if (center.x > right - wid)
        this.wrap.scrollLeft = center.x + wid - width;
    if (center.y < top + hei)
        this.wrap.scrollTop = center.y - hei;
    else if (center.y > bottom - hei)
        this.wrap.scrollTop = center.y + hei - height;
};
//绘制活动元素
DOMDisplay.prototype.drawFrame = function() {
    if (this.actorLayer)
        this.wrap.removeChild(this.actorLayer);
    this.actorLayer = this.wrap.appendChild(this.drawActors());
    this.wrap.className = "game " + (this.level.status || "");
    this.scrollPlayerIntoView();
};
//清除关卡
DOMDisplay.prototype.clear = function() {
    this.wrap.parentNode.removeChild(this.wrap);
};

/*
4.按键器的实现(不存在向下移动)
*/
//定义按键值对象，被传入下面函数，即按键的Unicode值：
var arrowCodes = {37: "left", 38: "up", 39: "right"};
function trackKeys(codes) {
    //创造空对象
    var pressed = Object.create(null);
    //定义处理函数
    function handler(event){
        //如果存在该键值
        if (codes.hasOwnProperty(event.keyCode)) {
            //是否按下键
            var down = event.type == "keydown";
            //记录
            pressed[codes[event.keyCode]] = down;
            //防止按键产生的页面滚动
            event.preventDefault();
        }   
    }   
    //如果按下键，触发回调函数
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    return pressed;
}

function runAnimation(frameFunc) {
    var lastTime = null;
    function frame(time) {
        var stop = false;
        if (lastTime != null) {
            //求间隔
            var timeStep = Math.min(time - lastTime, 100) / 1000;
            stop = frameFunc(timeStep) === false;
        }
        lastTime = time;
        if (!stop)
            requestAnimationFrame(frame);
    }
    //frame回调函数，参数是触发函数的当前时间
    requestAnimationFrame(frame);
}
//取得按键数组
var arrows = trackKeys(arrowCodes);
//封装函数
function runLevel(level, Display, andThen) {
    var display = new Display(document.body, level);
    runAnimation(function(step) {
        //移动元素
        level.animate(step, arrows);
        //绘制元素
        display.drawFrame();
        //该地图结束，调用函数
        if (level.isFinished()) {
            display.clear();
            if(andThen)
                andThen(level.status);
            return false;
        }
    });
}
//封装函数，运行游戏
function runGame(plans, Display) {
    //注意之前无条件执行过一条命
    var life = 2;
    function startLevel(n) {
        //注意：document.write(),每输出一次就会刷新一次页面,无法正常使用
        window.alert("Notice : 你现在有 " + (life + 1) + " 条命");
        scale = prompt("要放大一点吗?(建议10-20之间)") || 10;
        runLevel(new Level(plans[n]), Display, function(status){
            console.log(1);
            if (status == "lost"){
                if(life-- > 0)
                    startLevel(n);
                else{
                    life = 2;
                    startLevel(0);
                }
            }
            else if (n < plans.length - 1)
                startLevel(n + 1);
            else
                console.log("You win!");
        });
    }
    startLevel(0);
}
  
/*
5.函数的调用
*/

runGame(GAME_LEVELS, DOMDisplay);

