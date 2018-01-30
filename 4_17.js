/*4.17.1
注意如何统一步长情况*/
function range(start,end,step = 1){
    var j = [];
    var mark = start - end;
    for(var i = start;(i - end) * mark >= 0;i += step)
        j.push(i);
    return j;
}
function sum(a){
    var j = 0;
    for(var i = 0;i < a.length;i++)
        j += a[i];
    return j;
}
/*4.17.2
第一种无副作用，应用场景更广一些
第二种直接对原数组操作，效率更高*/
function reverseArray(a){
    var b = [];
    for(var i = a.length - 1;i >= 0;i--)
        b.push(a[i]);
    return b;
}
function reverseArrayInPlace(a){
    var temp,len = a.length;
    for(var i = 0;i < len / 2;i++){
        temp = a[i];
        a[i] = a[len - i - 1];
        a[len - i - 1] = temp;
    }
    return a;
}
/*4.17.3
递归一定要注意分支讨论,中断判断和返回类型*/
function arrayToList(a){
    var b = {};
    if(a.length == 0)
        return {};
    else if(a.length == 1){
        b.value =  a[0];
        b.rest = null;
        return b;
    }
    else{
        b.value =  a[0];
        a.shift();
        b.rest = arrayToList(a);
        return b;
    }
}
function listToArray(a){
    var b = [];
    if(a == {})
        return [];
    else if(a.rest == null){
        b.push(a.value);
        return b;
    }
    else{
        b.push(a.value);
        return b.concat(listToArray(a.rest));
    }
}
function prepend(a,b){
    var c = {value : a,rest : b};
    return c;
}
function nth(a,b){
    if(a == null)
        return undefined;
    else if(b == 0)
        return a.value;
    else
        return nth(a.rest,b - 1);
}
/*4.17.4
注意不同类型的深度比较方式
注意列表结构*/
function deepEqual(a,b){
    var A = typeof(a);
    var B = typeof(b);
    if(!(A == B && A == 'object') || a == null || b == null){
        if(a === b)
            return true;
        else
            return false;
    }
    else{
        for(var i in a){
            if(!(i in b) || !deepEqual(a[i], b[i]))
                return false;
        }
        for(var i in b){
            if(!(i in a) || !deepEqual(a[i], b[i]))
                return false;
        }
        return true;
    }
}
