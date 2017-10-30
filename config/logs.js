module.exports = {
    appenders: {
        access: {
            type: 'file',
            filename: './logs/access.log'
        },
        info: {
            type: 'file',
            filename: './logs/info.log'
        },
        error: {
            type: 'file',
            filename: './logs/error.log'
        }
    },
    categories: {
        default: {
            appenders: ['access'],
            level: 'info'
        },
        info: {
            appenders: ['info'],
            level: 'info'
        },
        error: {
            appenders: ['error'],
            level: 'error'
        }
    }
}
