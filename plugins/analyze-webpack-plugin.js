/*
@author: qiuwenhui
@Software: VSCode
@Time: 2023-06-19 21:47:28
@Module: AnalyzeWebpackPlugin 分析Webpack打包资源大小 并输出分析文件
*/

class AnalyzeWebpackPlugin {
    apply(compiler) {
        // emit是异步串行钩子
        compiler.hooks.emit.tap("AnalyzeWebpackPlugin", (compilation) => {
            // Object.entries将对象变成二维数组 二维数组中第一项值是key 第二项值是value
            const assets = Object.entries(compilation.assets);

            let source = "# 分析打包资源大小 \n| 名称 | 大小 | \n| --- | --- |";

            assets.forEach(([filename, file]) => {
                source += `\n| ${filename} | ${(file.size() / 1024).toFixed(
                    2
                )} KB |`;
            });

            // 添加资源
            compilation.assets["analyze.md"] = {
                source() {
                    return source;
                },
                size() {
                    return source.length;
                },
            };
        });
    }
}

module.exports = AnalyzeWebpackPlugin;