/*
@author: qiuwenhui
@Software: VSCode
@Time: 2023-06-14 19:50:14
@Module: style-loader 动态创建style标签 插入js中的样式代码 使样式生效
*/

module.exports = function (content) {
    /*
    1. 直接使用style-loader 只能处理样式
    不能处理样式中引入的其他资源
    use: ["./loaders/style-loader"],

    2. 借助css-loader解决样式中引入的其他资源的问题
    use: ["./loaders/style-loader", "css-loader"], 

    问题是css-loader暴露了一段js代码 style-loader需要执行js代码 得到返回值
    再动态创建style标签 插入到页面上不好操作

    3. style-loader使用pitch loader用法
    */
    /* const script = `const styleEl = document.createElement("style");
    styleEl.innerHTML = ${JSON.stringify(content)};
    document.head.appendChild(styleEl);`;

    return script; */
};

const styleLoader = () => {};

styleLoader.pitch = function (remainingRequest) {
    // remainingRequest 剩下还需要处理的loader
    // console.log("🚀 ~ file: index.js:23 ~ remainingRequest:", remainingRequest);
    // /Users/qiuwenhui/Desktop/Webpack/Loader_Plugin_src/node_modules/css-loader/dist/cjs.js!/Users/qiuwenhui/Desktop/Webpack/Loader_Plugin_src/src/css/index.css

    // 1. 将remainingRequest中绝对路径改成相对路径（后面只能使用相对路径操作）
    const relativePath = remainingRequest
        .split("!")
        .map((absolutePath) => {
            // console.log("🍎🍎🍎" + this.context); // /Users/qiuwenhui/Desktop/Webpack/Loader_Plugin_src/src/css
            // 返回相对路径
            return this.utils.contextify(this.context, absolutePath);
        })
        .join("!");

    // 2. 引入css-loader处理后的资源
    // 3. 创建style 将内容插入页面中生效
    // 使用inline loader的形式
    // !! 跳过pre, normal和post loader
    const script = `
        import style from "!!${relativePath}";
        const styleEl = document.createElement("style");
        styleEl.innerHTML = style;
        document.head.appendChild(styleEl);
    `;
    // return导致熔断 中止后面loader的执行
    return script;
};

module.exports = styleLoader;
