const loaderUtils = require("loader-utils");

module.exports = function (content) {
    // 1. 根据文件内容生成带hash值文件名
    const interpolatedName = loaderUtils.interpolateName(
        this,
        "[hash].[ext][query]",
        {
            content,
        }
    );
    console.log("🚀 ~ file: index.js:12 ~ interpolatedName:", interpolatedName);
    // 2. 将文件输出出去
    // 3. 返回：module.exports = "文件路径（文件名）"
};

// 需要处理图片、字体等文件 Buffer数据
// 需要使用raw loader才能处理
module.exports.raw = true;
