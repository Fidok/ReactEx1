let path = require("path");
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/app/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: '/'
    },
    devServer: {
        contentBase : path.join(__dirname, "dist"),
        port:9000,
         historyApiFallback: true
    },
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  presets: ['react']
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'dist/index.html'
        })
    ]
}