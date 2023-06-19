/*
@author: qiuwenhui
@Software: VSCode
@Time: 2023-06-19 16:23:23
@Module: BannerWebpackPlugins 添加注释的插件（输出文件前）
*/

class BannerWebpackPlugins {
    constructor(options = {}) {
        this.options = options;
    }

    // 需要使用 compiler.hooks.emit 钩子, 它是打包输出前触发
    apply(compiler) {
        compiler.hooks.emit.tapAsync(
            "BannerWebpackPlugins",
            (compilation, callback) => {
                // debugger;
                const extensions = ["css", "js"];
                // 1. 获取所有即将输出的资源文件 compilation.assets
                // 2. 过滤只保留js和css资源
                const assets = Object.keys(compilation.assets).filter(
                    (assetPath) => {
                        // 取文件的拓展名
                        const splitted = assetPath.split(".");
                        const extension = splitted[splitted.length - 1];
                        // 判断是否包含目标拓展名
                        return extensions.includes(extension);
                    }
                );

                const prefix = `/*
@author: ${this.options.author}
*/
            `;
                // 3. 遍历剩下资源添加上注释
                assets.forEach((asset) => {
                    // 获取原始的资源
                    const source = compilation.assets[asset].source();
                    const content = prefix + source;
                    // 修改原始的资源
                    compilation.assets[asset] = {
                        // 最终资源输出时 调用source方法 source方法的返回值就是资源的具体内容
                        source() {
                            return content;
                        },
                        // 资源大小
                        size() {
                            return content.length;
                        },
                    };
                });

                callback();
            }
        );
    }
}

module.exports = BannerWebpackPlugins;
