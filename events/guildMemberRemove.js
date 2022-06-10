import Discord from 'discord.js';
export default {
    async execute(member, client) {
        const leave = client.guilds.cache.get('498228085804630016').emojis.cache.get('718801228443811912');

        const settings = client.getSettings(member.guild);

        if (settings.logs == 'true') {
            const guild = member.guild;
            const channellog = guild.channels.cache.find((c) => c.name == settings.modLogChannel);
            let embed = new Discord.MessageEmbed()
                .setAuthor({name: `${member.user.username}#${member.user.discriminator}`, iconURL:member.user.displayAvatarURL({ dynamic: false })})
                .setDescription(`${leave} **Départ :** @${member.user.tag} est parti`)
                .setTimestamp()
                .setFooter(`User ID : ${member.user.id}`)
                .setColor('#64B5E7');
            if (channellog != null) {
                channellog.send({ embeds: [embed] });
            }
        }

        if (client.points.has(`${member.guild.id}-${member.user.id}`)) {
            client.points.delete(`${member.guild.id}-${member.user.id}`);
        }

        if (settings.byeEnabled == 'true') {
            const byeMessage = settings.byeMessage.replace('{{user}}', member.user).replace('{{guild}}', member.guild.name).replace('{{number}}', member.guild.members.cache.size.toLocaleString());

            const channel = member.guild.channels.cache.find((c) => c.name == settings.byeChannel);

            if (channel != null) {
                channel.send({ content: `${leave} ${byeMessage}` }).catch(console.error);
            }
        }
    },
};
