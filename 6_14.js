/*6.14.1
注意输出格式*/
function Vector(x,y){
   this.x = x;
   this.y = y; 
}
Vector.prototype.plus = function(a){
    var c = new Vector();
    c.x = this.x + a.x;
    c.y = this.y + a.y;
    return c;
};
Vector.prototype.minus = function(a){
    var c = new Vector();
    c.x = this.x - a.x;
    c.y = this.y - a.y;
    return c;
};
Object.defineProperty(Vector.prototype,"length",{
    get: function(){
    return Math.sqrt(this.x * this.x + this.y * this.y); 
}});
/*6.14.2
注意函数和函数值*/
function StretchCell(inner,width,height){
    this.inner = inner;
    this.width = width;
    this.height = height;
}
StretchCell.prototype.minWidth = function(){
    return this.inner.minWidth() > this.width ? this.inner.minWidth() : this.width;
}
StretchCell.prototype.minHeight = function(){
    return this.inner.minHeight() > this.height ? this.inner.minHeight() : this.height;
}
StretchCell.prototype.draw = function(width,height){
    return this.inner.draw(width,height);
}
/*6.14.3*/
function ArraySeq(a){
    this.a = a;
}
ArraySeq.prototype.sequence = function(){
    var num = 0;
    var b = [];
    this.a.forEach(function(i){
        b[num++] = i;
    });
    this.end = num - 1;
    return b;
}
function RangeSeq(a,b){
    this.a = a;
    this.b = b;
}
RangeSeq.prototype.sequence = function(){
    var num = 0;
    var c = [];
    for(var i = this.a;i <= this.b;i++){
        c[num++] = i;
    }
    this.end = num - 1;
    return c;
}
function logFive(a){
    var b = a.sequence();
    for(var i = 0;i < 5 && i <= a.end;i++){
        console.log(b[i]);
    }
}
logFive(new ArraySeq([1, 2]));
logFive(new RangeSeq(100, 1000));
