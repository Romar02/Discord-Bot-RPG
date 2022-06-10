import Discord from 'discord.js';
import Functions from '../functions/rpg.js';

export default {
    name: 'money',
    description: 'Test',
    global: true,
    guilds: ['661203506434146304'],
    options: [
        {
            name: 'balance',
            description: 'Get or edit permissions for a user',
            type: 1,
        },
        {
            name: 'hourly',
            description: 'Get or edit permissions for a user',
            type: 1,
        },
        {
            name: 'daily',
            description: 'Get or edit permissions for a user',
            type: 1,
        },
    ],
    run: async (interaction, emotes) => {
        const client = interaction.client;

        if (interaction.options._subcommand == 'balance') {
            const $query = 'SELECT * from users WHERE ID = 458368236799655947';

            client.connection.query($query, (err, rows, fields) => {
                if (rows[0]) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`${emotes.florinium} Votre argent ${emotes.florinium}`)
                        .setColor('#04798F')
                        .setDescription(`${interaction.user.tag}, vous avez ${rows[0].ARGENT} Floriniums.`);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                } else {
                    return interaction.reply({ content: "Votre compte n'existe pas, créez-en un avec /start.", ephemeral: true });
                }
            });
        } else if (interaction.options._subcommand == 'hourly') {
            const rows = await client.query(`SELECT * from users WHERE ID = 458368236799655947;`);
            if (!rows[0]) return interaction.reply({ content: "Votre compte n'existe pas, créez-en un avec /start.", ephemeral: true });

            var gain = Functions.randomnumber(+rows[0].NIVEAU * 1.5 + 1, +rows[0].NIVEAU * 5 + 2);
            await client.query(`UPDATE users SET ARGENT = ARGENT + ${gain} WHERE ID = 458368236799655947;`);

            const embed = new Discord.MessageEmbed().setTitle(`${emotes.florinium} Récompense horaire ${emotes.florinium}`).setColor('#39A879').setDescription(`Vous avez gagné ${gain} Floriniums.`);

            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
