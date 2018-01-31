/*5.14.1
注意内置函数的返回值*/
function fall(a){
    return a.reduce(function(b,c){
        return b.concat(c);
    });
}
/*5.14.2
注意对象name和value的访问*/
function lack(a){
    var b = [];
    for(var i in a){
        if(!a[a[i].mother])
            continue;
        else
            b.push(a[i].born - a[a[i].mother].born);
    }
    return b;
}
console.log(average(lack(byName)).toFixed(1));
/*5.14.3*/
function live(a){
    var b = {};
    a.forEach(function(person){
        var c = Math.ceil(person.died / 100);
        if(!b[c])
            b[c] = [person.died - person.born];
        else
            b[c].push(person.died - person.born);
    });
    return b;
}
function output(b){
    for(var i = 0;i <= 21;i++){
        if(b[i]){
            if(average(b[i]) * 10 %10)
                console.log(i+': '+average(b[i]).toFixed(1));
            else    
                console.log(i+': '+average(b[i]));
        }
    }
}
output(live(ancestry));
/*5.14.4
注意forEach用法*/
function every(a,b){
    var num = 0;
    a.forEach(function(A){
        if(!b(A)){
            num++;
        }
    });
    return num == 0;
}
function some(a,b){
    var num = 0;
    a.forEach(function(A){
        if(b(A)){
            num++;
        }
    });
    return num > 0;
}