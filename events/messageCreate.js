export default {
    async execute(message) {
        const client = message.client;
        const settings = (message.settings = client.getSettings(message.guild));

        if (!client.application?.owner) await client.application?.fetch();

        function executeCommand(msg) {
            // Détection du préfixe
            if (!msg.content.startsWith(settings.prefix) || msg.author.bot) return;

            // Récupération de la commande et des arguments
            const args = msg.content.slice(settings.prefix.length).trim().split(/ +/);
            var command = args.shift().toLowerCase();

            // Recherche de la commande
            if (!client.commands.has(command)) {
                if (!client.alt.has(command)) {
                    msg.reply('Commande introuvable !');
                    return;
                } else {
                    command = client.alt.get(command);
                }
            }

            // Récupération de la commande
            command = client.commands.get(command);

            // Commande activée dans les MP // le serveur
            if (msg.channel.type == 'DM' && command.options.guildOnly) {
                return msg.reply("Cette commande n'est pas disponible en message privé");
            } else if (
                msg.author.id != client.config.ownerID &&
                (!command.options.enabled || (Array.isArray(command.options.enabled) && !command.options.enabled.includes(msg.channel.type != 'DM' ? msg.guild.id : msg.author.id)))
            ) {
                return msg.reply('Commande introuvable !');
            }

            // Vérification du niveau de permission
            if (command.options.permissionLevel && +client.permLevel(msg.member, msg) < +command.options.permissionLevel) {
                return msg.reply("Vous n'avez pas l'autorisation d'utiliser cette commande !");
            }

            if (command.options.args && args.length == 0) {
                return msg.reply('Cette commande nécessite des arguments !');
            }

            try {
                command.execute(client, msg, args, client.permLevel(msg.member, msg));
                if (command.options.messageDelete && message.channel.type != 'DM') msg.delete();
            } catch (error) {
                console.error(error);
                msg.reply(
                    `Il y a eu une erreur avec la commande !\nVous pouvez signaler l'erreur avec \`${settings.prefix}report\` en indiquant la commande utilisée suivi de la description du bug, vous pouvez également joindre une capture d'écran dans votre message.`
                );
            }
        }

        executeCommand(message);

        const prefixMention = new RegExp(`^<@!?${message.client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) {
            return message.reply(`Mon préfixe sur ce serveur est : \`${settings.prefix}\``);
        }
    },
};
