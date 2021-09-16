const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntries = require("webpack-fix-style-only-entries");

module.exports = {
    mode: 'development',
    entry: {
        'top': './src/entry/js/pages/top.js',
        'chat': './src/entry/js/pages/chat.js',
        'shiritori': './src/entry/js/pages/shiritori.js',
        'quiz': './src/entry/js/pages/quiz.js',
        'nigaoe': './src/entry/js/pages/nigaoe.js',
        'oekaki': './src/entry/js/pages/oekaki.js',
        'style.css': './src/entry/style/main.scss',
    },

    output: {
        path: path.resolve(__dirname, 'src/static/webpack/'),
        filename: 'build_[name].js'
    },

    module: {
        rules: [
            // TypeScript
            {
                test: /.(ts|tsx)?$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src/entry')],
                exclude: [/node_modules/]
            },
            // Sass
            {
                test: /\.scss$/, // 対象となるファイルの拡張子
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // CSSをバンドルするための機能
                    {
                        loader: "css-loader",
                        options: {
                            // オプションでCSS内のurl()メソッドの取り込みを禁止する
                            url: false,

                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options:{
                        sourceMap: true
                        },
                    },
                ],
            },
        ]
    },

    devServer: {
        open: true,
        openPage: "index.html",
        contentBase: path.join(__dirname, "dist"),
        watchContentBase: true,
        port: 5000
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ["node_modules"]
    },

    plugins: [
        new MiniCssExtractPlugin({
            // 出力ファイル名
            filename: "[name]",
        }),
        new FixStyleOnlyEntries(),
    ]
};
