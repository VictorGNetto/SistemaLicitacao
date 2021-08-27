const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:80/SL-backend',
        secure: false,
        logLevel: 'debug',
        pathRewrite: { '^/api': ''},
        changeOrigin: true
    }
];

module.exports = PROXY_CONFIG;