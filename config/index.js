// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
    moduleName: 'components',
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/components/view/index.html'),
        // phone: path.resolve(__dirname, '../dist/components/phone/phone.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8088,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // proxyTable: {
        //     '/api/*': {
        //         target: 'http://127.0.0.1:8080/Urban/rest',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': '',
        //         }
        //     }
        // },

        proxyTable: {
            '/api': {
                target: 'http://localhost:8080/',//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                    //这里理解成用‘/api’代替target里面的地址，
                    //后面组件中我们掉接口时直接用api代替 比如我要调
                    //用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
        },
        cssSourceMap: false
    }
}
