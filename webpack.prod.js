const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtract = require( 'mini-css-extract-plugin' );
const CopyPlugin = require( "copy-webpack-plugin" );

const CssMinimizer = require( 'css-minimizer-webpack-plugin' );
const Terser = require( 'terser-webpack-plugin' );

module.exports = {

    mode: 'production',
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },

    // module:donde empieza a tener la configuración de webpack
    module: {
        // rules: sirven para decirle a webpack que hacer con ciertos archivos
        rules: [

            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },

            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use: [ 'style-loader', 'css-loader']
            },

            {
                test: /styles.css$/,
                use: [ MiniCssExtract.loader, 'css-loader' ]
            },

            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        
        new HtmlWebPackPlugin( {  

            // titulo de la página
            title: 'Mi Webpack App',

            // template: le dice a webpack que archivo quiero tomar como base
            template: './src/index.html',

            // Nombre con el cual se guardará
            filename: './index.html',
            inject: 'body',
        } ),

        new MiniCssExtract( {
            filename: '[name].[fullhash].css',
            ignoreOrder: false,
        } ),

        new CopyPlugin( {
            patterns: [
                { from: "./src/assets/", to: "assets/" },
            ],
        } ),

    ]
}