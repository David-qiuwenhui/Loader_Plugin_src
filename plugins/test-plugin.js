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
        console.log("🔌TestPlugins apply");
    }
}

module.exports = TestPlugin;
