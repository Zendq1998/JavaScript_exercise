//webpack打包js和css一起(分离打包存在一些问题)
import css from './game.css'

//导入js文件
var obj2 = require("./gameMap.js");
var GAME_LEVELS = obj2.GAME_LEVELS;
var Level = obj2.Level;

/*
HTML的DOM应用
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
按键器的实现(不存在向下移动)
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
    //页面注销时，注销事件发生器，否则下个地图物体初始会运动，有bug
    function logout(event){
        pressed = Object.create(null);
    }
    //如果按下键，触发回调函数
    addEventListener("keydown", handler);
    addEventListener("keyup", handler);
    //页面注销时，注销事件发生器，不知道是否正确
    addEventListener("beforeunload", logout);
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
//封装函数
function runLevel(level, Display, andThen) {
    var display = new Display(document.body, level);
    //取得按键数组
    var arrows = trackKeys(arrowCodes);
    function pause(event){
        if(event.keyCode == 27){
            var yes = confirm("Continue?");
            //如果不继续
            if(!yes){
                while(1){
                    yes = confirm("Continue?"); 
                    if(yes)
                        break;
                }
            }
        }
    }
    addEventListener("keydown", pause);
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
        scale = prompt("要放大一点吗?(建议10-20之间)") || 10;
        window.alert("Notice : 你现在有 " + (life + 1) + " 条命");
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
函数的调用
*/

runGame(GAME_LEVELS, DOMDisplay);

