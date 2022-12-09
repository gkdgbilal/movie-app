// webpack.config.js

const path = require(`path`);

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@Components': path.resolve(__dirname, 'src/components'),
            '@Hooks': path.resolve(__dirname, 'src/hooks'),
        }
    }
}