export default {
    async execute(client) {
        client.logger.log(`Bot ${client.user.tag} lancé dans ${client.guilds.cache.size} serveurs.`);
        // client.guilds.cache.get('537640510647566347').channels.cache.get('916684879192801280').send('Reboot.');

        //#region Chargement des commandes Slash
        const guildsToAdd = [...new Set(client.commandsSlash.map((c) => c.guilds).flat())];

        for (const guildId of guildsToAdd) {
            const guild = await client.guilds.cache.get(guildId);
            const cmd = await guild.commands.set(client.commandsSlash.filter((c) => c.guilds.includes(guildId)).map((cmd) => cmd));
            console.log(cmd);
        }
        //#endregion
    },
};
