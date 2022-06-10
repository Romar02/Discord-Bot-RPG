export default {
    async execute(error, client) {
        client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, 'error');
    },
};
