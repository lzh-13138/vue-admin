const path = require('path');//引入path模块
function resolve(dir){
    return path.resolve(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
    chainWebpack:(config)=>{
        config.resolve.alias
        .set('@',resolve('./src'))
        .set('common',resolve('./src/components/common'))
        .set('content',resolve('./src/components/content'))
        .set('network',resolve('./src/network'))
        .set('views',resolve('./src/views'))
        .set('img',resolve('./src/assets/img'))
        .set('css',resolve('./src/assets/css'))
        //set第一个参数：设置的别名，第二个参数：设置的路径
　　　　
    }
}