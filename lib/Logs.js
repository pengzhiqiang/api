const log4js = require('log4js');
const logconf = require('../config/logs');
log4js.configure(logconf);

module.exports = {
    error: (content) => {
        let logger = log4js.getLogger('error');
        logger.error(content);
    },
    info: (content) => {
        let logger = log4js.getLogger('info');
        logger.info(content);
    },
    access: (content) => {
        let logger = log4js.getLogger();
        logger.trace(content);
    }
}
