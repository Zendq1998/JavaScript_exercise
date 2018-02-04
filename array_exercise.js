/*1
运行正确
注意split的使用*/
const digitCounts = function(k, n){
    var array = [];
    for(var i = 0;i <= n;i++){
        array.push(i);
    }
    var new_array = array.map(function(i){
        return String(i).split(String(k)).length - 1;
    });
    return new_array.reduce(function(a,b){
        return a + b;
    });
};
/*2
chorme上可以运行，平台报错：
Runtime Error
Unexpected identifier
*/
Map.prototype.filterKeys = function(command){
    var require = String(command).slice(12,);
    var Class = String(command).slice(1,4);
    if(Class == 'key'){
        var keys = this.keys();
        var values = this.values();
    }
    else{
        var keys = this.values();
        var values = this.keys();
    }
    var key = [],value = [];
    var k = 1,v = 1;
    while(k){
        k = keys.next().value;
        v = values.next().value;
        if(k){
            key.push(k);
            value.push(v);
        }
    }
    var result = key.filter(function(a){
        return eval('\''+ String(a) + '\'' + require);
    });
    var array = result.map(function(a){
        return (Class == 'key') ? [a,value[key.indexOf(a)]] : [value[key.indexOf(a)],a];
    });
    var map = new Map(array);
    console.log(map);
};
Map.prototype.filterValues = Map.prototype.filterKeys;
/*3
注意concat用法*/
function flat(array){
    var result = [];
    array.map(function(i){
        if(typeof i == 'number')
            result = result.concat([i]);
        else
            result = result.concat(flat(i));
    });
    return result; 
}
/*4*/
function arrWithoutLoop(n){
    return n <= 0 ? [] : arrWithoutLoop(n - 1).concat(n - 1);
}
/*5
注意function*的用法*/
function *flatten2 (array) {
    yield 1;
    var result = [];
    array.map(function(i){
        if(typeof i == 'number')
            result = result.concat([i]);
        else
            result = result.concat(flat(i));
    });
    /*result.forEach(function(i){
        yield i;
    });
    */
}
var numbers = flatten2([1, [[2], 3, 4], 5])
console.log(numbers.next().value); // => 1
console.log(numbers.next().value); // => 2
console.log(numbers.next().value); // => 2
/*6*/
function parseData(data){
    return result = data.rows.map(function(array){
        var obj = {};
        array.map(function(i,j){
            obj[data.metaData[j].name] = i;
        });
        return obj;
    });
}
/*7*/
function fillEmpty(array){
    var bool = function(i){
        return String(i) != 'undefined' && typeof i == 'undefined' && i == undefined;
    }; 
    array.forEach(function(i){
        i = bool(i) ? 'Hello' : i;
    });
    return array;
}
fillEmpty([, , null, undefined, 'OK', ,]);
/*8*/
/*9*/
function uniqueNums(n){
    return Math.floor(Math.random()*31+2);
}