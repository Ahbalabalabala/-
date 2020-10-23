
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
    devServer: { // 服务器代理,当请求了代理设置的路径时 会自动跳转到指定服务器上,解决跨域问题
        port:8080,
        proxy: {
            "/api": {
                target: 'https://yiketianqi.com/',
                changeOrigin: true,
                // "^/api": ""
                // 当你请求 /search?123123 时 会代理到 'http://musicapi.leanapp.cn/search?123123'
            },
            "/rand.avatar": {
                target: 'https://api.uomg.com/api/',
                changeOrigin: true,
            }
        }
    }
}