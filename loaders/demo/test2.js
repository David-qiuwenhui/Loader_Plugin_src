module.exports = function (content, map, meta) {
    const callback = this.async();

    // 进行异步操作
    setTimeout(() => {
        console.log("async loader");
        callback(null, content, map, meta);
    }, 1000);
};
