//public/config.js 除了以下的配置之外，这里面还可以有许多其他配置，例如,pulicPath 的路径等等
module.exports = {
    dev: {
        template: {
            title: 'lianpf-dev',
            header: false,
            footer: false
        }
    },
    build: {
        template: {
            title: 'lianpf-build',
            header: true,
            footer: false
        }
    }
}