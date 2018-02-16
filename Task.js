/*
根据本题复习一下这两天的学习成果
会使用一些'笨方法'
另外写出书上较为高级的用法,做一下比较.先自己回忆，不会再查找源码
/*

/*
已知山脉的一维数据数组：
var MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
    {name: "Everest", height: 8848, country: "Nepal"},
    {name: "Mount Fuji", height: 3776, country: "Japan"},
    {name: "Mont Blanc", height: 4808, country: "Italy/France"},
    {name: "Vaalserberg", height: 323, country: "Netherlands"},
    {name: "Denali", height: 6168, country: "United States"},
    {name: "Popocatepetl", height: 5465, country: "Mexico"}
  ];
*/


/*
题目要求的输出格式：
name         height country      
------------ ------ -------------
Kilimanjaro    5895 Tanzania     
Everest        8848 Nepal        
Mount Fuji     3776 Japan        
Mont Blanc     4808 Italy/France 
Vaalserberg     323 Netherlands  
Denali         6168 United States
Popocatepetl   5465 Mexico
*/

/*
1.分解数据
*/
function breakData(datas){
    var header = [];
    for(var i in datas[0]){
        header.push(i);
    }
    var headers = [];
    headers.push(header);
/*
较为高级headers的实现：
    var keys = Object.keys(datas[0]);     //高级用法：Object.keys()
    var headers = keys.map(function(i){
        return i;
    });
}
*/
    var bodies = [];
    datas.forEach(function(data){
        var body = [];
        for(var i in data){
            body.push(data[i]);
        }
        bodies.push(body);//也可以用一维
    });
    return headers.concat(bodies);
}
/*
较为高级bodies的实现：同上(headers)
高级用法：Object.keys()
    var bodies = datas.map(function(data){
        return keys.map(function(i){
            return data[i];
        });
    });
*/
/*
注意书上最后[]的使用
*/


/*
2.确定单元格宽度
a是由第1步确定的二维数组
*/
function widthes(datas){
    var a = [];
    for(var i = 0;i < datas[0].length;i++){
        var max = 0;
        for(var j = 0;j < datas.length;j++){
            if(datas[j][i].length > max)
                max = datas[j][i].length;
        }
        a.push(max);
    }
    return a;
}
/*
较为高级widthes的实现：
    var widthes = datas.map(function(_,i){
        return datas.reduce(function(width,row){
            return Math.max(width,row[i].length);  
        },0);
    });
*/
/*
3.自定义repeat函数
*/
function repeat(char,num){
    var str = '';
    for(var i = 0;i < num;i++){
        str += char;
    }
    return str;
}
/*
4.普通单元格的制作：
*/
function commonCell(datas){
    var result = datas.map(function(row){
        return row.map(function(cell,i){
            if(typeof cell === 'number')
                return repeat(' ',widthes(datas)[i] - String(cell).length + 1) + String(cell) + ' ';
            else
                return cell + repeat(' ',widthes(datas)[i] - cell.length);
        });
    });
    return result;
}
/*
5.下划线单元格的制作：
*/
function underlineCell(data,datas){
    var num = widthes(datas);
    var result = data.map(function(_,i){
        return repeat('-',num[i]);
    });
    return data.join(' ') +'\n' + result.join(' ');
}
/*
6.合并字符串
*/
function connect(a){
    var b = '';
    for(var i = 1;i < a.length;i++){
        b += (a[i].join('') + '\n');
    }
    return b;
}
/*
7.输出结果
*/
function outPut(Datas){
    var datas = breakData(Datas);
    var commonArray = commonCell(datas);
    var underlineStr = underlineCell(commonArray[0],datas);
    var commonStr = connect(commonArray);
    return underlineStr + '\n' + commonStr;
}
/*
最开始还有一些思路，但到了最后越来越不会写，看源码也有点晕，感觉很崩溃。。。
最后按自己理解写的。。。感觉面向对象的应用好不熟练
以后要多尝试一些高级语法😢
*/
