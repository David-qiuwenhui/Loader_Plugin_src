/*
@author: qiuwenhui
@Software: VSCode
@Time: 2023-06-14 22:04:57
@Module: TestPlugins
*/

/*
    1. webpack加载webpack.config.js中所有配置 此时就会new TestPlugin() 执行插件的constructor
    2. webpack创建compiler对象
    3. 遍历所有plugins中插件 调用插件的apply方法
    4. 执行剩下编译流程（触发各个hooks事件）
*/
class TestPlugin {
    constructor() {
        console.log("🔌TestPlugins constructor");
    }

    apply(compiler) {
        debugger;
        console.log("🔌TestPlugins apply");

        // environment是同步钩子 需要使用tap注册
        compiler.hooks.environment.tap("TestPlugin", () => {
            console.log("*** TestPlugin🪝 environment *** ");
        });

        // emit是异步串行钩子 AsyncSeriesHook
        compiler.hooks.emit.tap("TestPlugin", (compilation) => {
            console.log("*** TestPlugin🪝 emit 111 ");
        });

        compiler.hooks.emit.tapAsync("TestPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log("*** TestPlugin🪝 emit 222 ");
                callback();
            }, 2000);
        });

        compiler.hooks.emit.tapPromise("TestPlugins", (compilation) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("*** TestPlugin🪝 emit 333 ");
                    resolve();
                }, 1000);
            });
        });

        // make是异步并行钩子 AsyncParallelHook
        compiler.hooks.make.tapAsync("TestPlugins", (compilation, callback) => {
            // 需要在compilation hooks触发前注册才能使用
            compilation.hooks.seal.tap("TestPlugins", () => {
                console.log("TestPlugin🔌 seal");
            });

            setTimeout(() => {
                console.log("*** TestPlugin🪝 make 111 ");
                callback();
            }, 3000);
        });

        compiler.hooks.make.tapAsync("TestPlugins", (compilation, callback) => {
            setTimeout(() => {
                console.log("*** TestPlugin🪝 make 222 ");
                callback();
            }, 2000);
        });

        compiler.hooks.make.tapAsync("TestPlugins", (compilation, callback) => {
            setTimeout(() => {
                console.log("*** TestPlugin🪝 make 333 ");
                callback();
            }, 1000);
        });
    }
}

module.exports = TestPlugin;
