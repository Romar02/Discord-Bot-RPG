import Discord from 'discord.js';

export default {
    options: {
        name: ['balance', 'bal'],
        description: 'Affichage de votre argent',
        usage: [],
        enabled: true,
        permissionLevel: 0,
    },
    async execute(client, message, args) {
        if (message.author.bot == true) return;
        if (!message.client.rpg.has(message.author.id)) return message.channel.send("Votre compte n'existe pas, créez-en un avec ?start.");
        var emotes = {
            florinium: message.client.guilds.cache.find((guild) => guild.id == '691744811958665318').emojis.cache.find((emoji) => emoji.name === 'Florinium'),
        };
        if (message.client.rpg.has(message.author.id)) {
            var moi = message.client.rpg.get(message.author.id);
            const embed = new Discord.MessageEmbed()
                .setTitle(`${emotes.florinium} Votre argent ${emotes.florinium}`)
                .setColor('#04798F')
                .setDescription(`${message.author.tag}, vous avez ${moi.money} Floriniums.`);
            return message.channel.send({ embeds: [embed] });
        }
    },
};
