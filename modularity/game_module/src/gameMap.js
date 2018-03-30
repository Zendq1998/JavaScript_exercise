var obj1 = require("./gameStruct.js");
var Vector = obj1.Vector;
var actorChars = obj1.actorChars;
/*
加载地图的实现
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
    "  x               oxxxo       x           x                             x x        xxx          xxx        x  ",
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

var obj = {
    "GAME_LEVELS" : GAME_LEVELS,
    "Level" : Level
}

module.exports = obj