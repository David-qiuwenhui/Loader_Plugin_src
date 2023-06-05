/*
loader 就是一个函数
当Webpack解析资源时 会调用相应的loader去处理
loader接受到文件内容作为参数 返回内容出去
    content 源文件的内容
    map SourceMap数据
    meta 其他loader传递的数据
*/

module.exports = function (content) {
    console.log("🚀 ~ file: test-loader.js:2 ~ content:", content);
    return content;
};
