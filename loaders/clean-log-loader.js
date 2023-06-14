// 清理js代码中的console.log
module.exports = function cleanLogLoader(content) {
    return content.replace(/console\.log\(.*\);?/g, "");
};
