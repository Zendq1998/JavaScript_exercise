//引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/gameDom.js",
    output: {
        path: __dirname + '/dist',
        filename: "game.js"
    },
    plugins: [new HtmlWebpackPlugin({//html插件配置
        filename: 'game.html',
        template: './src/game.html',
        minify: {
            //压缩
            collapseWhitespace: true
        }
    }
    )],
    module: {
        rules: [
          {//css插件配置
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
          }
        ]
    },
    //配置json中的"scripts"命令(重命名)
    mode: 'development'
};