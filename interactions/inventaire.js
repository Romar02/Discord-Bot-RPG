import Discord from 'discord.js';
import Functions from '../functions/rpg.js';

export default {
    name: 'inventaire',
    description: 'Test',
    global: false,
    guilds: ['661203506434146304'],
    options: [
        {
            name: 'liste',
            description: 'Get or edit permissions for a user',
            type: 1,
        },
        {
            name: 'craft',
            description: 'Get or edit permissions for a user',
            type: 1,
            options: [
                {
                    type: 1,
                    name: 'item',
                    description: "Nom de l'item à crafter",
                    required: true,
                    // autocomplete: true,
                },
            ],
        },
    ],
    run: async (interaction, emotes, page = 1) => {
        const client = interaction.client;

        const user = interaction.user;
        const id = user.id;
        const guildMember = await interaction.guild.members.fetch(id);
        const player = await client.query('SELECT * from users WHERE ID + ' + id);
        if (!player) return interaction.reply({ content: "Votre compte n'existe pas, créez-en un avec /start.", ephemeral: true });

        if (interaction.options._subcommand == 'liste') {
            const inv = (await client.query('SELECT NAME, COUNT FROM inventaire WHERE ID = ' + id)).sort((a, b) => {
                return a.NAME.localeCompare(b.NAME);
            });
            let sac = '';
            const longest = Math.max(...inv.map((item) => +item.NAME.length));

            for (let i = 0; i < inv.length; i++) {
                const item = inv[i];

                sac += `${emotes[item.NAME]} \`${item.NAME}${' '.repeat(longest - item.NAME.length)}\`: ${Functions.convnum(item.COUNT)}\n`;
            }

            var resume = new Discord.MessageEmbed()
                .setAuthor({ name: `Inventaire de ${user.tag}`, iconURL: guildMember.displayAvatarURL() })
                .setColor('#3694A5')
                .setThumbnail(guildMember.displayAvatarURL())
                .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(sac.replace(/undefined/gi, ':question:'));
            interaction.reply({ embeds: [resume], ephemeral: true });
        } else if (interaction.options._subcommand == 'craft') {
            const inv = await client.query('SELECT NAME, COUNT FROM inventaire WHERE ID = ' + id);
            const items = await client.query('SELECT * FROM items WHERE NAME = ' + itemToCraft);

            for (let i = 0; i < items.length; i++) {
                const item = items[i].ITEM;
                const count = items[i].COUNT;
                if (!inv[item] || !inv[item].COUNT >= count) return;
            }
        }
    },
};
