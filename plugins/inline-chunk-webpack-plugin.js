/*
@author: qiuwenhui
@Software: VSCode
@Time: 2023-06-20 11:19:21
@Module: InlineChunkWebpackPlugin 将内联runtime注入到HTML中 减少请求数量
*/

const HtmlWebpackPlugin = require("safe-require")("html-webpack-plugin");

class InlineChunkWebpackPlugin {
    constructor(tests) {
        this.tests = tests;
    }

    apply(compiler) {
        compiler.hooks.compilation.tap(
            "InlineChunkWebpackPlugin",
            (compilation) => {
                // 1. 获取html-webpack-plugin的hooks
                const hooks = HtmlWebpackPlugin.getHooks(compilation);
                // 2. 注册html-webpack-plugin的hooks -> alterAssetTagGroups

                // hooks.alterAssetTagGroups.tap(
                //     "InlineChunkWebpackPlugin",
                //     ({ headTags, bodyTags }) => {
                //         /*
                //         目前headTags
                //         [
                //             {
                //                 tagName: 'script',
                //                 voidTag: false,
                //                 meta: { plugin: 'html-webpack-plugin' },
                //                 attributes: { defer: true, type: undefined, src: 'js/runtime~main.js.js' }
                //             },
                //         ]

                //         修改后headTags
                //         [
                //             {
                //                 tagName: 'script',
                //                 innerHTML: runtime文件的内容,
                //                 closeTag: true
                //             },
                //         ]
                //         */
                //         console.log(headTags);
                //     }
                // );

                hooks.alterAssetTagGroups.tap(
                    "InlineChunkWebpackPlugin",
                    (assets) => {
                        // 3. 从里面将script的runtime文件 变成inline script
                        assets.headTags = this.getInlineTag(
                            assets.headTags,
                            compilation.assets
                        );

                        assets.bodyTags = this.getInlineTag(
                            assets.bodyTags,
                            compilation.assets
                        );
                    }
                );

                // 删除runtime文件
                hooks.afterEmit.tap("InlineChunkHtmlPlugin", () => {
                    Object.keys(compilation.assets).forEach((assetName) => {
                        if (this.tests.some((test) => assetName.match(test))) {
                            delete compilation.assets[assetName];
                        }
                    });
                });
            }
        );
    }

    getInlineTag(tags, assets) {
        return tags.map((tag) => {
            if (tag.tagName !== "script") return tag;

            const scriptName = tag.attributes.src;
            if (!this.tests.some((test) => scriptName.match(test))) return tag;

            return {
                tagName: "script",
                innerHTML: assets[scriptName].source(),
                closeTag: true,
            };
        });
    }
}

module.exports = InlineChunkWebpackPlugin;
