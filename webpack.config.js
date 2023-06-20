const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TestPlugin = require("./plugins/test-plugin");
const BannerWebpackPlugins = require("./plugins/banner-webpack-plugin");
const CleanWebpackPlugin = require("./plugins/clean-webpack-plugin");
const AnalyzeWebpackPlugin = require("./plugins/analyze-webpack-plugin");
const InlineChunkWebpackPlugin = require("./plugins/inline-chunk-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js",
        // clean: true,
    },
    module: {
        rules: [
            /* {
                test: /\.js$/,
                loader: "./loaders/test-loader.js",
            }, */
            /* {
                test: /\.js$/,
                // 执行顺序：从右到左 从上到下
                use: [
                    "./loaders/demo/test1",
                    "./loaders/demo/test2",
                    "./loaders/demo/test3",
                ],
            }, */
            /* {
                test: /\.js$/,
                // 执行顺序：从右到左 从上到下
                use: [
                    "./loaders/demo/test4",
                    "./loaders/demo/test5",
                    "./loaders/demo/test6",
                ],
            }, */
            {
                test: /\.js$/,
                use: "./loaders/clean-log-loader.js",
            },
            /* {
                test: /\.js$/,
                loader: "./loaders/banner-loader/index.js",
                options: {
                    author: "David",
                },
            }, */
            {
                test: /\.js$/,
                loader: "./loaders/babel-loader/index.js",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "./loaders/file-loader/index.js",
                type: "javascript/auto", // 阻止webpack默认处理图片资源 只使用file-loader处理
            },
            /* {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }, */
            {
                test: /\.css$/,
                use: ["./loaders/style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
        }),
        // new TestPlugin(),
        // new BannerWebpackPlugins({ author: "David123" }),
        new CleanWebpackPlugin(),

        new AnalyzeWebpackPlugin(),

        new InlineChunkWebpackPlugin([/runtime(.*)\.js/]),
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
    },
    mode: "production",
    // mode: "development",
};
