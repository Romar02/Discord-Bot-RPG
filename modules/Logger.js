/*
Logger class for easy and aesthetically pleasing console logging 
*/
import chalk from 'chalk';
import moment from 'moment';
import log4js from 'log4js';
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
log4js.configure({
    appenders: {
        info: {
            type: 'file',
            filename: './logs.log',
            layout: {
                type: 'pattern',
                pattern: '[%x{ln}] - %m',
                tokens: {
                    ln: function (data) {
                        const date = new Date();
                        var day = date.getDate();
                        var monthIndex = date.getMonth();
                        var year = date.getFullYear();
                        var hours = date.getHours();
                        var minutes = date.getMinutes();
                        var seconds = date.getSeconds();
                        return date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris', hourCycle: 'h24' });
                    },
                },
            },
        },
    },
    categories: { default: { appenders: ['info'], level: 'trace' } },
});
const logger = {
    log: (content, type = 'log') => {
        const logger = log4js.getLogger(`[${type}]`);
        const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
        switch (type) {
            case 'log': {
                console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
                if (content.startsWith('Loading Command')) return;
                if (content.startsWith('Loading Event')) return;
                return logger.debug(`${content.replace('[LOG] ', '[LOG] - ')}`);
            }
            case 'warn': {
                return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
            }
            case 'error': {
                console.log(`${timestamp} ${chalk.black.bgRed(type.toUpperCase())} ${content}`);
                return logger.error(`[${type.toUpperCase()}] - ${content} `);
            }
            case 'debug': {
                return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
            }
            case 'cmd': {
                console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
                return logger.info(`${content.replace('[CMD] ', '[CMD] - ')}`);
            }
            case 'ready': {
                console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase() + content)}`);
                return logger.info(`[READY] - ${content}`);
            }
            default:
                throw new TypeError('Logger type must be either warn, debug, log, ready, cmd or error.');
        }
    },
    error: (...args) => logger.log(...args, 'error'),
    warn: (...args) => logger.log(...args, 'warn'),
    debug: (...args) => logger.log(...args, 'debug'),
    cmd: (...args) => logger.log(...args, 'cmd'),
};

export default logger;
