/*
@author: qiuwenhui
@Software: VSCode
@Time: 2023-06-19 20:11:17
@Module: CleanWebpackPlugin 生成文件前清空历史文件
*/

class CleanWebpackPlugin {
    apply(compiler) {
        // 获取操作文件的对象
        const fs = compiler.outputFileSystem;
        // 注册钩子 在打包输出之前emit
        // emit是异步串行钩子
        compiler.hooks.emit.tapAsync(
            "CleanWebpackPlugin",
            (compilation, callback) => {
                // 获取打包输出文件的目录
                const outputPath = compiler.options.output.path;
                // 删除打包输出目录下的所有文件
                const err = this.removeFiles(fs, outputPath);
                // 执行成功err为undefined 执行失败err就是错误原因
                callback(err);
            }
        );
    }

    removeFiles(fs, path) {
        try {
            // debugger;
            // 读取当前目录下所有文件
            const files = fs.readdirSync(path);
            // 遍历文件 删除
            files.forEach((file) => {
                // 获取文件完整路径
                const filePath = `${path}/${file}`;
                // 分析文件
                const fileStat = fs.statSync(filePath);
                // 判断是否是文件夹
                if (fileStat.isDirectory()) {
                    // 是文件夹需要递归遍历删除下面所有文件
                    this.removeFiles(fs, filePath);
                } else {
                    // 不是文件夹就是文件 直接删除
                    fs.unlinkSync(filePath);
                }
            });
            // 最后删除当前目录
            fs.rmdirSync(path);
        } catch (error) {
            // 将产生的错误返回出去
            return error;
        }
    }
}

module.exports = CleanWebpackPlugin;
