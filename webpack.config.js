const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntries = require("webpack-fix-style-only-entries");

module.exports = {
    mode: 'development',
    //mode: 'production',
    entry: {
        'top': './src/entry/js/pages/top.js',
        'chat': './src/entry/js/pages/chat.js',
        'shiritori': './src/entry/js/pages/shiritori.js',
        'quiz': './src/entry/js/pages/quiz.js',
        'nigaoe': './src/entry/js/pages/nigaoe.js',
        'oekaki': './src/entry/js/pages/oekaki.js',
        'top.css': './src/entry/style/pages/top.scss',
        'chat.css': './src/entry/style/pages/chat.scss',
        'shiritori.css': './src/entry/style/pages/shiritori.scss',
        'quiz.css': './src/entry/style/pages/quiz.scss',
        'nigaoe.css': './src/entry/style/pages/nigaoe.scss',
        'oekaki.css': './src/entry/style/pages/oekaki.scss',
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
                            //sourceMap: false
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                            //sourceMap: false
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
