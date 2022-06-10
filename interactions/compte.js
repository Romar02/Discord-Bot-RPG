import Discord from 'discord.js';
import Functions from '../functions/rpg.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    name: 'compte',
    description: 'Test',
    global: false,
    guilds: ['661203506434146304'],
    options: [
        {
            name: 'start',
            description: 'Get or edit permissions for a user',
            type: 1,
        },
        {
            name: 'reset',
            description: 'Get or edit permissions for a user',
            type: 1,
        },
        {
            name: 'profile',
            description: 'Get or edit permissions for a user',
            type: 1,
        },
        {
            name: 'sac',
            description: 'Get or edit permissions for a user',
            type: 1,
        },
    ],
    run: (interaction, emotes) => {
        const client = interaction.client;

        if (interaction.options._subcommand == 'start') {
            const $query = 'SELECT * from users WHERE ID = ' + interaction.user.id;

            client.connection.query($query, (err, rows, fields) => {
                if (rows[0]) {
                    return interaction.reply({ content: 'Votre compte existe déjà', ephemeral: true });
                } else {
                    // return interaction.reply({ content: "Votre compte n'existe pas, créez-en un avec ?start.", ephemeral: true });
                }
            });
        } else if (interaction.options._subcommand == 'reset') {
        } else if (interaction.options._subcommand == 'profile') {
            const $query = 'SELECT * from users WHERE ID = ' + interaction.user.id;

            client.connection.query($query, async (err, rows, fields) => {
                if (rows[0]) {
                    const user = interaction.user;
                    const guildMember = await interaction.guild.members.fetch(user.id);
                    const data = rows[0];
                    var resume = new Discord.MessageEmbed()
                        .setAuthor({ name: `Profil de ${user.tag}`, iconURL: guildMember.displayAvatarURL() })
                        .setColor('#3694A5')
                        .setThumbnail(guildMember.displayAvatarURL())
                        .setFooter({ text: user.tag, iconURL: guildMember.displayAvatarURL() })
                        .setTimestamp()
                        .addField(`** ${emotes.trinité} Race :**`, `${data.RACE}`, true)
                        .addField(`** Classe :**`, `${data.CLASSE}`, true)
                        .addField(`**${emotes.xp} Niveau :**`, `Niv : ${data.NIVEAU} \|\| XP : ${Functions.convnum(data.XP)}`, true)
                        .addField(`**:heart: Points de Vie :**`, `${data.VIE}`, true)
                        .addField(`**${emotes.florinium} Argent :**`, `${Functions.convnum(data.ARGENT)} Floriniums (ғ)`, true)
                        .addField(`**:zap: Énergie :**`, `${data.ENERGIE}/100 (+1/8min)`, true)
                        .addField(`**${emotes.bag} Sac :**`, `Disponible avec \`/sac\``, true);
                    // if (message.client.rpg.has(key, 'autres.guilde')) {
                    //     resume = resume.addField(`**Guilde :**`, `${moi.autres.guilde}`);
                    // }
                    interaction.reply({ embeds: [resume], ephemeral: true });
                } else {
                    return interaction.reply({ content: "Votre compte n'existe pas, créez-en un avec /start.", ephemeral: true });
                }
            });
        } else if (interaction.options._subcommand == 'sac') {
        }
    },
};
