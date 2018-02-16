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
运行正确*/
Map.prototype.filterKeys = function(fn) {
    return new Map([...this].filter(([k, v]) => fn(k)));
}  
Map.prototype.filterValues = function(fn) {
    return new Map([...this].filter(([k, v]) => fn(v)));
}
/*3
运行正确
注意concat用法*/
const flatten = (arr) => {
    var result = [];
    arr.map(function(i){
        if(typeof i == 'number')
            result = result.concat([i]);
        else
            result = result.concat(flatten(i));
    });
    return result; 
}
/*4
运行正确*/
function arrWithoutLoop(n){
    return n <= 0 ? [] : arrWithoutLoop(n - 1).concat(n - 1);
}
/*5
运行正确
注意function*的用法*/
function *flatten2 (array) {
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
    var result = flat(array);
    for(var i = 0;i < result.length;i++){
        yield result[i];
    }
}
/*6
运行正确*/
const parseData = (data) => {
        return result = data.rows.map(function(array){
        var obj = {};
        array.map(function(i,j){
            obj[data.metaData[j].name] = i;
        });
        return obj;
    });
}
/*7
运行正确*/
//第一种方法：
const fillEmpty = arr => {for(let i=0;i<arr.length;i++){if(!(i in arr)) arr[i] = 'Hello';}}
//第二种方法：
const fillEmpty = (arr) => {Array.from(arr).map((v,i)=>{if(!(i in arr)) arr[i]='Hello' })}
/*
要点1:
Array.from将空元素设为undefined，可以被枚举到，举个栗子：
var a = [1,2,3,,];
console.log(Array.from(a));                                          [1, 2, 3, undefined, undefined]
console.log(a);                                                      [1, 2, 3, empty × 2]
[1,2,3,,].forEach(function(i){console.log(i)});                      1 2 3                        
[1,2,3,undefined,undefined].forEach(function(i){console.log(i)});    1 2 3 undefined undefined    
[1,2,3,,,].length                                                    5    有点怪
[1,2,3,undefined,undefined,undefined].length                         6
*/
/*
要点2:
map内在实现机制：(注意函数作用对象条件)
map方法会给原数组中的每个元素都按顺序调用一次callback函数
callback每次执行后的返回值（包括 undefined）组合起来形成一个新数组
callback函数只会在有值的索引上被调用
那些从来没被赋过值或者使用delete删除的索引则不会被调用
*/
/*
所以：
只有Array.from(a),map才会调用callback函数作用于原来的空元素
栗子：
var a =[,,,]
const fillEmpt = (a) => a.map((v,i) => {console.log(i)})              空
const fillEmpt = (a) => Array.from(a).map((v,i) => {console.log(i)})  0  1  2 
*/
/*8
运行正确
注意特殊要求
完全满足正则，全局*/
const extractStr = (str) => {
    var result = [];
    var pattern = /:+(\w*)\.+/g;
    var temp;
    while(temp = pattern.exec(str)){
      result.push(temp[1]);
    }
    return result
}
/*9
运行正确*/
const uniqueNums = (n) => {
    function bool(arr,k){
        var result = arr.filter(function(i){
            return i == k;
        });
        return result.length == 0;
    }
    var arr = [];
    while(arr.length < n){
        var k = Math.floor(Math.random()*31+2);
        if(bool(arr,k))
            arr.push(k);
    }
    return arr;
}
/*10
运行正确*/
const mergeSortedArray = function (A, B) {
    var result = [];
    var array = [...A,...B];
    for(var i = array.length;i > 0;i--){
        var min = array.reduce(function(a,b){
            return a > b ? b : a;
        });
        result.push(min);
        array.splice(array.indexOf(min),1);
    }
    return result;
}
/*11
运行正确*/
const partitionArray = function (nums, k) {
    var little = [];
    var big = [];
    nums.map(function(i){
        if(i < k)
            little.push(i);
        else
            big.push(i);
    });
    var nums = [...little,...big];
    return little.length;
}
/*12
运行正确
先排序，比较左右*/
//方法1:
const unique = (arr) =>{
    return arr.filter(function(i,j){
        return arr.indexOf(i) == j;
    });
}
//方法2:（在平台跑的时候会出现不正确的报错，控制台可以正常输出）
const unique = (arr) =>{
    var result = [];
    for(var i = arr.length;i > 0;i--){
        var min = arr.reduce(function(a,b){
            return a > b ? b : a;
        });
        result.push(min);
        arr.splice(arr.indexOf(min),1);
    }
    return result.filter(function(a,i){
        return !(a === result[i + 1]);//相等去除
    });
}
/*13
运行正确
先排序index，再插入*/
const injectSections = (items, sections) => { 
    var arr = [];
    for(var i = sections.length;i > 0;i--){
        var min = sections.reduce(function(a,b){
            return (a.index > b.index) ? b : a;
        });
        arr.push(min);
        console.log(min);
        sections.splice(sections.indexOf(min),1);
    }
    console.log(arr);
    var n = 0;
    arr.map(function(i,j){
        items.splice(i.index + n++,0,i.content);
    });
    return items;
}
/*14
先取交，再取独*/
function intersection(a,b){
    var result = a.map(function(i){
        return b.filter(function(m){
            return m == i;
        });
    });
    var arr = result.reduce(function(a,b){
        return a.concat(b);
    });
    var unique= [];
    for(var i = arr.length;i > 0;i--){
        var min = arr.reduce(function(a,b){
            return a > b ? b : a;
        });
        unique.push(min);
        arr.splice(arr.indexOf(min),1);
    }
    return unique.filter(function(a,i){
        return a != unique[i + 1];
    });
}
/*15
取交,取独，求公共重复次数*/
function intersection(a,b){
    var result = a.map(function(i){
        return b.filter(function(m){
            return m == i;
        });
    });
    var arr = result.reduce(function(a,b){
        return a.concat(b);
    });
    var unique= [];
    for(var i = arr.length;i > 0;i--){
        var min = arr.reduce(function(a,b){
            return a > b ? b : a;
        });
        unique.push(min);
        arr.splice(arr.indexOf(min),1);
    }
    var single = unique.filter(function(a,i){
        return a != unique[i + 1];
    });
    var final = [];
    single.map(function(i){
        var A = a.filter(function(m){
            return m == i;
        }).length;
        var B = b.filter(function(m){
            return m == i;
        }).length;
        for(var j = Math.min(A,B);j > 0;j--){
            final.push(i);
        }
    });
    return final;
}
/*16
运行正确
先排序，再比较*/
const isAnagram = (str1, str2) => {
    function seq(arr){
        var result = [];
        for(var i = arr.length;i > 0;i--){
            var min = arr.reduce(function(a,b){
                return a > b ? b : a;
            });
            result.push(min);
            arr.splice(arr.indexOf(min),1);
        }
        return result;
    } 
    function compare(str1,str2){
        var arr1 = seq(str1.split(''));
        var arr2 = seq(str2.split(''));
        return (arr1.length == arr1.filter(function(i,j){return i == arr2[j]}).length && arr2.length == arr2.filter(function(i,j){return i == arr1[j]}).length)
    }
    return compare(str1,str2);
}
/*17
运行正确*/
function duplicates(arr) {
  return arr.sort().filter((_, i) =>
    arr[i] === arr[i + 1] && arr[i] !== arr[i - 1]
  );
}
/*18
运行正确*/
const merge = (arr) => 
arr.forEach((v,i)=>{arr.push(...arr.splice(arr.indexOf(Math.min.apply(null,arr.slice(0,arr.length-i))),1));
});
/*19
处理第二个表达式的情况未解决*/
var push = (str) => {
    let result = [],len = str.length;
    for(let i = 0;i < len;i++){
      if(str[i] !== '(' && str[i] !== ')' && str[i] !== ' '){
        if(str[i] >= '0' && str[i] <= '9')    
          result.push(Number(str[i]));
        else if(str[i] === '+' || str[i] === '-' || str[i] === '*' || str[i] === '/')
          result.push(str[i]);
        else
          return [];
      }
    }
    return result;
};
var pop = (arr,num) => {
    let sec = arr.pop(),fir = arr.pop();
    if(typeof fir === 'number'){
      ope = arr.pop();
      return eval(String(fir) + ope + String(sec));
    }
    else if(typeof fir === 'string')
      return eval(String(sec) + fir + String(num));
};
var runExpression = (exp) => {
    let num = 0,arr = push(exp);
    if(arr.length < 3)
      return null;
    while(arr.length !== 0){
      num = pop(arr,num);
    }
    return num;
};
/*20
不会。。。*/
const rob = (nums) => {
    let prevMax = 0;
    let curMax = 0;
    nums.forEach(n => {
      let temp = curMax;
      curMax = Math.max(prevMax + n, curMax);
      prevMax = temp;
    })
    return curMax;
}
/*21
运行正确*/
const compose = (...arr) => {
    return x => arr.reduceRight((v, f) => f(v), x);
}
/*22
运行超时*/
var threeSum = function(nums) {
    let result = [];
    nums.map(function(i,index1){
        let arr1 = [];
        nums.map(function(m,n){
            if(n != index1)
                arr1.push(m);
        })
        arr1.map(function(j,index2){
            let arr2 = [];
            arr1.map(function(m,n){
                if(n != index2)
                    arr2.push(m);
            })
            arr2.forEach(function(m,index3){
                if(i + j + m == 0){
                    let num = 0;
                    result.map(function(arr){
                        if(arr.sort().toString() === [i,j,m].sort().toString())
                            num = 1;
                    })
                    if(num == 0)    
                        result.push([i,j,m].sort());   
                }
            });
        });
    });
    return result;
};
/*23
运行超时*/
var threeSumClosest = function(nums,target) {
    let sums = [];
    nums.map(function(i,index1){
        let arr1 = [];
        nums.map(function(m,n){
            if(n != index1)
                arr1.push(m);
        })
        arr1.map(function(j,index2){
            let arr2 = [];
            arr1.map(function(m,n){
                if(n != index2)
                    arr2.push(m);
            })
            arr2.forEach(function(m){
                sums.push(i + j + m);
            });
        });
    });
    let reduce = Math.abs(sums[0] - target),tar = 0;
    sums.map(function(sum,i){
        if(Math.abs(sum - target) < reduce){
            reduce = Math.abs(sum - target);
            tar = i;
        }
    })
    return sums[tar];
};
/*24
运行正确，修改原数组*/
//方法一
const partition = (arr) => {
    let result = [],j = 0;
    for(let i = 1;i < arr.length;i++){
        if(arr[i] < arr[0])
            result[j++] = arr[i];
    }
    for(let i = 0;i < result.length / 2;i++){
        let temp = result[i];
        result[i] = result[result.length - 1 - i];
        result[result.length - 1 - i] = temp;
    }
    result[j++] = arr[0];
    for(let i = 1;i < arr.length;i++){
        if(arr[i] > arr[0])
            result[j++] = arr[i];
    }
    for(let i = 0;i < result.length;i++)
        arr[i] = result[i];
    return arr;
}
//方法二，快速排序
const partition = (arr) => {
    const swap = (a, i, j) => [a[i], a[j]] = [a[j], a[i]]

    const v = arr[0]
    let i = 0
    let k = 1
    let j = arr.length - 1
    
    while(k <= j) {
      if(arr[k] < v) swap(arr, i++, k++)
      else if(arr[k] > v) swap(arr, j--, k)
      else k++
    }
}
/*25
运行正确*/
var searchRange = function(nums,target){
    if(nums.indexOf(target) == -1)
        return [-1,-1];
    let open = 0,result = [];
    nums.map(function(num,i){
        if(num == target && open == 0){
            result.push(i);
            open++;   
            
        }
        if(num != target && open == 1){
            result.push(i - 1);
            open++;
        }
    });
    if(result.length == 1)
        result.push(nums.length - 1);
    return result;
};
/*26
对角线互换，左右互换*/
var rotate = function(matrix){
    let n = matrix.length - 1;
    matrix.map(function(arr,i){
        for(let j = 0;j <= i;j++){
            let temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    })
    matrix.map(function(arr,i){
        for(let j = 0;j < n / 2;j++){
            let temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - j];
            matrix[i][n - j] = temp;
        }
    })
    return matrix;
};
arr = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
];
rotate(arr)