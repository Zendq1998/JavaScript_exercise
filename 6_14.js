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
/*6.14.2*/
/*6.14.3*/

