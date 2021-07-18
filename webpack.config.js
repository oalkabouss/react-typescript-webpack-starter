const path = require("path");
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = {
    entry: "./src/index.tsx",
    output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
    mode: isProd ? 'production' : 'development',
    resolve: {
        extensions: [".tsx", ".ts", ".jsx",".js"],
    },
    devServer: { contentBase: path.join(__dirname, "src") },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader","sass-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    }
};


if (isProd) {
    config.optimization = {
        minimizer: [
            new TerserWebpackPlugin(),
        ],
    };
}


module.exports = config;