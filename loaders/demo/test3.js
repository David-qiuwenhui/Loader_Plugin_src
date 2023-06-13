module.exports = function (content) {
    // content是一个Buffer数据
    console.log("🚀 ~ file: test3.js:2 ~ content:", content);
    return content;
};

// 开启Raw Loader
module.exports.raw = true;
